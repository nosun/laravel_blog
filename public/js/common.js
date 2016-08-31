(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mavigator = function () {
    function Mavigator() {
        var selector = arguments.length <= 0 || arguments[0] === undefined ? 'html' : arguments[0];
        var options = arguments[1];

        _classCallCheck(this, Mavigator);

        this.selector = selector;
        this.options = this.mergeOptions(Mavigator.defaults(), options);
    }

    _createClass(Mavigator, [{
        key: 'mergeOptions',
        value: function mergeOptions(source, override) {
            for (var key in override) {
                if (source.hasOwnProperty(key)) {
                    source[key] = override[key];
                }
            }

            return source;
        }
    }, {
        key: 'init',
        value: function init() {
            var nodes = this.getNodesToMark();

            if (!nodes || !nodes.length) {
                if (this.options.warn) {
                    console.warn('No link to mark was found for the given URI [' + this.options.uri + ']');
                }
                return;
            }

            for (var i = 0; i < nodes.length; i++) {
                var realNode = this.options.classToParent ? nodes[i].parentNode : nodes[i];

                this.addClassTo(realNode);
            }
        }
    }, {
        key: 'getNodesToMark',
        value: function getNodesToMark() {
            var nodes = [];
            var sets = this.sets();

            if (!sets.length) return;

            for (var i = 0; i < sets.length; i++) {
                nodes = nodes.concat(this.getMarkableNodesFrom(sets[i]));
            }

            return nodes;
        }
    }, {
        key: 'sets',
        value: function sets() {
            this.validateSelector();

            return document.querySelectorAll(this.selector);
        }
    }, {
        key: 'validateSelector',
        value: function validateSelector() {
            if (!this.selector.length) {
                throw new TypeError('The provided selector is empty.');
            }

            if (_typeof(this.selector) === 'object') {
                throw new TypeError('A selector must be a string.');
            }
        }
    }, {
        key: 'getMarkableNodesFrom',
        value: function getMarkableNodesFrom(set) {
            var _this = this;

            var selector = 'a';
            var links = set.querySelectorAll(selector);
            links = [].slice.call(links);

            return links.filter(function (link) {
                return link.pathname === _this.options.uri;
            });
        }
    }, {
        key: 'addClassTo',
        value: function addClassTo(node) {
            if (node.classList) {
                node.classList.add(this.options.className);
            } else {
                node.className += ' ' + className;
            }
        }
    }], [{
        key: 'mark',
        value: function mark(selector, options) {
            new Mavigator(selector, options).init();
        }
    }, {
        key: 'defaults',
        value: function defaults() {
            return {
                className: 'active',
                classToParent: false,
                uri: window.location.pathname,
                warn: false
            };
        }
    }]);

    return Mavigator;
}();

exports.default = Mavigator;
},{}],2:[function(require,module,exports){
'use strict';

var _mavigator = require('mavigator');

var _mavigator2 = _interopRequireDefault(_mavigator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mavigator2.default.mark('body', { warn: true });

},{"mavigator":1}]},{},[2]);

//# sourceMappingURL=common.js.map
