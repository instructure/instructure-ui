'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = calculateElementPosition;

var _getBoundingClientRect = require('./getBoundingClientRect');

var _getBoundingClientRect2 = _interopRequireDefault(_getBoundingClientRect);

var _getScrollParents = require('./getScrollParents');

var _getScrollParents2 = _interopRequireDefault(_getScrollParents);

var _getOffsetParents = require('./getOffsetParents');

var _getOffsetParents2 = _interopRequireDefault(_getOffsetParents);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _ownerWindow = require('./ownerWindow');

var _ownerWindow2 = _interopRequireDefault(_ownerWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calculateElementPosition(element, target, options) {
  if (!element || options.placement === 'offscreen') {
    return {
      placement: options.placement,
      style: {
        left: '-9999em',
        overflow: 'hidden',
        position: 'absolute'
      }
    };
  }

  var pos = new PositionData(element, target, options);

  return {
    placement: pos.placement,
    style: pos.style
  };
}

var PositionedElement = function () {
  function PositionedElement(element, placement) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { top: 0, left: 0 };

    _classCallCheck(this, PositionedElement);

    this.node = (0, _findDOMNode2.default)(element);

    if (typeof placement === 'string') {
      this.placement = parsePlacement(placement);
    } else if (Array.isArray(placement)) {
      this.placement = placement;
    } else {
      this.placement = ['bottom', 'center'];
    }

    this.rect = (0, _getBoundingClientRect2.default)(this.node);

    this._offset = offsetToPx(offset, this.size);
  }

  _createClass(PositionedElement, [{
    key: 'calculateOffset',
    value: function calculateOffset(placement) {
      var offsetMap = {
        top: 0,
        start: 0,
        center: '50%',
        bottom: '100%',
        end: '100%',
        stretch: 0
      };

      var _placement = _slicedToArray(placement, 2),
          first = _placement[0],
          second = _placement[1];

      if (['start', 'end'].indexOf(first) >= 0) {
        var _ref = [second, first];
        first = _ref[0];
        second = _ref[1];
      }

      var top = 0;
      var left = 0;

      if (typeof offsetMap[first] !== 'undefined') {
        top = offsetMap[first];
      }

      if (typeof offsetMap[second] !== 'undefined') {
        left = offsetMap[second];
      }

      return addOffsets([offsetToPx({ top: top, left: left }, this.size), parseOffset(this._offset, this.placement)]);
    }
  }, {
    key: 'width',
    get: function get() {
      return this.rect.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.rect.height;
    }
  }, {
    key: 'size',
    get: function get() {
      return {
        width: this.width,
        height: this.height
      };
    }
  }, {
    key: 'position',
    get: function get() {
      return {
        top: this.rect.top,
        left: this.rect.left
      };
    }
  }, {
    key: 'hasVerticalPlacement',
    get: function get() {
      return ['top', 'bottom'].indexOf(this.placement[0]) >= 0;
    }
  }, {
    key: 'hasHorizontalPlacement',
    get: function get() {
      return ['start', 'end'].indexOf(this.placement[0]) >= 0;
    }
  }, {
    key: 'shouldStretchVertically',
    get: function get() {
      return this.placement[1] === 'stretch' && this.hasVerticalPlacement;
    }
  }, {
    key: 'shouldStretchHorizontally',
    get: function get() {
      return this.placement[1] === 'stretch' && this.hasHorizontalPlacement;
    }
  }, {
    key: 'mirroredPlacement',
    get: function get() {
      var _placement2 = _slicedToArray(this.placement, 2),
          first = _placement2[0],
          second = _placement2[1];

      var mirror = {
        center: 'center',
        start: 'end',
        end: 'start',
        top: 'bottom',
        bottom: 'top',
        stretch: 'stretch'
      };
      return [mirror[first], second];
    }
  }, {
    key: 'scrollParentsOffset',
    get: function get() {
      var parents = (0, _getScrollParents2.default)(this.node);

      var offsetY = 0;
      var offsetX = 0;

      for (var i = 1; i < parents.length; i++) {
        var parent = parents[i];
        var child = parents[i - 1];

        offsetY = offsetY + (parent.scrollTop - child.scrollTop);
        offsetX = offsetX + (parent.scrollLeft - child.scrollLeft);
      }

      return { top: offsetY, left: offsetX };
    }
  }, {
    key: 'positionedParentsOffset',
    get: function get() {
      // If the element container is within a positioned
      // element, it will position absolutely with respect to that
      // ancestor. We calculate the offset between the child and
      // positioned parent so we can negate that distance
      var parents = (0, _getOffsetParents2.default)(this.node);

      var offsetY = 0;
      var offsetX = 0;

      for (var i = 1; i < parents.length; i++) {
        var parent = (0, _getBoundingClientRect2.default)(parents[i]);
        var child = (0, _getBoundingClientRect2.default)(parents[i - 1]);

        offsetY = offsetY + (child.top - parent.top);
        offsetX = offsetX + (child.left - parent.left);
      }

      return { top: offsetY, left: offsetX };
    }
  }]);

  return PositionedElement;
}();

var PositionData = function () {
  function PositionData(element, target, options) {
    _classCallCheck(this, PositionData);

    this.options = options || {};

    var _options = this.options,
        container = _options.container,
        constrain = _options.constrain,
        placement = _options.placement,
        over = _options.over;


    if (!element || placement === 'offscreen') return;

    this.container = container || (0, _ownerDocument2.default)(element).body;

    this.element = new PositionedElement(element, placement, { top: this.options.offsetY, left: this.options.offsetX });

    this.target = new PositionedElement(target || this.container, over ? this.element.placement : this.element.mirroredPlacement);

    if (constrain === 'window') {
      this.constrainTo((0, _ownerWindow2.default)(element));
    } else if (constrain === 'scroll-parent') {
      this.constrainTo((0, _getScrollParents2.default)(this.target.node)[0]);
    } else if (constrain === 'parent') {
      this.constrainTo(this.container);
    }
  }

  _createClass(PositionData, [{
    key: 'constrainTo',
    value: function constrainTo(element) {
      if (!element) return;

      var _addOffsets = addOffsets([this.target.position, this.offset]),
          top = _addOffsets.top,
          left = _addOffsets.left;

      var bounds = (0, _getBoundingClientRect2.default)(element);
      var right = left + this.element.positionedParentsOffset.left + this.element.width;

      var oob = {
        top: top < bounds.top,
        bottom: top + this.element.height > bounds.bottom,
        left: left < bounds.left,
        right: right > bounds.right
      };

      if (this.element.hasVerticalPlacement) {
        if (oob.left && oob.right) {
          this.element.placement[1] = 'center';
          this.target.placement[1] = 'center';
        } else if (oob.left) {
          this.element.placement[1] = 'start';
          this.target.placement[1] = 'start';
        } else if (oob.right) {
          this.element.placement[1] = 'end';
          this.target.placement[1] = 'end';
        }

        if (oob.top) {
          this.element.placement[0] = 'bottom';
          this.target.placement[0] = 'top';
        } else if (oob.bottom) {
          this.element.placement[0] = 'top';
          this.target.placement[0] = 'bottom';
        }
      } else if (this.element.hasHorizontalPlacement) {
        if (oob.top && oob.bottom) {
          this.element.placement[1] = 'center';
          this.target.placement[1] = 'center';
        } else if (oob.top) {
          this.element.placement[1] = 'top';
          this.target.placement[1] = 'top';
        } else if (oob.bottom) {
          this.element.placement[1] = 'bottom';
          this.target.placement[1] = 'bottom';
        }

        if (oob.left) {
          this.element.placement[0] = 'end';
          this.target.placement[0] = 'start';
        } else if (oob.right) {
          this.element.placement[0] = 'start';
          this.target.placement[0] = 'end';
        }
      }
    }
  }, {
    key: 'offset',
    get: function get() {
      var _target$calculateOffs = this.target.calculateOffset(this.element.placement),
          top = _target$calculateOffs.top,
          left = _target$calculateOffs.left;

      var offset = addOffsets([this.element.calculateOffset(this.target.placement), this.element.scrollParentsOffset, this.element.positionedParentsOffset]);

      return {
        top: top - offset.top,
        left: left - offset.left
      };
    }
  }, {
    key: 'placement',
    get: function get() {
      return formatPlacement(this.element.placement);
    }
  }, {
    key: 'minWidth',
    get: function get() {
      return this.element.shouldStretchVertically ? this.target.width : null;
    }
  }, {
    key: 'minHeight',
    get: function get() {
      return this.element.shouldStretchHorizontally ? this.target.height : null;
    }
  }, {
    key: 'position',
    get: function get() {
      var win = (0, _ownerWindow2.default)(this.target.node);

      var _addOffsets2 = addOffsets([this.target.position, this.offset]),
          left = _addOffsets2.left,
          top = _addOffsets2.top;

      if (_canUseDOM2.default && win.matchMedia) {
        var retina = win.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || win.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
        if (!retina) {
          left = Math.round(left);
          top = Math.round(top);
        }
      }

      return { left: left, top: top };
    }
  }, {
    key: 'style',
    get: function get() {
      return {
        top: 0,
        left: 0,
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        position: 'absolute',
        transform: 'translateX(' + this.position.left + 'px) translateY(' + this.position.top + 'px) translateZ(0)'
      };
    }
  }]);

  return PositionData;
}();

function addOffsets(offsets) {
  return offsets.reduce(function (sum, offset) {
    return {
      top: sum.top + offset.top,
      left: sum.left + offset.left
    };
  }, { top: 0, left: 0 });
}

function parseOffset(offset, placement) {
  var top = offset.top,
      left = offset.left;


  if (placement[0] === 'bottom') {
    top = 0 - parseFloat(top, 10);
  }

  if (placement[0] === 'end') {
    left = 0 - parseFloat(left, 10);
  }

  return {
    top: top,
    left: left
  };
}

function offsetToPx(offset, size) {
  var left = offset.left,
      top = offset.top;


  if (typeof left === 'string' && left.indexOf('%') !== -1) {
    left = parseFloat(left, 10) / 100 * size.width; // eslint-disable-line no-mixed-operators
  } else {
    left = parseFloat(left, 10);
  }

  if (typeof top === 'string' && top.indexOf('%') !== -1) {
    top = parseFloat(top, 10) / 100 * size.height; // eslint-disable-line no-mixed-operators
  } else {
    top = parseFloat(top, 10);
  }

  return { top: top, left: left };
}

function sortPlacement(placement) {
  var _placement3 = _slicedToArray(placement, 2),
      first = _placement3[0],
      second = _placement3[1];

  if (first === 'center' || first === 'stretch') {
    var _ref2 = [second, first];
    first = _ref2[0];
    second = _ref2[1];
  }
  return [first, second];
}

function parsePlacement(placement) {
  var parsed = placement.split(' ');

  if (parsed.length === 1) {
    parsed = [placement, 'center'];
  }

  return sortPlacement(parsed);
}

function formatPlacement(placement) {
  return placement.join(' ');
}