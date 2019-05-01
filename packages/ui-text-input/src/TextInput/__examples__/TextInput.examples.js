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

import React from 'react'
import { IconSearchLine } from '@instructure/ui-icons'
import { Badge, Tag } from '@instructure/ui-elements'

const renderBeforeInput = () => {
  return (
    <Tag
      text={
        <span>
          <Badge type="notification" variant="primary" standalone margin="0 xx-small xxx-small 0" />
          Dismissible tag
        </span>
      }
      dismissible
      margin="0 xx-small 0 0"
    />
  )

}

export default {
 maxExamplesPerPage: 50,
 propValues: {
   placeholder: [undefined, 'Some placeholder content'],
   value: [undefined, 'A text input value'],
   renderBeforeInput: [undefined, renderBeforeInput],
   renderAfterInput: [undefined, IconSearchLine],
   width: [undefined, '4em'],
   messages: [undefined, [{ type: 'hint', text: 'hint text' }]]
 },
 getComponentProps: (props) => {
   return {
     label: 'A text input',
     readOnly: false,
     required: false,
     type: 'text',
     textAlign: 'start',
     onChange: () => {},
     layout: 'stacked'
   }
 },
 filter: (props) => {
   return (props.layout === 'inline' && props.inline === true && !props.width) ||
    (props.renderBeforeInput && props.width) ||
    (props.renderAfterInput && props.width)
 }
}
