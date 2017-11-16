(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




function debounce(fn, delay) {
  var timer = null;

  return function () {
    var _this = this,
        _arguments = arguments;

    clearTimeout(timer);
    timer = setTimeout(function () {
      return fn.apply(_this, _arguments);
    }, delay);
  };
}

var ReactSuggestions = function (_PureComponent) {
  _inherits(ReactSuggestions, _PureComponent);

  function ReactSuggestions() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, ReactSuggestions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = ReactSuggestions.__proto__ || Object.getPrototypeOf(ReactSuggestions)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      query: '',
      suggestions: [],
      focusedIndex: -1,
      isOpen: false
    }, _this2.loadSuggestions = debounce(function (query, token, count) {
      var locations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      if (_this2.xhr) {
        _this2.xhr.abort();
      }

      _this2.xhr = new XMLHttpRequest();
      _this2.xhr.open("POST", "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address");
      _this2.xhr.setRequestHeader("Accept", "application/json");
      _this2.xhr.setRequestHeader("Authorization", 'Token ' + token);
      _this2.xhr.setRequestHeader("Content-Type", "application/json");
      _this2.xhr.send(JSON.stringify({ query: query, count: count, locations: locations }));

      _this2.xhr.onreadystatechange = function () {
        if (_this2.xhr.readyState != 4) {
          return;
        }

        if (_this2.xhr.status == 200) {
          var response = JSON.parse(_this2.xhr.response);

          if (response && response.suggestions) {
            _this2.setState({ suggestions: response.suggestions });
          }
        }
      };
    }, _this2.props.delay), _this2.handleChange = function () {
      var _this3;

      return (_this3 = _this2).__handleChange__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _this2.handleFocus = function () {
      var _this4;

      return (_this4 = _this2).__handleFocus__REACT_HOT_LOADER__.apply(_this4, arguments);
    }, _this2.handleBlur = function () {
      var _this5;

      return (_this5 = _this2).__handleBlur__REACT_HOT_LOADER__.apply(_this5, arguments);
    }, _this2.handleHover = function () {
      var _this6;

      return (_this6 = _this2).__handleHover__REACT_HOT_LOADER__.apply(_this6, arguments);
    }, _this2.handleKeyPress = function () {
      var _this7;

      return (_this7 = _this2).__handleKeyPress__REACT_HOT_LOADER__.apply(_this7, arguments);
    }, _this2.handleSelect = function () {
      var _this8;

      return (_this8 = _this2).__handleSelect__REACT_HOT_LOADER__.apply(_this8, arguments);
    }, _this2.renderSuggestions = function () {
      var _this9;

      return (_this9 = _this2).__renderSuggestions__REACT_HOT_LOADER__.apply(_this9, arguments);
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(ReactSuggestions, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.token) {
        console.warn('react-suggestions: You need pass dadata api-key to props. See https://dadata.ru/api/suggest/');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        query: this.props.query
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.query !== this.props.query) {
        this.setState({
          query: nextProps.query
        });
      }
    }
  }, {
    key: '__handleChange__REACT_HOT_LOADER__',
    value: function __handleChange__REACT_HOT_LOADER__(evt) {
      var _props = this.props,
          min = _props.min,
          token = _props.token,
          count = _props.count,
          delay = _props.delay,
          locations = _props.locations;


      if (!token) {
        return;
      }

      var query = evt.target.value;

      var state = { query: query, isOpen: true };

      if (query.length < min) {
        state.suggestions = [];
      } else {
        this.loadSuggestions(query, token, count, locations);
      }

      this.setState(_extends({}, state));
    }
  }, {
    key: '__handleFocus__REACT_HOT_LOADER__',
    value: function __handleFocus__REACT_HOT_LOADER__(evt) {
      var onFocus = this.props.onFocus;


      this.setState({ isOpen: true });

      if (onFocus) {
        onFocus(evt);
      }
    }
  }, {
    key: '__handleBlur__REACT_HOT_LOADER__',
    value: function __handleBlur__REACT_HOT_LOADER__(evt) {
      var onBlur = this.props.onBlur;


      this.setState({
        isOpen: false,
        focusedIndex: -1
      });

      if (onBlur) {
        onBlur(evt);
      }
    }
  }, {
    key: '__handleHover__REACT_HOT_LOADER__',
    value: function __handleHover__REACT_HOT_LOADER__(focusedIndex) {
      this.setState({ focusedIndex: focusedIndex });
    }
  }, {
    key: '__handleKeyPress__REACT_HOT_LOADER__',
    value: function __handleKeyPress__REACT_HOT_LOADER__(evt) {
      if ([40, 38, 13].includes(evt.which)) {
        evt.preventDefault();

        var _state = this.state,
            suggestions = _state.suggestions,
            index = _state.focusedIndex;

        var length = this.props.count - 1;

        if (evt.which === 40) {
          var result = index === length || index === -1 ? 0 : ++index;

          this.setState({ focusedIndex: result });
        }

        if (evt.which === 38) {
          var _result = index === 0 || index === -1 ? length : --index;

          this.setState({ focusedIndex: _result });
        }

        if (evt.which === 13 && index !== -1 && suggestions[index]) {
          this.handleSelect(suggestions[index], index);
        }
      }
    }
  }, {
    key: '__handleSelect__REACT_HOT_LOADER__',
    value: function __handleSelect__REACT_HOT_LOADER__(suggestion, index) {
      var onChange = this.props.onChange;


      this.setState({
        query: suggestion.value,
        isOpen: false
      });

      if (onChange) {
        onChange(suggestion, index);
      }
    }
  }, {
    key: '__renderSuggestions__REACT_HOT_LOADER__',
    value: function __renderSuggestions__REACT_HOT_LOADER__() {
      var _this10 = this;

      var _state2 = this.state,
          suggestions = _state2.suggestions,
          focusedIndex = _state2.focusedIndex;


      var result = suggestions.filter(function (suggestion) {
        return !!suggestion;
      }).map(function (suggestion, index) {
        var itemCns = index === focusedIndex ? 'focused' : '';

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          {
            className: itemCns,
            key: index,
            onMouseDown: function onMouseDown() {
              return _this10.handleSelect(suggestion, index);
            },
            onMouseEnter: function onMouseEnter() {
              return _this10.handleHover(index);
            } },
          suggestion.value
        );
      });

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          omit = _props2.query,
          token = _props2.token,
          min = _props2.min,
          count = _props2.count,
          className = _props2.className,
          delay = _props2.delay,
          locations = _props2.locations,
          rest = _objectWithoutProperties(_props2, ['query', 'token', 'min', 'count', 'className', 'delay', 'locations']);

      var _state3 = this.state,
          query = _state3.query,
          suggestions = _state3.suggestions,
          isOpen = _state3.isOpen,
          focusedIndex = _state3.focusedIndex;


      var wrapperCns = className ? 'react-suggestions ' + className : 'react-suggestions';

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: wrapperCns },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({}, rest, {
          type: 'text',
          value: query,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyPress: this.handleKeyPress,
          onKeyDown: this.handleKeyPress })),
        !!suggestions.length && isOpen && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          null,
          this.renderSuggestions()
        )
      );
    }
  }]);

  return ReactSuggestions;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

ReactSuggestions.defaultProps = {
  token: '',
  query: '',
  min: 2,
  count: 10,
  delay: 0
};
var _default = ReactSuggestions;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(debounce, 'debounce', '/Users/Roman/Documents/projects/react-suggestions/src/index.js');

  __REACT_HOT_LOADER__.register(ReactSuggestions, 'ReactSuggestions', '/Users/Roman/Documents/projects/react-suggestions/src/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/Roman/Documents/projects/react-suggestions/src/index.js');
}();

;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});