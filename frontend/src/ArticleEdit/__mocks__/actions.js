/* eslint-disable import/prefer-default-export */
import article from './articleData';

// eslint-disable-next-line no-unused-vars
const save = payload =>
  new Promise(resolve => resolve({ success: true, _id: article._id }));

const get = id =>
  new Promise((resolve, reject) => {
    if (id === '43039ac8d0a244719d9d31e0731bcbe8') {
      resolve(article);
    }
    return reject(new Error('article id not found'));
  });

export default { save, get };
