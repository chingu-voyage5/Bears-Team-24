const getFileType = (file, availableTypes) => {
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

  const match = d64.match(/(:)(\w+)(\/)/);

  if (!match || match.length < 3) {
    return 'other';
  }

  return match[2];
};

const readFile = (file, cb) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    cb(reader.result);
  });

  reader.readAsDataURL(file);
};

export { getFileType, getMediaType, readFile };
