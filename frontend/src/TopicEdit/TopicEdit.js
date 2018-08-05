import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import DragIcon from '@material-ui/icons/DragHandle';

import MessageBar from '../common/MessageBar';
import PrimaryButton from '../common/PrimaryButton';
import SaveButton from '../common/SaveButton';

import {
  ButtonWrapper,
  DragHandle,
  SubTopicWrapper,
  TextField,
  TopicWrapper,
  Wrapper,
} from './styled';

import saveTopicUpdates from './topicActions';
import saveSubTopicUpdates from './subTopicActions';
import { getTopics, createTopic, getSubTopics } from './api';

import { SMALL_WINDOW } from '../config';

import {
  normalizeChildren,
  prepareChildren,
  prepareParents,
  sortByOrder,
} from './utils';

export default class TopicEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      topics: [],
      subTopics: {},
      message: { show: false, error: false, text: '' },
      horizontal: 'right',
      vertical: 'top',
    };
    this.onNewTopic = this.onNewTopic.bind(this);
    this.onNewSubTopic = this.onNewSubTopic.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.onSubTopicChange = this.onSubTopicChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onNewTopic() {
    const selectedTopic = {
      _id: `${this.state.topics.length + 1}`,
      name: 'Topic Name',
      order: this.state.topics.length + 1,
    };
    // we have to create a topic to get an _id
    createTopic(selectedTopic).then(result => {
      if (result.success) {
        selectedTopic._id = result._id;

        this.setState({
          topics: [...this.state.topics, selectedTopic],
          subTopics: { ...this.state.subTopics, [result._id]: [] },
          message: { show: true, error: false, text: 'Topic Created' },
        });
      } else {
        this.setState({
          message: {
            show: true,
            error: true,
            text: 'Topic create failed - please refresh',
          },
        });
      }
    });
  }

  onNewSubTopic(selectedTopic) {
    const { subTopics } = this.state;
    const nextOrder = subTopics[selectedTopic].length;

    subTopics[selectedTopic].push({
      _id: `${nextOrder}`,
      parent: selectedTopic,
      name: 'Sub Topic Name',
      order: nextOrder,
    });

    this.setState({ subTopics });
  }

  onTopicChange(e) {
    const { value, id } = e.target;
    const { topics } = this.state;

    const idx = topics.findIndex(t => t._id === id);
    topics[idx].name = value;

    this.setState({ topics, isDirty: true });
  }

  onSubTopicChange(e) {
    const { value, id } = e.target;
    const { subTopics } = this.state;

    let idx;

    const child = Object.values(subTopics).reduce((acc, children) => {
      const cldrn = Object.values(children);
      const chIdx = cldrn.findIndex(c => c._id === id);
      if (chIdx !== -1) {
        idx = chIdx;
        return cldrn[chIdx];
      }
      return acc;
    }, {});

    child.name = value;

    subTopics[child.parent][idx] = child;

    this.setState(() => ({ subTopics, isDirty: true }));
  }

  fetchData() {
    Promise.all([getTopics(), getSubTopics()]).then(([topics, subTopics]) => {
      this.setState(() => ({
        topics: sortByOrder(topics),
        subTopics: normalizeChildren(subTopics),
      }));
    });
  }

  handleResize = () => {
    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
  };

  handleClose = () => {
    this.setState(() => ({
      message: { ...this.state.message, show: false },
    }));
  };

  handleSave = () => {
    const { topics, subTopics } = this.state;

    saveTopicUpdates(prepareParents(topics)).then(result => {
      const text = result ? 'Save Successful' : 'Save Failed - please refresh';

      this.setState({
        message: { show: true, error: !result, text },
        isDirty: false,
      });
    });

    saveSubTopicUpdates(prepareChildren(subTopics)).then(result => {
      const text = result
        ? 'Save Successful'
        : 'SubTopic save failed - please refresh';

      this.setState({
        message: {
          show: true,
          error: !result,
          text,
        },
      });
    });
  };

  handleDragEnd = result => {
    const { destination, source } = result;
    const { subTopics, topics } = this.state;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // topic moved
    if (destination.droppableId === 'main') {
      const moved = topics[source.index];
      const topicsCopy = [...topics];
      topicsCopy.splice(source.index, 1);
      topicsCopy.splice(destination.index, 0, moved);

      this.setState(() => ({
        topics: topicsCopy,
        isDirty: true,
      }));
    }
    // subtopic moved inside the same topic
    else if (destination.droppableId === source.droppableId) {
      const moved = subTopics[source.droppableId][source.index];
      const subTopicCopy = [...subTopics[source.droppableId]];
      subTopicCopy.splice(source.index, 1);
      subTopicCopy.splice(destination.index, 0, moved);
      subTopics[source.droppableId] = subTopicCopy;

      this.setState(() => ({
        subTopics,
        isDirty: true,
      }));
    }
    // subtopic moved to different topic
    else if (destination.droppableId !== source.droppableId) {
      const moved = subTopics[source.droppableId][source.index];
      moved.parent = destination.droppableId;
      const startSubTopicCopy = [...subTopics[source.droppableId]];
      const endSubTopicCopy = [...subTopics[destination.droppableId]];
      startSubTopicCopy.splice(source.index, 1);
      endSubTopicCopy.splice(destination.index, 0, moved);

      subTopics[source.droppableId] = startSubTopicCopy;
      subTopics[destination.droppableId] = endSubTopicCopy;

      this.setState(() => ({
        subTopics,
        isDirty: true,
      }));
    }
  };

  render() {
    const {
      topics,
      subTopics,
      message,
      horizontal,
      vertical,
      mobile,
      isDirty,
    } = this.state;

    if (!topics.length || !Object.keys(subTopics).length) {
      return <div>Loading ...</div>;
    }

    const subTopicsRows = (subs, id) =>
      subs[id].map((sub, i) => (
        <Draggable draggableId={sub._id} index={i} key={sub._id} type={id}>
          {provided => (
            <SubTopicWrapper
              innerRef={provided.innerRef}
              {...provided.draggableProps}
            >
              <TextField
                id={sub._id}
                name="name"
                value={sub.name}
                onChange={this.onSubTopicChange}
              />
              <DragHandle {...provided.dragHandleProps}>
                <DragIcon />
              </DragHandle>
            </SubTopicWrapper>
          )}
        </Draggable>
      ));

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Wrapper mobile={mobile}>
          <h3 style={{ margin: '0 auto' }}>Topic and SubTopic ordering</h3>
          <ButtonWrapper>
            <PrimaryButton onClick={this.onNewTopic}>New Topic</PrimaryButton>
          </ButtonWrapper>
          {topics && (
            <Droppable droppableId="main" type="TOPIC">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {topics.map((topic, i) => (
                    <Draggable
                      draggableId={topic._id}
                      index={i}
                      key={topic._id}
                      type="TOPIC"
                    >
                      {prov => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                        >
                          <Droppable droppableId={topic._id} type={topic._id}>
                            {prov2 => (
                              <TopicWrapper
                                innerRef={prov2.innerRef}
                                {...prov2.droppableProps}
                                mobile={mobile.toString()}
                              >
                                <div style={{ display: 'flex' }}>
                                  <TextField
                                    id={topic._id}
                                    name="name"
                                    value={topic.name}
                                    onChange={this.onTopicChange}
                                  />
                                  <button
                                    onClick={() =>
                                      this.onNewSubTopic(topic._id)
                                    }
                                  >
                                    Add&nbsp;subtopic
                                  </button>
                                </div>
                                {subTopics[topic._id] &&
                                  subTopicsRows(subTopics, topic._id)}
                                {prov2.placeholder}
                              </TopicWrapper>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <ButtonWrapper>
            <SaveButton disabled={!isDirty} onClick={this.handleSave} />
          </ButtonWrapper>
          <MessageBar
            anchor={{ vertical, horizontal }}
            message={message}
            handleClose={this.handleClose}
          />
        </Wrapper>
      </DragDropContext>
    );
  }
}
