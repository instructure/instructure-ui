/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 // Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
 /* eslint-disable */
function murmurhash (c) {
   for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4; ) {
     (b =
       (c.charCodeAt(d) & 255) |
       ((c.charCodeAt(++d) & 255) << 8) |
       ((c.charCodeAt(++d) & 255) << 16) |
       ((c.charCodeAt(++d) & 255) << 24)),
       (b = 1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
       (b ^= b >>> 24),
       (b = 1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
       (a = (1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16)) ^ b),
       (e -= 4),
       ++d
   }
   switch (e) {
     case 3:
       a ^= (c.charCodeAt(d + 2) & 255) << 16
     case 2:
       a ^= (c.charCodeAt(d + 1) & 255) << 8
     case 1:
       (a ^= c.charCodeAt(d) & 255),
         (a = 1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16))
   }
   a ^= a >>> 13
   a = 1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16)
   return (a ^ (a >>> 15)) >>> 0
 }
 /* eslint-enable */

const charsLength = 52
const getAlphabeticChar = (code) => String.fromCharCode(code + (code > 25 ? 39 : 97))

/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName (code) {
   let name = ''
   let x

   /* get a char and divide by alphabet-length */
   for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
     name = getAlphabeticChar(x % charsLength) + name
   }

   return getAlphabeticChar(x % charsLength) + name
 }

module.exports = function generateComponentId (strToHash) {
  return generateAlphabeticName(murmurhash(strToHash))
}
