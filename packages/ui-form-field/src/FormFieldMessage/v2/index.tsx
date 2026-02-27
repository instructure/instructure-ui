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

import { forwardRef } from 'react'

import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import {
  AlertCircleInstUIIcon,
  CheckCircle2InstUIIcon
} from '@instructure/ui-icons'

import { useStyle } from '@instructure/emotion'
import generateStyle from './styles'

import type { FormFieldMessageProps } from './props'

/**
---
parent: FormField
---

This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

```js
---
type: example
---
<FormFieldMessage variant="error">Invalid value</FormFieldMessage>
```
**/
const FormFieldMessage = forwardRef<HTMLSpanElement, FormFieldMessageProps>(
  ({ variant = 'hint', children, themeOverride }, ref) => {
    const styles = useStyle({
      generateStyle,
      themeOverride,
      params: {
        variant
      },
      componentId: 'FormFieldMessage',
      displayName: 'FormFieldMessage'
    })

    const handleRef = (el: Element | null) => {
      if (typeof ref === 'function') {
        ref(el as HTMLSpanElement)
      } else if (ref) {
        const refObject = ref
        refObject.current = el as HTMLSpanElement
      }
    }

    const isErrorVariant = variant === 'error' || variant === 'newError'
    const shouldShowIcon = (isErrorVariant || variant === 'success') && children

    return variant !== 'screenreader-only' ? (
      <span css={{ display: 'flex' }}>
        {shouldShowIcon && (
          <span css={styles?.icon}>
            {isErrorVariant ? (
              <AlertCircleInstUIIcon size="sm" color="errorColor" />
            ) : (
              <CheckCircle2InstUIIcon size="sm" color="successColor" />
            )}
          </span>
        )}
        <span css={styles?.formFieldMessage} ref={handleRef}>
          {children}
        </span>
      </span>
    ) : (
      <ScreenReaderContent elementRef={handleRef}>
        {children}
      </ScreenReaderContent>
    )
  }
)

FormFieldMessage.displayName = 'FormFieldMessage'

export default FormFieldMessage
export { FormFieldMessage }
