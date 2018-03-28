# JSON structure which keeps HTML:

---

## PAGES

---

Every HTML page is presented as JSON object **with key "HTMLTree"** (type: _Array_).

_in filesystem_ :

file "db/content/Example-Page.json"

```
{
	"HTMLTree" : [
	//   all html elements to be here inside array.
	//
	]
}
```

---

## ELEMENTS OF PAGE

---

Array "HTMLTree" includes elements (type: _Object_) which are **1st-level HTML elements**.

                 example1:

_HTML_

```
 <div>
  <h1>FOO</h1>
  <p>BAR</p>
 </div>
```

_JSON_

```
{
	"HTMLTree": [
		{
			*div*           (detailed structure later, here's the main idea)
		}
	]
}
```

                 example2:

_HTML_

```
  <h1>FOO</h1>
  <p>BAR</p>
  <p>next</p>
```

_JSON_

```
 {
 	"HTMLTree": [
 		{
 			*FOO*           (detailed structure later, here's the main idea)
 		},
 		{
 			*BAR*           (this element is also on root level of presented HTML-tree)
 		},
 		{
 			*next*
 		}
 	]
 }
```

---

## ELEMENT DETAILS

---

Every HTML element as was spoken before, in JSON is an **_object_**.

_inside the "HTMLTree" , e.g HTMLTree[0]_ :

```
{
	// there is an object for element (*Foo* from previous chapter)
}
```

### Tags, Text content

The keys of **_object_** are: "**tag**", "**textContent**".

    	example1:

_JSON_

```
{
	"tag" : "p",
	"textContent" : "Hello"

}
```

_HTML_

```
<p>Hello</p>
```

### Nested elements

If HTML element **has nested HTML elements** inside,

in **_object_** is used key "**children**"
(value type : _Array_, elements of array are **closest nested HTML elements**).

         example:

_HTML_

```
<div>
	<h1>First child</h1>
	<p>Second child</p>
</div>  
```

_JSON_

```
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
```

---

#### !!!! THE MOST IMPORTANT THING ABOUT NESTED ELEMENTS !!!!

1.  If **NO** nested tags:

JSON for current element will have **ONLY "textContent"** key(_string_) and **NO "children"** key(_array_).

_HTML_

```
<p>Text</p>
```

_JSON_

```
{
	"tag": "p",
	"textContent" : "Text"
}
```

2.  If **HAS** hested tags:

JSON for current tag will have **NO "textContent"** key(_string_) and **ONLY "children"** key(_array_).
(if has also text content - some of **"children"** will be without **"tag"**).

       example.1

_HTML_

```
<p>
	<span>TEXT</span>
</p>
```

          example.2

_HTML_

```
<p>
	TEXT                         //  only text, no tag around
	<span>TEXT</span>
	ADDITIONAL TEXT
	<span>MORE TEXT</span>
</p>
```

in **ex.1 and 2** JSON structure will be made the **same way**.

_JSON_

```
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
```

---

### HTML Attributes

The "**tag**", "**textContent**", "**children**" are _reserved keywords_ which will not be recognized as HTML attributes.

Any other object keys of element in JSON will be recognized as **attributes**.

example:

_JSON_

```
{
	"tag" : "p",
	"textContent" : "Check da microphone",
	"class" : "intro-text",
	"myAttribute" : "44bc"

}
```

_HTML_

```
<p> class="intro-text" myAttribute="44bc">Check da microphone</p>
```
