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

import { Component } from 'react'
import type { IControlledCodeMirror } from './index'

// This is an empty class which does not have any dependency on 'codemirror',
// which in turn enables us to server side render the `CodeEditor` component (altough it will only
// render content on the client side)
class Controlled extends Component<IControlledCodeMirror, any> {
  /** @internal */
  constructor(props: IControlledCodeMirror) {
    super(props)
  }

  /** @internal */
  hydrate() {}

  /** @internal */
  initChange() {}

  /** @internal */
  resolveChange() {}

  /** @internal */
  mirrorChange() {}

  /** @internal */
  public componentDidMount() {}

  /** @internal */
  public componentDidUpdate() {}

  /** @internal */
  public componentWillUnmount() {}

  /** @internal */
  public shouldComponentUpdate() {
    return false
  }

  /** @internal */
  public render() {
    return null
  }
}

export default Controlled
