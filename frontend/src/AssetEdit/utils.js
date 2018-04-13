const getFileType = (file, availableTypes = []) => {
  if (
    !file ||
    !file.type ||
    (typeof availableTypes !== 'object' && !availableTypes.length)
  ) {
    return 'other';
  }

  let fileType = file.type.split('/')[0] || 'other';

  if (!availableTypes.includes(fileType)) {
    fileType = 'other';
  }

  return fileType;
};

const getMediaType = d64 => {
  if (!d64) {
    return '';
  }

  if (typeof d64 !== 'string') return 'other';

  const match = d64.match(/(:)(\w+)(\/)/);

  if (!match || match.length < 3) {
    return 'other';
  }

  return match[2];
};

const readFile = file =>
  new Promise(resolve => {
    if (!(file instanceof File)) {
      resolve('');
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(file);
  });

const getLocalUrl = blob => URL.createObjectURL(blob);

const packageData = ({ _id, file, title, description }) => {
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

export { getFileType, getMediaType, packageData, readFile, getLocalUrl };
