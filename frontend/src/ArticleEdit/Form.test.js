import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import { topics, subTopics } from '../TopicEdit/__mocks__/topicData';
import Form from './Form';

it('renders ArticleEdit Form', () => {
  const handleFieldChange = jest.fn();
  const setTopics = jest.fn();
  const comp = renderer.create(
    <Form
      mobile={false}
      title="title"
      order="1"
      topics={topics}
      sub_topics={subTopics}
      selectedTopic={topics[0]}
      selectedSubTopic={subTopics[0]}
      handleFieldChange={handleFieldChange}
      setTopics={setTopics}
    />
  );
  const tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ArticleEdit Form', () => {
  const handleFieldChange = jest.fn();
  const setTopics = jest.fn();
  const comp = renderer.create(
    <Form
      mobile={false}
      title="title"
      order="1"
      topics={topics}
      sub_topics={subTopics}
      selectedTopic={topics[0]}
      selectedSubTopic={null}
      handleFieldChange={handleFieldChange}
      setTopics={setTopics}
    />
  );
  const tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Form ops', () => {
  let comp;
  let handleFieldChange;
  let setTopics;
  let inst;
  beforeEach(() => {
    handleFieldChange = jest.fn();
    setTopics = jest.fn();
    comp = shallow(
      <Form
        mobile={false}
        title="title"
        order="1"
        topics={topics}
        sub_topics={subTopics}
        selectedTopic={topics[0]}
        selectedSubTopic={subTopics[0]}
        handleFieldChange={handleFieldChange}
        setTopics={setTopics}
      />
    );
    inst = comp.instance();
  });
  it('handles change of topic', () => {
    inst.handleTopicSelect({ target: { value: topics[1]._id } });
    expect(setTopics).toHaveBeenCalledWith(topics[1], null);
  });
  it('handles change of sub-topic', () => {
    inst.handleSubTopicSelect({ target: { value: subTopics[0]._id } });
    expect(setTopics).toHaveBeenCalledWith(topics[0], subTopics[0]);
  });
});
