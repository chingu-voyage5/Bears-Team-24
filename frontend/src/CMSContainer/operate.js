export function checkLocalStorage(){
	if (!localStorage.getItem('allArticles')){
		console.log('request articles from backend');
		fetch('/api/v1/articles/')
		.then(res => res.json())
		.then(data => localStorage.setItem('allArticles', JSON.stringify(data)));
		console.log('articles data received');
		let articles = localStorage.getItem('allArticles');
		let pathTable = buildPathTable(articles);
		localStorage.setItem('pathTable', JSON.stringify(pathTable));
		let articleIndex = buildArticleNumbers(articles);
		localStorage.setItem('articleIndex', JSON.stringify(articleIndex));
		let tree = buildTopicTree(articles);
		localStorage.setItem('tree', JSON.stringify(tree));
	}
		
	
}

function buildPathTable(articles){
	// with pathtable i can find id of article at specific path 
	let arr = JSON.parse(articles);
	let obj = {};
	for(let i=0; i<arr.length;i++){
		let c = arr[i];  // current element
		let path = `${c.topic}|${c.sub_topic}|${c.title}`;
		obj[slug(path)] = c._id;
	}
	return obj;
	
}

function buildArticleNumbers(articles){
	// with this table i can quickly find element in allArticles if i know id  
	let arr = JSON.parse(articles);
	let obj = {};
	for(let i=0; i<arr.length;i++){
		let c = arr[i];  // current element
		obj[c._id] = i;
	}
	return obj;
}

function slug(fullPath){
	return fullPath.toLowerCase().replace(/[^A-Za-z0-9-| ]/g, '').replace(/\s/g, '-');
}


function buildTopicTree(articles){
	let arr = JSON.parse(articles);
	let tree = {}; 
	
	for(let i=0; i<arr.length;i++){
		let c = arr[i];
		let slugTopic = slug(c.topic);
		if(!tree[slugTopic]){
			tree[slugTopic] = {_title: c.topic};
		}
		let slugSubtopic = slug(c.sub_topic);
		if(!tree[slugTopic][c.slugSubtopic]){
			tree[slugTopic][slugSubtopic] = {_title: c.sub_topic};
		}
		let slugTitle = slug(c.title);
		if(!tree[slugTopic][slugSubtopic][slugTitle]){
			tree[slugTopic][slugSubtopic][slugTitle] = {_title: c.title};
		}
	}
		
	return tree;
}
