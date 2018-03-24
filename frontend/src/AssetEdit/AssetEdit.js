/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import actions from './actions';

import Input from './Input';
import {
  Button,
  DropArea,
  Hint,
  ImgPreview,
  InputField,
  InvisibleInput,
  Label,
  Wrapper,
} from './styled';

import { fileTypes, maxFileSizeMb } from './config';
import { getFileType, getMediaType, readFile } from './utils';

const MAX_FILE_SIZE_MB = maxFileSizeMb;

class AssetEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };
  state = {
    // fileType: getMediaType(this.props.asset),
    fileType: null,
    file: null,
    data64: null,
    scale: false,
    description: '',
    title: '',
    _id: false,
  };
  componentDidMount = () => {
    if (this.props.id) {
      actions.get(`/api/v1/asset/${this.props.id}`).then(json => {
        console.log('get asset:', json);
      });
    }
  };

  handleSelect = e => {
    const fileType = e.target.value;
    this.setState(() => ({
      fileType,
    }));
  };

  handleChange = e => {
    if (!e.target.files.length) {
      return;
    }

    const file = e.target.files[0];

    if (file.size >= MAX_FILE_SIZE_MB * 1e6) {
      // eslint-disable-next-line
      return alert(`File too big. Max.file size: ${MAX_FILE_SIZE_MB}MB`);
    }

    this.setState(() => ({
      fileType: getFileType(file, fileTypes),
      file,
    }));

    readFile(file).then(data64 => this.setState(() => ({ data64 })));
  };

  handleDrop = e => {
    e.preventDefault();
    let file;

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items[0].kind === 'file') {
        file = e.dataTransfer.items[0].getAsFile();
        e.dataTransfer.items.clear();
      }
    } else {
      [file] = e.dataTransfer.files;
      e.dataTransfer.clearData();
    }

    this.setState(() => ({
      fileType: getFileType(file, fileTypes),
      file,
    }));

    readFile(file).then(data64 => this.setState(() => ({ data64 })));
  };

  handleDrag = e => {
    e.preventDefault();
  };

  // eslint-disable-next-line
  handleDropAreaClick = e => {
    if (e.target.tagName !== 'IMG') {
      return this.fileInput.click();
    }

    this.setState(s => ({
      scale: !s.scale,
    }));
  };
  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  packageData = () => {
    const { file, title, description } = this.state;
    const payload = new FormData();
    payload.append('title', title);
    payload.append('description', description);
    payload.append('blob', file);
    return payload;
  };
  handleSave = () => {
    const payload = this.packageData();
    actions.save(payload).then(json => {
      console.log('asset response keys:');
      Object.keys(json).forEach(k => {
        console.log(k);
      });
    });
  };

  renderAsset = (type, src) => {
    switch (true) {
      case type === 'image':
        return <ImgPreview src={src} alt="Preview" scaled={this.state.scale} />;
      case type === 'audio':
        // eslint-disable-next-line
        return <audio src={src} controls />;
      case type === 'video':
        // eslint-disable-next-line
        return <video style={{ height: '75%' }} src={src} controls />;
      default:
        return <div>No preview available</div>;
    }
  };
  render() {
    const { description, title } = this.state;

    return (
      <Wrapper>
        <Input
          value={title}
          label="Title:"
          name="title"
          onChange={this.handleFieldChange}
        />
        <Input
          value={description}
          label="Description:"
          name="description"
          onChange={this.handleFieldChange}
        />
        <Label htmlFor="asset">
          Asset type:
          <InputField>{this.state.fileType}</InputField>
        </Label>
        <InvisibleInput
          innerRef={ref => {
            this.fileInput = ref;
          }}
          onChange={this.handleChange}
        />
        <DropArea
          onClick={this.handleDropAreaClick}
          onDrop={this.handleDrop}
          onDragOver={this.handleDrag}
        >
          <Hint>Drop file or click area to select from disk</Hint>
          {this.state.data64 &&
            this.renderAsset(this.state.fileType, this.state.data64)}
        </DropArea>
        <Button onClick={this.handleSave}>Save</Button>
      </Wrapper>
    );
  }
}

export default AssetEdit;
