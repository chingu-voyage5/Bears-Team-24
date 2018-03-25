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
import { getFileType, readFile } from './utils';

const MAX_FILE_SIZE_MB = maxFileSizeMb;

class AssetEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };
  state = {
    fileType: null,
    file: null,
    data64: null,
    scale: false,
    description: '',
    title: '',
    localUrl: null,
    _id: null,
    creator: null,
  };
  // eslint-disable-next-line react/sort-comp
  getAsset = id => {
    const promises = [];
    promises.push(
      actions.get(id).then(json => {
        const { title, description, content_type: type, creator } = json;
        const fileType = getFileType({ type }, fileTypes);
        return { title, description, fileType, creator };
      })
    );
    promises.push(actions.getContent(this.props.id).then(localUrl => localUrl));
    return promises;
  };
  componentDidMount = () => {
    if (this.props.id) {
      Promise.all(this.getAsset(this.props.id)).then(results => {
        const [detail, localUrl] = results;
        this.setState({
          _id: this.props.id,
          scale: false,
          ...detail,
          localUrl,
          file: null,
          data64: null,
        });
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
    this.set64(file);
  };

  set64 = file => {
    readFile(file).then(data64 =>
      this.setState(() => ({ data64, localUrl: null }))
    );
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
    this.set64(file);
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
    const { file, _id, title, description } = this.state;
    const payload = new FormData();
    if (_id) {
      payload.append('_id', _id);
    }
    payload.append('title', title);
    payload.append('description', description);
    if (file) {
      payload.append('blob', file);
    }
    return payload;
  };
  handleSave = () => {
    const payload = this.packageData();
    actions.save(payload).then(json => {
      this.setState({ _id: json._id });
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
    const {
      description,
      title,
      localUrl,
      fileType,
      data64,
      creator,
    } = this.state;
    let username = '';
    if (creator) {
      // eslint-disable-next-line prefer-destructuring
      username = creator.username;
    }
    const embedUrl = `//api/v1/asset/content/${this.state._id}`;
    return (
      <Wrapper>
        <Label htmlFor="creator">
          Owner:
          <InputField>{username}</InputField>
        </Label>
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
          <InputField>{fileType}</InputField>
        </Label>
        <InvisibleInput
          innerRef={ref => {
            this.fileInput = ref;
          }}
          onChange={this.handleChange}
        />
        <Label htmlFor="embed url">
          Embed Url:
          <InputField>{embedUrl}</InputField>
        </Label>
        <DropArea
          onClick={this.handleDropAreaClick}
          onDrop={this.handleDrop}
          onDragOver={this.handleDrag}
        >
          <Hint>Drop file or click area to select from disk</Hint>
          {data64 && this.renderAsset(fileType, data64)}
          {localUrl && this.renderAsset(fileType, localUrl)}
        </DropArea>
        <Button onClick={this.handleSave}>Save</Button>
      </Wrapper>
    );
  }
}

export default AssetEdit;
