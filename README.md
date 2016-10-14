# Desklamp

![alt](https://img.shields.io/npm/v/desklamp.svg) ![alt](https://img.shields.io/npm/dm/v/desklamp.svg)

## Get Started

Desklamp is a React library which provides a state container and easy creation of routes. 

To get started, `npm install --save desklamp`. 

### Version: 
This module is in active development! We will release a few more iterations in the upcoming weeks. Please submit any issues and/or feature requests and we will try to incorporate them.

### Import What you Need

To set up your own application, start at your topmost component and import the module.

```
import { Desklamp, Container } from 'desklamp'; 
import React from 'react'; 
import ReactDOM from 'react-dom';
```
`Desklamp` gives you access to our helper methods. 
`Container` gives you the container component with all the application state.

## Routes

Routing in Desklamp is meant to get you up and running with client-side page navigation and url updates, as well as browser history, as soon as possible. To create basic navigation, simply render your components inside the `Container` component Desklamp provides. For example, if you want to create routes for components `Home`, `Login`, `Signup` and `Posts`, first define these components as you normally would. Then import them into your index.js file (or wherever you're rendering `Container`), and then nest them inside the `Container` component like so:

```
ReactDOM.render((
  <Container>
    <Home /> //creates route /home
    <Login />
    <Signup />
    <Posts />
  </Container>
), document.getElementById('app'));
``` 

## State Container

Desklamp allows you to keep your state in a single object which we call _appstate_. 
Desklamp gives you many options for state control. 
The _appstate_ is automatically available to all of your routes.

`Desklamp.on` is the main function you will use to tell Desklamp about your application. This method takes three arguments, representing the initial state (must be an object), and your custom functions (must be an object), and your `Navbar` component. This will declare your initial state, bind your customized functions to the _appstate_ and display your custom Navbar across all views.

The custom functions declared to Desklamp.on will become your _powers_ which are automatically passed to each one of your views. You can then pass them as props down to child components as selectively as you would like. The initial state will become your _state_, also available to all the routes you have set up in your `Container`.

### Passing Initial State to Desklamp.on()

Create an object representing your initial state. Pass this object as your first parameter to `Desklamp.on()`.

```
const initState = {
  username: '',
  posts: [],
  userInfo: {},
};
```

### Declaring custom functions for Desklamp.on()

Declare an object to hold your functions. Pass this object as the second parameter to `Desklamp.on()`. Any functions added as methods to this object will be automatically bound and passed down to all views upon render, making them available under `props.powers`.
```
const funcs = {};
funcs.hello = () => {
    console.log("Hello World")
  }
```
### Passing a custom Navbar component to Desklamp.on()

Create a Navigation React component and pass it as the third parameter to `Desklamp.on()`. If you would like to link to your other routes, make sure to use our custom `<Link />` component or put `#/` in front of your href attribute.
```
// example using Desklamp's provided <Link/> tags
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><Link view={'/home'} tag={'home'} /></li>
        <li><Link view={'/login'} tag={'login'} /></li>
        <li><Link view={'/posts'} tag={'posts'} /></li>
        <li><Link view={'/signup'} tag={'sign-up'} /></li>
      </ul>
    </nav>
  );
};

// example using normal anchor tags
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><a href="#/home>Home</a></li>
        <li><a href="#/login>Login</a></li>
        <li><a href="#/posts>Posts</a></li>
        <li><a href="#/signup>Signup</a></li>
      </ul>
    </nav>
  );
};

```

After creating these components, `Desklamp.on()` will look like this: 
```
Desklamp.on(initState, funcs, Nav);
```

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


## Built in Components

Desklamp provides `<Link/>` components for you to use to refer to your views. These components take a `view` property referring to the route (without the `#`) and `tag` refers to the displayed text of the link.

```
<Link view={'/home'} tag={'home'} />
```

## Additional Features
History keeps track of all application state

## Debugging
We are adding error handling messages to help you debug.

### Misc
A floor lamp is a desk lamp if you put it on your desk.