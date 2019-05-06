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
 import { IconUserLine } from '@instructure/ui-icons'
 import { Select } from '../../Select'

 export default {
   sectionProp: 'size',
   maxExamplesPerPage: 50,
   propValues: {
     children: [[
       <Select.Option id="0" key="0" isSelected>Option one</Select.Option>,
       <Select.Option id="1" key="1">Option two</Select.Option>,
       <Select.Option id="2" key="2" isHighlighted>Option three</Select.Option>,
       <Select.Option id="3" key="3" isDisabled>Option four</Select.Option>
     ], [
       <Select.Option id="0" key="4" renderBeforeLabel={IconUserLine} isSelected>Option one</Select.Option>,
       <Select.Option id="1" key="5" renderBeforeLabel={IconUserLine}>Option two</Select.Option>,
       <Select.Option id="2" key="6" renderBeforeLabel={IconUserLine} isHighlighted>Option three</Select.Option>,
       <Select.Option id="3" key="7" renderBeforeLabel={IconUserLine} isDisabled>Option four</Select.Option>
     ], [
         <Select.Option id="0" key="0">
           Item not in a group
         </Select.Option>,
         <Select.Group id="1" renderLabel="Group one" key="1">
           <Select.Option id="2" key="2">Grouped item one</Select.Option>
         </Select.Group>,
         <Select.Group id="3" renderLabel="Group two" key="3">
           <Select.Option id="4" key="4">Grouped item two</Select.Option>
         </Select.Group>,
         <Select.Option id="5" key="5">
           Item not in a group two
         </Select.Option>
       ]
     ],
     renderBeforeInput: [null, <IconUserLine key="0" inline={false} />]
   },
   getComponentProps: (props) => {
     return {
       inputValue: !props.isEditable ? 'Option one' : '',
       renderLabel: 'Choose an option',
       constrain: 'scroll-parent'
     }
   },
   getExampleProps: (props) => {
     return props.isShowingOptions ? {
       dir: props.dir,
       as: 'div',
       height: '22rem',
     } : {}
   },
   filter: (props) => {
     if (props.interaction === 'readonly') return true
     if (props.isRequired) return true
     if (props.isShowingOptions && props.interaction === 'disabled') return true
     if (!props.isShowingOptions && props.placement) return true

     return false
   }
 }
