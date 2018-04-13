function getArticlesJSON () {

	return fetch('/api/v1/articles/')
    	.then(res => res.json())
    	.then(data => data)
    	.catch(err => {
    	  // eslint-disable-next-line no-console
    	  console.error('checkLocalStorage fetch articles failed', err);
    	  return false;
    	});
    
}

export { getArticlesJSON };