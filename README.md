# Desklamp
## Get Started

Desklamp is a React library which provides a state container and easy creation of routes. 

To get started, `npm install --save desklamp`. 

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

Routing in Desklamp is meant to get you up and running with client-side page navigation and url updates, as well as browser history, as soon as possible. To create basic navigation, simply render your components inside the `Container` component Desklamp provides. For example, if you want to create routes for components `Home`, `Login`, `Signup` and `Posts`, first define these components as you normally would, then import them into your top component, and then nest them inside the `Container` component like so:

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

Similarly to the popular [Redux library](https://github.com/reactjs/redux), Desklamp allows you to keep your state in a single object which we call _appstate_. 
Unlike Redux, which constrains how you can interact with your application's state using actions and reducers, Desklamp gives you many options for state control. ~~Go nuts.~~

The _appstate_ is available to your components and functions.

`Desklamp.on` is the main function you will use to tell Desklamp about your application. This method takes three arguments, representing the initial state (must be an object), your update functions (must be an object), and a string representing the route you would like to be your initial view. This will declare your initial state, bind your customized functions to the _appstate_.

The custom functions declared to Desklamp.on will become your _powers_ which are automatically passed to each one of your views. You can then pass them as props down to child components as selectively as you would like. The initial state will become your _state_, also available to all the routes you have set up in your `Container`.

## Built in Functions

Desklamp provides some helper methods to make changing views easy.

`Desklamp.changeView(viewname, change_to_state)` takes a `viewname` as a string, corresponding to the name of your view component, and an object `change_to_state` representing any state properties that need to be updated.

## Debugging
We are adding error handling messages to help you debug.

### Misc
A floor lamp is a desk lamp if you put it on your desk.
