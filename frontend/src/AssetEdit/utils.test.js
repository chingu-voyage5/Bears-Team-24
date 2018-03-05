import { getFileType, getMediaType, readFile } from './utils';

const file = new File(['lorem ipsum'], 'foo', {
  type: 'image/jpeg',
});
const data64 = 'data:image/jpeg;base64,bG9yZW0gaXBzdW0=';
const availableTypes = ['image', 'video', 'audio'];

describe('AssetEdit utils', () => {
  it('readFile should convert file to dataURL', async () => {
    const result = await readFile(file);

    expect(result).toEqual(data64);
  });

  it('readFile should handle invalid argument', async () => {
    const res1 = await readFile();
    const res2 = await readFile(42);
    const res3 = await readFile('a', 15);

    expect(res1).toEqual('');
    expect(res2).toEqual('');
    expect(res3).toEqual('');
  });

  it('getFileType should return file type', () => {
    const res = getFileType(file, availableTypes);

    expect(res).toEqual('image');
  });

  it('getFileType should handle invalid input', () => {
    const res1 = getFileType();
    const res2 = getFileType('foo', 3);
    const res3 = getFileType({}, {});
    const res4 = getFileType(undefined, undefined);

    expect(res1).toEqual('other');
    expect(res2).toEqual('other');
    expect(res3).toEqual('other');
    expect(res4).toEqual('other');
  });

  it('getMediaType should return media type', () => {
    const res = getMediaType(data64);

    expect(res).toEqual('image');
  });

  it('getMediaType should handle invalid input', () => {
    const res1 = getMediaType();
    const res2 = getMediaType('a');
    const res3 = getMediaType(5);
    const res4 = getMediaType({});
    const res5 = getMediaType({}, []);

    expect(res1).toEqual('');
    expect(res2).toEqual('other');
    expect(res3).toEqual('other');
    expect(res4).toEqual('other');
    expect(res5).toEqual('other');
  });
});
