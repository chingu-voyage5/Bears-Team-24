const handleJSONResponse = response => {
  if (response.ok) {
    return response.json();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    status: response.status,
    statusText: response.statusText,
  });
};

const handleTextResponse = response => {
  if (response.ok) {
    return response.text();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    status: response.status,
    statusText: response.statusText,
  });
};

const handleImageResponse = response => {
  if (response.ok) {
    return response.blob();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    status: response.status,
    statusText: response.statusText,
  });
};

const handleResponse = response => {
  const contentType = response.headers.get('content-type');
  const re = /text\/(plain)|(html)/;
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response);
  } else if (re.test(contentType)) {
    return handleTextResponse(response);
  } else if (contentType.includes('image')) {
    return handleImageResponse(response);
  }
  throw new Error(`Sorry, content-type ${contentType} not supported`);
};

export default handleResponse;
