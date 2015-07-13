(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["helperIs"] = factory();
	else
		root["helperIs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = function(value) {
	    return Object.prototype.toString.call(value) === '[object Array]'
	}

	var ExpressionRegistry = function() {
	    this.expressions = []
	}

	ExpressionRegistry.prototype.add = function (operator, method) {
	    this.expressions[operator] = method
	}

	ExpressionRegistry.prototype.call = function (operator, left, right) {
	    if ( ! this.expressions.hasOwnProperty(operator)) {
	        throw new Error('Unknown operator "'+operator+'"')
	    }

	    return this.expressions[operator](left, right)
	}

	var eR = new ExpressionRegistry
	eR.add('not', function(left, right) {
	    return left != right
	})
	eR.add('===', function(left, right) {
	    return left === right
	})
	eR.add('!==', function(left, right) {
	    return left !== right
	})
	eR.add('in', function(left, right) {
	    if ( ! isArray(right)) {
	        right = right.split(',')
	    }
	    return right.indexOf(left) !== -1
	})

	var helperIs = function() {
	    var args = arguments
	    ,   left = args[0]
	    ,   operator = args[1]
	    ,   right = args[2]
	    ,   options = args[3]
	    

	    if (args.length == 2) {
	        options = args[1]
	        if (left) return options.fn(this)
	        return options.inverse(this)
	    }

	    if (args.length == 3) {
	        right = args[1]
	        options = args[2]
	        if (left == right) return options.fn(this)
	        return options.inverse(this)
	    }

	    if (eR.call(operator, left, right)) {
	        return options.fn(this)
	    }
	    return options.inverse(this)
	}
	module.exports = helperIs

/***/ }
/******/ ])
});
;