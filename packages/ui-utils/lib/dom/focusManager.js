'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _findTabbable = require('./findTabbable');

var _findTabbable2 = _interopRequireDefault(_findTabbable);

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _ownerWindow = require('./ownerWindow');

var _ownerWindow2 = _interopRequireDefault(_ownerWindow);

var _getActiveElement = require('./getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

var _addEventListener = require('./addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _containsActiveElement = require('./containsActiveElement');

var _containsActiveElement2 = _interopRequireDefault(_containsActiveElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FocusManager = function () {
  function FocusManager() {
    var _this = this;

    _classCallCheck(this, FocusManager);

    this.contextElement = null;
    this.focusLaterElement = null;
    this.needToFocus = false;
    this.listeners = [];
    this.timeouts = [];

    this.handleBlur = function (event) {
      _this.needToFocus = true;
    };

    this.handleFocus = function (event) {
      if (_this.needToFocus) {
        _this.needToFocus = false;

        if (!_this.contextElement) {
          return;
        }

        // need to see how jQuery shims document.on('focusin') so we don't need the
        // setTimeout, firefox doesn't support focusin, if it did, we could focus
        // the element outside of a setTimeout. Side-effect of this implementation
        // is that the document.body gets focus, and then we focus our element right
        // after, seems fine.
        _this.timeouts.push(setTimeout(function () {
          if ((0, _containsActiveElement2.default)(_this.contextElement)) {
            return;
          }

          var el = (0, _findTabbable2.default)(_this.contextElement)[0];

          el.focus();
        }, 0));
      }
    };
  }

  _createClass(FocusManager, [{
    key: 'markForFocusLater',
    value: function markForFocusLater() {
      this.focusLaterElement = (0, _getActiveElement2.default)((0, _ownerDocument2.default)(this.contextElement));
    }
  }, {
    key: 'returnFocus',
    value: function returnFocus() {
      try {
        this.focusLaterElement.focus();
      } catch (e) {
        // eslint-disable-next-line
        console.warn('\n        You tried to return focus to ' + this.focusLaterElement + '\n        but it is not in the DOM anymore: ' + e + '\n        ');
      }
      this.focusLaterElement = null;
    }
  }, {
    key: 'setupScopedFocus',
    value: function setupScopedFocus(el) {
      if (this.contextElement) {
        // eslint-disable-next-line
        console.warn('\n        Focus is already scoped to ' + this.contextElement + '.\n        ');
        return;
      }
      this.contextElement = (0, _findDOMNode2.default)(el);

      this.listeners.push((0, _addEventListener2.default)((0, _ownerWindow2.default)(this.contextElement), 'blur', this.handleBlur, false));
      this.listeners.push((0, _addEventListener2.default)((0, _ownerDocument2.default)(this.contextElement), 'focus', this.handleFocus, true));
    }
  }, {
    key: 'teardownScopedFocus',
    value: function teardownScopedFocus() {
      this.listeners.forEach(function (listener) {
        listener.remove();
      });
      this.listeners = [];

      this.timeouts.forEach(function (timeout) {
        clearTimeout(timeout);
      });
      this.timeouts = [];
      this.contextElement = null;
    }
  }]);

  return FocusManager;
}();

exports.default = new FocusManager();