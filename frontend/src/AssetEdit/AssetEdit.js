/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI components
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
// import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import {
  DropArea,
  Heading1,
  Hint,
  ImgPreview,
  InvisibleInput,
  Label,
  Wrapper,
} from './styled';

import actions from './actions';
import { fileTypes, maxFileSizeMb } from './config';
import { getFileType, packageData, readFile } from './utils';

const MAX_FILE_SIZE_MB = maxFileSizeMb;
const SMALL_WINDOW = 768;

class AssetEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    user: PropTypes.object,
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
    creator: {},
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
    promises.push(actions.getContent(id).then(localUrl => localUrl));
    return promises;
  };

  componentDidMount = () => {
    if (this.props.id) {
      Promise.all(this.getAsset(this.props.id))
        .then(results => {
          const [detail, localUrl] = results;
          this.setState({
            _id: this.props.id,
            scale: false,
            ...detail,
            localUrl,
            file: null,
            data64: null,
          });
        })
        // eslint-disable-next-line no-console
        .catch(e => console.error('get asset failed:', e));
    }
    if (this.props.user) {
      this.setState({ creator: this.props.user });
    }

    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
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

  handleSave = () => {
    const payload = packageData({ ...this.state });
    actions.save(payload).then(json => {
      this.setState({ _id: json._id, creator: json.creator });
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
      _id,
      mobile,
    } = this.state;
    const { username = '' } = creator;
    const embedUrl = _id ? `/api/v1/asset/content/${_id}` : '';

    return (
      <Wrapper>
        <Paper>
          <Heading1>{!_id ? 'Create new asset' : 'Edit asset'}</Heading1>
          <List>
            <ListItem>
              {mobile ? (
                <TextField
                  id="owner"
                  label="Owner"
                  value={username}
                  fullWidth
                  disabled
                />
              ) : (
                <React.Fragment>
                  <Label>Owner:</Label>
                  <ListItemText>
                    <TextField fullWidth value={username} disabled />
                  </ListItemText>
                </React.Fragment>
              )}
            </ListItem>
            <ListItem>
              {mobile ? (
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={this.handleFieldChange}
                  fullWidth
                />
              ) : (
                <React.Fragment>
                  <Label>Title:</Label>
                  <ListItemText>
                    <TextField
                      fullWidth
                      value={title}
                      name="title"
                      onChange={this.handleFieldChange}
                    />
                  </ListItemText>
                </React.Fragment>
              )}
            </ListItem>
          </List>
          <List>
            <ListItem>
              {mobile ? (
                <TextField
                  id="description"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={this.handleFieldChange}
                  fullWidth
                />
              ) : (
                <React.Fragment>
                  <Label>Description:</Label>
                  <ListItemText>
                    <TextField
                      fullWidth
                      value={description}
                      name="title"
                      onChange={this.handleFieldChange}
                    />
                  </ListItemText>
                </React.Fragment>
              )}
            </ListItem>
            <ListItem>
              {mobile ? (
                <TextField
                  id="fileType"
                  label="Asset type"
                  value={fileType || ''}
                  fullWidth
                  disabled
                />
              ) : (
                <React.Fragment>
                  <Label>Asset type:</Label>
                  <ListItemText>
                    <TextField fullWidth value={fileType || ''} disabled />
                  </ListItemText>
                </React.Fragment>
              )}
            </ListItem>
            <ListItem>
              {mobile ? (
                <TextField
                  id="embedUrl"
                  label="Embed Url:"
                  value={embedUrl}
                  fullWidth
                  disabled
                />
              ) : (
                <React.Fragment>
                  <Label>Embed Url:</Label>
                  <ListItemText>
                    <TextField fullWidth value={embedUrl} disabled />
                  </ListItemText>
                </React.Fragment>
              )}
            </ListItem>
          </List>
        </Paper>
        <InvisibleInput
          innerRef={ref => {
            this.fileInput = ref;
          }}
          onChange={this.handleChange}
        />
        <Paper style={{ display: 'flex', justifyContent: 'center' }}>
          <DropArea
            onClick={this.handleDropAreaClick}
            onDrop={this.handleDrop}
            onDragOver={this.handleDrag}
          >
            <Hint>Drop file or click area to select from disk</Hint>
            {data64 && this.renderAsset(fileType, data64)}
            {localUrl && this.renderAsset(fileType, localUrl)}
          </DropArea>
        </Paper>
        <div>
          <Button variant="raised" color="primary" onClick={this.handleSave}>
            Save
          </Button>
        </div>
      </Wrapper>
    );
  }
}

export default AssetEdit;
