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

const gulp = require('gulp')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')

const handleErrors = require('../../util/handle-errors')
const config = require('../../config')

gulp.task('optimize-svgs', () => {
  return (
    gulp
      .src(config.svg.source)
      .pipe(
        svgmin({
          js2svg: { pretty: true },
          plugins: [
            'mergePaths',
            'removeDimensions',
            'removeDesc',
            'removeTitle',
            'removeRasterImages',
            'convertStyleToAttrs',
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'cleanupNumericValues',
              active: false
            },
            {
              name: 'removeUnknownsAndDefaults',
              active: false
            },
            {
              name: 'removeUselessStrokeAndFill',
              active: false
            },
            {
              name: 'convertPathData',
              active: false
            },
            {
              // Custom plugin for wrapping multiple path svg-s into a `<g>` tag.
              // This is needed because all svg files are supposed to have
              // a single child element for it to display correctly.
              name: 'wrapMultiplePathsInGroup',
              type: 'perItem',
              fn: (node) => {
                if (
                  node.type === 'element' &&
                  node.name === 'svg' &&
                  node.children.length > 1
                ) {
                  const group = new node.constructor(
                    {
                      type: 'element',
                      name: 'g',
                      attributes: {
                        'fill-rule': 'evenodd',
                        'clip-rule': 'evenodd',
                        stroke: 'none',
                        'stroke-width': '1'
                      },
                      children: node.children
                    },
                    node
                  )

                  // eslint-disable-next-line no-param-reassign
                  node.children = [group]
                }
              }
            }
          ]
        })
      )
      // clean up fills
      .pipe(
        cheerio({
          run: ($) => {
            $('[fill]').removeAttr('fill')
          },
          parserOptions: {
            xmlMode: true
          }
        })
      )
      .on('error', handleErrors)
      .pipe(gulp.dest(config.svg.destination))
  )
})
