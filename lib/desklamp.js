'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncLink = exports.Link = exports.Desklamp = exports.Container = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// how to make view the same name as the changed name in the RenderDOM
var Link = function Link(_ref) {
  var view = _ref.view;
  var tag = _ref.tag;

  return _react2.default.createElement(
    'a',
    { href: '#' + view },
    tag
  );
};

var AsyncLink = function AsyncLink(_ref2) {
  var view = _ref2.view;
  var tag = _ref2.tag;
  var func = _ref2.func;

  return _react2.default.createElement(
    'a',
    { href: '#' + view, onClick: function onClick(e) {
        e.preventDefault();Desklamp.syncRoute(view, func);
      } },
    tag
  );
};

var Desklamp = {};

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container() {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

    _this.state = {
      view: '',
      renderNav: '',
      appState: {},
      routeStates: {},
      views: {},
      userFunctions: {}
    };
    // Array that stores the application history
    _this.stateHistory = [];
    // Adds addFuncs control to the Desklamp obj
    _this.addFuncs = _this.addFuncs.bind(_this);
    Desklamp.addFunc = _this.addFuncs;
    // Binds routing and view functions
    _this.changeView = _this.changeView.bind(_this);
    Desklamp.changeView = _this.changeView;
    _this.routeLink = _this.routeLink.bind(_this);
    _this.getRoutes = _this.getRoutes.bind(_this);
    // Adds updateState and showState funcs to Desklamp obj
    _this.updateState = _this.updateState.bind(_this);
    Desklamp.updateState = _this.updateState;
    _this.showState = _this.showState.bind(_this);
    Desklamp.showState = _this.showState;
    // Adds history to Desklamp obj
    _this.history = _this.history.bind(_this);
    Desklamp.history = _this.history;
    // Adds the on function to Desklamp obj
    _this.on = _this.on.bind(_this);
    Desklamp.on = _this.on;
    // Allows the developer to use the componentWillMount on Container component
    _this.onLoad = _this.onLoad.bind(_this);
    Desklamp.onLoad = _this.onLoad;
    // Adds the on function to Desklamp obj to set a default route
    _this.defaultRoute = _this.defaultRoute.bind(_this);
    Desklamp.defaultRoute = _this.defaultRoute;
    // Adds the on function to Desklamp obj
    _this.syncRoute = _this.syncRoute.bind(_this);
    Desklamp.syncRoute = _this.syncRoute;
    return _this;
  }

  _createClass(Container, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      window.onhashchange = function () {
        var pathstring = location.hash;
        _this2.routeLink(pathstring.replace('#', ''));
      };
      this.getRoutes();
      this.onLoad();
    }

    // Runs all functions passed to onLoad

  }, {
    key: 'onLoad',
    value: function onLoad() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (func) {
        func();
      });
    }
  }, {
    key: 'getRoutes',
    value: function getRoutes() {
      var newRoutes = {};
      var startRoute = void 0;
      // if no starting route passed in, go get starting route from first child
      // if there are no children of container, default route is '/'
      if (!this.props.children) {
        startRoute = '';
        throw new TypeError('Container must have children components in order to create Routes');
      } else {
        var children = this.props.children.constructor === Object ? [this.props.children] : this.props.children;
        startRoute = children[0].type;
        children.forEach(function (route) {
          var routeName = '';
          if (route.props.children) {
            addChildrenRoutes(routeName, route);
          } else {
            if (typeof route.props.name === 'string') {
              newRoutes['/' + route.props.name] = route.type;
            } else {
              var _routeName = route.type.name.toLowerCase();
              newRoutes['/' + _routeName] = route.type;
            }
          }

          function addChildrenRoutes(topString, currentChild) {
            var name = 'type';
            if (typeof currentChild.props.name === 'string') {
              name = 'props';
            }

            var childRouteName = topString += '/' + currentChild[name].name.toLowerCase();

            newRoutes[childRouteName] = currentChild.type;

            if (currentChild.props.children) {
              var _children = currentChild.props.children.constructor === Object ? [currentChild.props.children] : currentChild.props.children;
              for (var i = 0; i < _children.length; i++) {
                var tempRouteName = childRouteName;
                var currChild = _children[i];
                var otherName = 'type';
                if (typeof currChild.props.name === 'string') {
                  otherName = 'props';
                }
                var newRouteName = tempRouteName += '/' + currChild[otherName].name.toLowerCase();
                newRoutes[newRouteName] = currChild.type;
                if (currChild.props.children) {
                  addChildrenRoutes(tempRouteName, currChild.props.children);
                }
              }
            }
          }
        });
      }
      console.log(newRoutes);
      var newState = Object.assign({}, this.state.views, newRoutes);
      var routeName = this.props.children[0].props.name || this.props.children[0].type.name.toLowerCase();
      window.location.hash = '#/' + routeName;
      this.setState({ views: newState, view: startRoute });
    }
  }, {
    key: 'syncRoute',
    value: function syncRoute(view, func) {
      var first = new Promise(function (resolve, reject) {
        func();
      });
      first.then(window.location.hash = view);
    }

    // Allows the developer to update the state of their application

  }, {
    key: 'updateState',
    value: function updateState(newObj) {
      if (newObj.constructor === Object) {
        // Save old appState to history
        this.history(this.state.appState);
        // Update appState with new state
        var newState = Object.assign({}, this.state.appState, newObj);
        this.setState({ appState: newState });
      } else {
        throw new Error('updateState(): arg must be an object.');
      }
    }

    // Displays the current application state

  }, {
    key: 'showState',
    value: function showState() {
      return this.state.appState;
    }

    // Keeps a point in time snapshot of the application state

  }, {
    key: 'history',
    value: function history(newState) {
      var oldHistory = this.stateHistory;
      this.stateHistory = [].concat(_toConsumableArray(oldHistory), [newState]);
    }

    // Initializes the default state, user functions, start route and navbar.

  }, {
    key: 'on',
    value: function on(initState, userFuncs, navbar) {
      if (initState.constructor !== Object && initState !== undefined) {
        throw new TypeError('on(): takes an object as a first parameter representing initial state');
      }
      if (userFuncs.constructor !== Object && userFuncs !== undefined) {
        throw new TypeError('on(): takes an object as a second parameter which contains functions');
      }
      if (navbar.constructor !== Function && navbar !== undefined) {
        throw new TypeError('on(): takes a boolean as a fourth param; true if you want our navbar');
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
  }, {
    key: 'defaultRoute',
    value: function defaultRoute(route) {
      var defaultView = Object.assign({}, this.state.views);
      var otherName = 'type';
      if (typeof route !== 'string') {
        if (typeof route.props.name === 'string') {
          otherName = 'props';
        }
        defaultView['/' + route[otherName].name.toLowerCase()] = route.type;
        defaultView.default = '/' + route[otherName].name.toLowerCase();
      } else {
        defaultView.default = route;
      }
      this.setState({ views: defaultView });
    }
  }, {
    key: 'addFuncs',
    value: function addFuncs(input) {
      if (input.constructor !== Object) {
        throw new TypeError('Input to addFuncs must be an object with methods that are functions');
      }
      for (var key in input) {
        if (input[key].constructor !== Function) {
          throw new TypeError('Your input to addFuncs contains ' + key + ' which is not a function');
        }
        this.state.userFunctions[key] = input[key].bind(this);
      }
    }
  }, {
    key: 'changeView',
    value: function changeView(view, newState) {
      if (typeof view !== 'string') {
        throw new Error('changeView(): takes a string as a first parameter');
      }
      if (newState.constructor !== Object) {
        throw new Error('changeView(): takes an object as a second parameter');
      }
      // update appState only by copying
      var notAppState = Object.assign({}, this.state.appState, newState);
      // update appState on this.state
      this.setState({ appState: notAppState });
      window.location.hash = '#/' + view;
    }
  }, {
    key: 'routeLink',
    value: function routeLink(view) {
      if (this.state.views[view]) {
        this.setState({ view: this.state.views[view] }); // TODO: let Dev pass in variable for url string
      } else {
        window.location.hash = '#' + this.state.views.default;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('this views', this.state.views);
      var navBar = this.state.renderNav ? _react2.default.createElement(this.state.renderNav, { state: this.state.appState, powers: this.state.userFunctions }) : undefined;
      return _react2.default.createElement(
        'div',
        null,
        navBar,
        _react2.default.createElement(this.state.view, { state: this.state.appState, powers: this.state.userFunctions })
      );
    }
  }]);

  return Container;
}(_react2.default.Component);

exports.Container = Container;
exports.Desklamp = Desklamp;
exports.Link = Link;
exports.AsyncLink = AsyncLink;