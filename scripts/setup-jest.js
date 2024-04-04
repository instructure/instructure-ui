// via https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
// eslint-disable-next-line no-undef, notice/notice
HTMLCanvasElement.prototype.getContext = jest.fn()
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder
