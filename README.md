# Desklamp
![desklamp](https://pbs.twimg.com/profile_images/787356890640420869/k9_RzFnT_400x400.jpg)
![alt](https://img.shields.io/npm/v/desklamp.svg) ![alt](https://img.shields.io/npm/dt/desklamp.svg)

Desklamp is a React library which provides a state container and easy creation of routes. 

* No external dependencies
* Provides `<Container />` that creates routes from child components
* Passes state to all children of `<Container />`
* Passes developer-defined functions to all children of `<Container />`
* Robust Desklamp API

### Navigation
  * [Contribute](#contribute)
  * [Getting Started](#gettingstarted)
  * [Creating Routes](#createroutes)
  * [Initializing Your Application](#initialize)
    * [Creating Initial State](#createstate)
    * [Creating Custom Functions](#createfunctions)
    * [Creating Custom Navigation](#createnav)
    * [Initializing App with Desklamp.on](#desklampon)
  * [Built In Functions](#desklampfunctions)
  * [Built In Components](#desklampcomponents)
  * [Extra Features](#features)


## Quick Start <a name="quickstart"></a>

To get started, `npm install --save desklamp`. 

```js
import { Desklamp, Container } from 'desklamp';
import React from 'react';
import ReactDOM from 'react-dom';

// Normal React components
import Home from './components/Home'; 
import CreatePost from './components/CreatePost';
import Nav from './components/Nav'; // custom Nav component that you create (See Nav documentation below)

// Create an initial state object
const initState = {
  posts: [],
};

// Create an object with your custom functions as its methods.
const funcs = {}

ReactDOM.render((
  // Child components here become your routable urls
  <Container>
    <Home name="home" /> // optional name property for custom route/url name
    <CreatePost /> // by default, Desklamp will name your route after your component
  </Container>
), document.getElementById('app'));

funcs.createPost = (post) => {
    alert(post);
  }

// Initialize Desklamp below your ReactDOM.render
// Pass in your initial state object, funcs object, and your imported Nav
Desklamp.on(initState, funcs, Nav);
```
<a name="contribute"></a>

### Contribute: 
This module is in active development! We will release a few more iterations in the upcoming weeks. Please submit any issues and/or feature requests and we will try to incorporate them. Or reach out to our team on [Gitter](https://gitter.im/desklampio/Lobby)

<a name="gettingstarted"></a>
## Getting Started 

### Import What you Need

To set up your own application, start with your `index.js` file and import `Desklamp` and `Container` from the `desklamp` module.

```js
import { Desklamp, Container } from 'desklamp'; 
import React from 'react'; 
import ReactDOM from 'react-dom';
```
`Desklamp` gives you access to our helper methods. 
`Container` gives you the container component with all the application state.

<a name="createroutes"></a>
## Creating Routes 

Routing in Desklamp is meant to get you up and running with client-side page navigation and url updates, as well as browser history, as soon as possible. To create basic navigation, simply nest your components inside the `Container` component Desklamp provides. For example, if you want to create routes for components `Home` and `CreatePost`, first define these components as you normally would. Then import them into your index.js file, and then nest them inside the `Container` component like so:

```js
import Home from './components/Home';
import CreatePost from './components/CreatePost';

ReactDOM.render((
  <Container>
    <Home /> //creates route /home
    <CreatePost />
  </Container>
), document.getElementById('app'));
``` 
<a name="initialize"></a>
## Initializing Your Application 

Desklamp allows you to keep your state in a single _state_ object. 
Desklamp gives you many options for state control. 
The _state_ is automatically available to all of your routes.
This functionality is enabled by the `Desklamp.on()` function.
<a name="createstate"></a>
### Create initial state

Create an object representing your initial state. This object represents all data that will be passed down to each route upon render as `props.state`. 

```js
const initState = {
  username: '',
  posts: [],
  userInfo: {},
};
```
<a name="createfunctions"></a>
### Declaring custom functions

Declare an object to hold your functions. Any functions added as methods to this object will be automatically bound and passed down to all views upon render as `props.powers`.

```js
const funcs = {};
funcs.hello = () => {
    console.log("Hello World")
  }
```
<a name="createnav"></a>
### Creating a Custom Navigation Component

Create a Navigation React component using our custom `<Link/>` component or simple anchor tags. You can mix and match these two approaches, if you wish to link to an external site or a server route on your navigation, simply use a standard anchor tag.

```jsx
// example using Desklamp's provided <Link/> tags
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><Link view={'/home'} tag={'home'} /></li>
        <li><Link view={'/createpost'} tag={'add post'} /></li> <!-- view is the name you gave the route in ReactDom.render(), tag is the display text of the link -->
        <li><a href="https://github.com/desklamp-js/desklamp">Desklamp Github</a></li>
      </ul>
    </nav>
  );
};

// example using normal anchor tags
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><a href="#/home">home</a></li> <!-- Desklamp routes should begin with `#` -->
        <li><a href="#/createposts">add post</a></li>
        <li><a href="https://github.com/desklamp-js/desklamp">Desklamp Github</a></li>
      </ul>
    </nav>
  );
};
```
<a name="desklampon"></a>
### Initializing your App with Desklamp.on()

`Desklamp.on` is the main function you will use to tell Desklamp about your application. This method takes three arguments: the initial state and functions objects we created above, and your `Nav` component. This will declare your initial state, bind your customized functions to the _state_ and display your custom Navbar across all views.

The custom functions declared to Desklamp.on will be passed down to your routes as `props.powers`. You can then pass them as props down to child components as selectively as you would like. The initial state will become your `props.state`, also available to all the routes you have set up in your `Container`.

`Desklamp.on()` will look like this: 

```js
Desklamp.on(initState, funcs, Nav);
```
Example of a component, `CreatePost`, using its default passed in props and powers:
```js
import React from 'react';

const CreatePost = ({state, powers}) => {

  return (
    <div>
      <h1>Add a Post</h1>
      <button onClick={()=>{powers.createPost(state.posts[0])}}>Alert</button>
    </div>
  );
};
```

<a name="desklampfunctions"></a>
## Built in Functions

Desklamp provides some helper methods to make changing views easy.

### Desklamp.changeView()
`Desklamp.changeView()` is a function that takes a string representation of the view or component you wish to switch to. It also takes in an optional second parameter that is an object. This object will be automatically called with the Desklamp.updateState() function to update the state of your application before the route of your application switches. This was constructed with the hopes of resolving issues of when to change state and reducing the issue of React.js components trying to mount with no called upon state inside of them.

### Desklamp.onLoad()
`Desklamp.onLoad()` takes any number of functions and runs them in the `componentWillMount` section of the Container component. This allows you, the developer to run functions on the initial loading of the application at the highest level.

### Desklamp.updateState()
`Desklamp.updateState()` is a function that allows you to update the state of your application from within your custom functions. `Desklamp.updateState()` takes in an object of the values you would like to change in your state. By default Desklamp.updateState maintains immutability and creates an new object with all of the changes before called the default React.js setState function.

### Desklamp.showState()
`Desklamp.showState()` is a simple function that can be called anywhere in your application to show the current state. It can be very useful for debugging and logging what your state looks like if you are experiencing issues with your state data not looking how you think it should.

### Desklamp.history()
`Desklamp.history()` is a function that runs automatically when the state of your application changes and stores the previous version of your state. This is an incredibly useful function for debugging or setting the state with any custom state object that you wish.

<a name="desklampcomponents"></a>
## Built in Components

Desklamp provides `<Link/>` components for you to use to refer to your views. These components take a `view` property referring to the route (without the `#`) and `tag` refers to the displayed text of the link.

```js
<Link view={'/home'} tag={'home'} />
```
<a name="features"></a>
## Additional Features
History keeps track of all application state

## Debugging
We are adding error handling messages to help you debug.

### Misc
A floor lamp is a desk lamp if you put it on your desk.