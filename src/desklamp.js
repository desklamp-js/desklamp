import React from 'react';
// Custom link component
const Link = ({ view, tag }) => {
  return (
    <a href={`#${view}`} >{tag}</a>
  );
};
// Custom link component to call async functions before routing to page
const AsyncLink = ({ view, tag, func}) => {
  return (
    <a href={`#${view}`} onClick={(e) => { e.preventDefault(); Desklamp.syncRoute(view, func); }} >{tag}</a>
  );
};

// Object that contains all functions
const Desklamp = {};

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      view: '',
      renderNav: '',
      appState: {},
      routeStates: {},
      views: {},
      userFunctions: {},
    };
    // Array that stores the application history
    this.stateHistory = [];
    // Adds addFuncs control to the Desklamp obj
    this.addFuncs = this.addFuncs.bind(this);
    Desklamp.addFunc = this.addFuncs;
    // Binds routing and view functions
    this.changeView = this.changeView.bind(this);
    Desklamp.changeView = this.changeView;
    this.routeLink = this.routeLink.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    // Adds updateState and getState funcs to Desklamp obj
    this.updateState = this.updateState.bind(this);
    Desklamp.updateState = this.updateState;
    this.getState = this.getState.bind(this);
    Desklamp.getState = this.getState;
    // Adds history to Desklamp obj
    this.history = this.history.bind(this);
    Desklamp.history = this.history;
    // Adds the on function to Desklamp obj
    this.on = this.on.bind(this);
    Desklamp.on = this.on;
    // Allows the developer to use the componentWillMount on Container component
    this.onLoad = this.onLoad.bind(this);
    Desklamp.onLoad = this.onLoad;
    // Adds the on function to Desklamp obj to set a default route
    this.defaultRoute = this.defaultRoute.bind(this);
    Desklamp.defaultRoute = this.defaultRoute;
    // Adds the on function to Desklamp obj
    this.syncRoute = this.syncRoute.bind(this);
    Desklamp.syncRoute = this.syncRoute;
  }

  componentWillMount() {
    window.onhashchange = () => {
      const pathstring = location.hash;
      this.routeLink(pathstring.replace('#', ''));
    };
    this.getRoutes();
    this.onLoad();
  }

  // Runs all functions passed to onLoad
  onLoad(...args) {
    args.forEach((func) => {
      func();
    });
  }

  getRoutes() {
      const newRoutes = {};
      let startRoute;
      const children = this.props.children.constructor === Object ? [this.props.children] : this.props.children;
      // if no starting route passed in, go get starting route from first child
        // if there are no children of container, default route is '/'
      if (!this.props.children) {
        startRoute = '';
        throw new TypeError('Container must have children components in order to create Routes');
      } else {
        startRoute = children[0].type;
        children.forEach( (route) => {
          const routeName = '';
          if (route.props.children) {
            addChildrenRoutes(routeName, route);
          } else {
            if (typeof route.props.name === 'string') {
              newRoutes[`/${route.props.name}`] = route.type;
            } else {
              const routeName = route.type.name.toLowerCase();
              newRoutes[`/${routeName}`] = route.type;
            }
          }

          function addChildrenRoutes(topString, currentChild) {
            let name = 'type';
            if (typeof currentChild.props.name === 'string') {
              name = 'props';
            }

            const childRouteName = topString += `/${currentChild[name].name.toLowerCase()}`;

            newRoutes[childRouteName] = currentChild.type;

            if (currentChild.props.children) {
              const children = currentChild.props.children.constructor === Object ? [currentChild.props.children] : currentChild.props.children;
              for (let i = 0; i < children.length; i++) {
                let tempRouteName = childRouteName;
                const currChild = children[i];
                let otherName = 'type';
                if (typeof currChild.props.name === 'string') {
                  otherName = 'props';
                }
                const newRouteName = tempRouteName += `/${currChild[otherName].name.toLowerCase()}`;
                newRoutes[newRouteName] = currChild.type;
                if (currChild.props.children) {
                  addChildrenRoutes(tempRouteName, currChild.props.children);
                }
              }
            }
          }
        });
      }
      const newState = Object.assign({}, this.state.views, newRoutes);
      const routeName = children[0].props.name || children[0].type.name.toLowerCase();
      window.location.hash = (`#/${routeName}`);
      this.setState({ views: newState, view: startRoute });
    }

  syncRoute(view, func) {
    const first = new Promise(
      (resolve, reject) => {
        func();
      }
    );
    first.then(window.location.hash = view);
  }

    // Allows the developer to update the state of their application
  updateState(newObj) {
    if (newObj.constructor === Object) {
      // Save old appState to history
      this.history(this.state.appState);
      // Update appState with new state
      const newState = Object.assign({}, this.state.appState, newObj);
      this.setState({ appState: newState });
    } else {
      throw new Error('updateState(): arg must be an object.');
    }
  }

    // Displays the current application state
  getState() {
    return this.state.appState;
  }

    // Keeps a point in time snapshot of the application state
  history(newState) {
    const oldHistory = this.stateHistory;
    this.stateHistory = [...oldHistory, newState];
  }

  // Initializes the default state, user functions, start route and navbar.
  on(initState, userFuncs, navbar) {
    if (initState.constructor !== Object && initState !== undefined) {
      throw new TypeError('on(): takes an object as a first parameter representing initial state');
    }
    if (userFuncs.constructor !== Object && userFuncs !== undefined) {
      throw new TypeError('on(): takes an object as a second parameter which contains functions');
    }
    if (navbar.constructor !== Function && navbar !== undefined) {
      throw new TypeError('on(): takes a React component as a third param');
    }
    // Update the state to passed in initial state
    this.updateState(initState);
    // Add userFuncs to the userFunctions object
    this.addFuncs(userFuncs);
    // If navbar param is set to true we add navbar as the first children
    if (!navbar) {
      navbar = undefined;
    }
    this.setState({ renderNav: navbar });
  }

  defaultRoute(route) {
    const defaultView = Object.assign({}, this.state.views);
    let otherName = 'type';
    if (typeof route !== 'string') {
      if (typeof route.props.name === 'string') {
        otherName = 'props';
      }
      defaultView[`/${route[otherName].name.toLowerCase()}`] = route.type;
      defaultView.default = `/${route[otherName].name.toLowerCase()}`;
    } else {
      defaultView.default = route;
    }
    this.setState({ views: defaultView });
  }

  addFuncs(input) {
    if (input.constructor !== Object) {
      throw new TypeError('Input to addFuncs must be an object with methods that are functions');
    }
    for (let key in input) {
      if (input[key].constructor !== Function) {
        throw new TypeError(`Your input to addFuncs contains ${key} which is not a function`);
      }
      this.state.userFunctions[key] = input[key].bind(this);
    }
  }

  changeView(view, newState) {
    if (typeof view !== 'string') {
      throw new Error('changeView(): takes a string as a first parameter');
    }
    if (newState.constructor !== Object) {
      throw new Error('changeView(): takes an object as a second parameter');
    }
    // update appState only by copying
    const notAppState = Object.assign({}, this.state.appState, newState);
    // update appState on this.state
    this.setState({ appState: notAppState });
    window.location.hash = (`#/${view}`);
  }

  routeLink(view) {
    if (this.state.views[view]) {
      this.setState({ view: this.state.views[view] }); // TODO: let Dev pass in variable for url string
    } else {
      window.location.hash = (`#${this.state.views.default}`);
    }
  }

  render() {
    const navBar = (this.state.renderNav) ? <this.state.renderNav state={this.state.appState} powers={this.state.userFunctions} /> : undefined;
    return (
      <div>
        {navBar}
        <this.state.view state={this.state.appState} powers={this.state.userFunctions} />
      </div>
    );
  }
}

export { Container };
export { Desklamp };
export { Link };
export { AsyncLink };
