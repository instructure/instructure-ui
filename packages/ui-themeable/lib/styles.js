'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mount = mount;

var _sheet = require('glamor/lib/sheet');

var _canUseDOM = require('@instructure/ui-utils/lib/dom/canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _transformCss = require('./utils/transformCss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development';

var STYLES = {};
var THEMEABLE_STYLESHEET = void 0;

function mount(id, cssText) {
  if (!STYLES[id]) {
    STYLES[id] = {
      cssText: cssText,
      rules: insert((0, _transformCss.toRules)(cssText))
    };
  }
}

function insert(rules) {
  var sheet = inject();

  var inserted = [];
  rules.forEach(function (rule) {
    if (rule) {
      inserted.push(sheet.insert(rule));
    }
  });
}

function inject() {
  var sheet = _canUseDOM2.default ? window.THEMEABLE_STYLESHEET : THEMEABLE_STYLESHEET;

  if (!sheet) {
    sheet = THEMEABLE_STYLESHEET = createSheet();

    if (_canUseDOM2.default) {
      window.THEMEABLE_STYLESHEET = sheet;
    }
  }

  return sheet;
}

function createSheet() {
  var sheet = new _sheet.StyleSheet({ speedy: !debug, maxLength: 40 });
  sheet.inject();
  return sheet;
}