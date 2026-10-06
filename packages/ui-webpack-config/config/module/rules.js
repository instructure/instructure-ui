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
const exclude = [/node_modules/, /\/lib\//, /\/es\//]

const swcLoader = (tsx) => ({
  loader: 'swc-loader',
  options: {
    swcrc: false,
    env: {
      targets: [
        'last 2 chrome versions',
        'last 2 firefox versions',
        'last 2 edge versions',
        'last 2 ios versions',
        'last 2 opera versions',
        'last 2 safari versions',
        'last 2 ChromeAndroid versions'
      ]
    },
    jsc: {
      parser: { syntax: 'typescript', tsx, decorators: true },
      transform: {
        legacyDecorator: true,
        useDefineForClassFields: false,
        react: { runtime: 'automatic', importSource: '@emotion/react' }
      }
    }
  }
})

const rules = [
  // `.ts` files are parsed without JSX so `<T>value` type assertions work.
  {
    test: /\.ts$/,
    exclude,
    use: [swcLoader(false)]
  },
  {
    test: /\.(js|mjs|jsx|tsx)$/,
    exclude,
    use: [swcLoader(true)]
  },
  {
    test: /\.css$/,
    include: [/ui-icons/],
    use: ['style-loader', 'css-loader']
  },
  {
    // eslint-disable-next-line no-useless-escape
    test: /\.(eot|woff2?|otf|ttf)([\?]?.*)$/,
    type: 'asset/resource'
  },
  {
    test: /\.svg$/,
    type: 'asset/source'
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    type: 'asset/resource'
  }
]

export default rules
