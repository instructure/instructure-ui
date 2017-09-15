'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Component, props, getDefault) {
  if (props.as && props.as !== Component.defaultProps.as) {
    return props.as;
  }

  if (typeof getDefault === 'function') {
    return getDefault();
  }

  if (props.href) {
    return 'a';
  }

  if (typeof props.onClick === 'function') {
    return 'button';
  }

  return Component.defaultProps.as || 'span';
};