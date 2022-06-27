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
import { ColorIndicator, View } from '@instructure/ui'
import React from 'react'

const COLOR_INDICATOR_IUI = () => {
  return (
    <div style={{ display: 'flex', background: 'white' }}>
      <View margin="small">
        <ColorIndicator color="" />
      </View>
      <View margin="small">
        <ColorIndicator color="#ff0000" />
      </View>
      <View margin="small">
        <ColorIndicator color="#ff000088" />
      </View>
      <View margin="small">
        <ColorIndicator color="#ff000000" />
      </View>
      <View margin="small">
        <ColorIndicator color="yellow" />
      </View>
      <View margin="small">
        <ColorIndicator color="rgb(155,55,82)" />
      </View>
      <View margin="small">
        <ColorIndicator color="rgba(155,55,82,.5)" />
      </View>
      <View margin="small">
        <ColorIndicator color="hsl(30, 100%, 50%)" />
      </View>
      <View margin="small">
        <ColorIndicator color="hsla(30, 100%, 50%, .3)" />
      </View>
      <View margin="small">
        <ColorIndicator color="hwb(1.5708rad 60% 0%)" />
      </View>
    </div>
  )
}

export default COLOR_INDICATOR_IUI
