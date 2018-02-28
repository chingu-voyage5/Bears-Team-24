JSON structure which keeps HTML: 

----------
PAGES

Every HTML page is presented as JSON object with key "HTMLTree" (type: Array).
in filesystem : file "db/content/Example-Page.json"

{
	"HTMLTree" : [
	//   all html elements to be here inside array.
	//
	]
}

----------
ELEMENTS OF PAGE

Array elements are (type: Object) 1st-level HTML elements.
                 example1: 
-HTML- 
 <div>
  <h1>FOO</h1>
  <p>BAR</p>
 </div>
 
-JSON-
 
 {
 	"HTMLTree": [
 		{
 			FOO           (detailed structure later, here's the main idea)
 		}
 	]
 }
 
                 example2: 
-HTML-
  <h1>FOO</h1>
  <p>BAR</p>
  <p>next</p>
  
-JSON-
 
 {
 	"HTMLTree": [
 		{
 			FOO           (detailed structure later, here's the main idea)
 		},
 		{
 			BAR           (this element is also on root level of presented HTML-tree)
 		},
 		{
 			next
 		}
 	]
 }
 
 
----------
ELEMENT DETAILS

Every HTML element as was spoken before, in JSON is an object.

{
	// there is an object for element
} 

  =Tags, Text content=
The keys of object are: "tag", "textContent".

		example1:
-JSON-    
{
	"tag" : "p",
	"textContent" : "Hello"
	
}

-HTML-

<p>Hello</p>



  =Nested elements=
  
If HTML element has nested HTML elements inside, 
is used key "children" (value type : Array, elements of array are closest nested HTML elements).

	example:
	
-HTML-

<div>
	<h1>First child</h1>
	<p>Second child</p>
</div>  

-JSON- 

{
	"tag": "div",
	"children": [
		{
		"tag" : "h1",
		"textContent" : "First child"
		},
		{
		"tag" : "p",
		"textContent" : "Second child"
		// if nested element also has nested elements (2-nd level if count of root element) , 
		// there will be another "children" key here in nested object, etc...
		}	
	]
}

If NO nested tags:
 JSON for current tag will have ONLY "textContent" key(string) and NO "children" key(array).
<p>Text</p>

{
	"tag": "p",
	"textContent" : "Text"
} 
 

If HAS hested tags:
 JSON for current tag will have NO "textContent" key(string) and ONLY "children" key(array).
(no matter if has also text content).
example.1 
<p>
	<span>TEXT</span>
</p>
example.2
<p>
	TEXT                         //  only text, no tag around
	<span>TEXT</span>
	ADDITIONAL TEXT
	<span>MORE TEXT</span>
</p>

in ex.1 and 2 JSON structure will be made the same way.
{
	"tag": "p",
	"children": [
		{
		"textContent" : "TEXT"           //  textContent without tag
		},
		{
		"tag": "span"
		"textContent" : "TEXT"           // another element which has tag
		},
	
		....
		
	]
}


  =HTML Attributes=
  
The "tag", "textContent", "children" are /reserved keywords/ which will not be recognized as HTML attributes
Any other object keys of element in JSON will be recognized as attributes.

example: 

-JSON-

{
	"tag" : "p",
	"textContent" : "Check da microphone",
	"class" : "intro-text",
	"myAttribute" : "44"
		
} 

-HTML-

<p> class="intro-text" myAttribute="44">Check da microphone</p>





 
 
 