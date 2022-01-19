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
import React, { ComponentClass, forwardRef, useContext } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { SSRContext } from './SSRContext'
import { decorator } from '@instructure/ui-decorator'

const withSSR = decorator((ComposedComponent: ComponentClass) => {
  const WithSSR = forwardRef((props: any, ref: any) => {
    const instanceMapCounter = useContext(SSRContext)

    return (
      <ComposedComponent
        ref={ref}
        instanceMapCounter={instanceMapCounter}
        {...props}
      />
    )
  })

  hoistNonReactStatics(WithSSR, ComposedComponent)

  // we have to pass these on, because sometimes users
  // access propTypes of the component in other components
  // eslint-disable-next-line react/forbid-foreign-prop-types
  WithSSR.propTypes = ComposedComponent.propTypes
  WithSSR.defaultProps = ComposedComponent.defaultProps

  // These static fields exist on InstUI components
  //@ts-expect-error fix this
  WithSSR.allowedProps = ComposedComponent.allowedProps

  if (process.env.NODE_ENV !== 'production') {
    WithSSR.displayName = `WithSSR(${ComposedComponent.displayName})`
  }

  return WithSSR
})

export { withSSR }
