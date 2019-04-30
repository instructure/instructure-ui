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

import { View } from '../../View'

export default {
  propValues: {
    title: [
      null,
      'Graham Taylor'
    ],
    description: [
      'Aliquip magna in aliquip aliquip sint culpa ullamco aliquip.',
      'Consectetur qui eiusmod labore eu ad commodo dolor ex consectetur sit id deserunt. Culpa cupidatat nisi pariatur non exercitation amet culpa Lorem sint do et laborum culpa. Eu pariatur eu elit culpa. Nisi minim irure fugiat irure ad deserunt eiusmod ex ipsum culpa proident aliquip aliqua aliquip.'
    ]
  },
  getComponentProps: (props) => {
    return {
      margin: 'x-large auto',
      children: (
        <View
          as="div"
          width="3rem"
          height="3rem"
          borderRadius="large"
          background="inverse"
        />
      )
    }
  }
}
