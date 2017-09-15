'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.now = now;
exports.parse = parse;
exports.browserTimeZone = browserTimeZone;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-timezone/builds/moment-timezone-with-data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkParams(locale, timezone) {
  if (locale == null) throw Error('locale must be specified');
  if (timezone == null) throw Error('timezone must be specified');
} // eslint-disable-line import/no-extraneous-dependencies
function now(locale, timezone) {
  checkParams(locale, timezone);
  return (0, _moment2.default)().locale(locale).tz(timezone);
}

function parse(dateString, locale, timezone) {
  checkParams(locale, timezone);
  return _moment2.default.tz(dateString, [_moment2.default.ISO_8601, 'l', 'L', 'll', 'LL'], locale, timezone);
}

function browserTimeZone() {
  return _moment2.default.tz.guess();
}

exports.default = {
  now: now,
  parse: parse,
  browserTimeZone: browserTimeZone
};