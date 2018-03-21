import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import AssetEdit from '.';

describe('AssetEdit component', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<AssetEdit />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders image preview', () => {
    const props = {
      asset: 'data:image/jpeg;base64,bG9yZW0gaXBzdW0=',
      description: 'descr.',
      fileType: 'image',
      title: 'title',
    };

    const wrapper = shallow(<AssetEdit {...props} />);

    const dropArea = wrapper.find('DropArea');

    expect(dropArea.find('ImgPreview').length).toEqual(1);
    expect(dropArea.find('audio').length).toEqual(0);
    expect(dropArea.find('video').length).toEqual(0);
  });

  it('renders audio preview', () => {
    const props = {
      asset: 'data:audio/mp3;base64,bG9yZW0gaXBzdW0=',
      description: 'descr.',
      fileType: 'audio',
      title: 'title',
    };

    const wrapper = shallow(<AssetEdit {...props} />);

    const dropArea = wrapper.find('DropArea');

    expect(dropArea.find('ImgPreview').length).toEqual(0);
    expect(dropArea.find('audio').length).toEqual(1);
    expect(dropArea.find('video').length).toEqual(0);
  });

  it('renders video preview', () => {
    const props = {
      asset: 'data:video/mp4;base64,bG9yZW0gaXBzdW0=',
      description: 'descr.',
      fileType: 'audio',
      title: 'title',
    };

    const wrapper = shallow(<AssetEdit {...props} />);

    const dropArea = wrapper.find('DropArea');

    expect(dropArea.find('ImgPreview').length).toEqual(0);
    expect(dropArea.find('audio').length).toEqual(0);
    expect(dropArea.find('video').length).toEqual(1);
  });

  it('handles DropArea click', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<AssetEdit />);

    wrapper.instance().fileInput.click = mockFn;
    const initialScale = wrapper.state('scale');
    wrapper.find('DropArea').simulate('click');
    const newScale = wrapper.state('scale');

    expect(mockFn).toHaveBeenCalled();
    expect(initialScale).toEqual(newScale);
  });

  it('handles DropArea click with image preview', () => {
    const props = {
      asset: 'data:image/jpeg;base64,bG9yZW0gaXBzdW0=',
      description: 'descr.',
      fileType: 'image',
      title: 'title',
    };

    const mockFn = jest.fn();
    const wrapper = mount(<AssetEdit {...props} />);
    const initialScale = wrapper.state('scale');

    wrapper.instance().fileInput.click = mockFn;
    wrapper.find('ImgPreview').simulate('click');
    const newScale = wrapper.state('scale');

    expect(mockFn).not.toHaveBeenCalled();
    expect(newScale).toEqual(!initialScale);
  });
});
