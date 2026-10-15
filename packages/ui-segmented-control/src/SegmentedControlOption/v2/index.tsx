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

import { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'

import { logError as error } from '@instructure/console'
import { useStyleNew } from '@instructure/emotion'
import { BaseButton } from '@instructure/ui-buttons/latest'
import {
  callRenderProp,
  omitProps,
  passthroughProps
} from '@instructure/ui-react-utils'

import { SegmentedControlContext } from '../../SegmentedControl/v2/SegmentedControlContext.js'
import generateStyle from './styles.js'
import type { SegmentedControlOptionProps } from './props'
import { allowedProps } from './props.js'

const buttonSizes = { sm: 'small', md: 'medium', lg: 'large' } as const

/**
---
parent: SegmentedControl
id: SegmentedControl.Option
---
**/
const SegmentedControlOption = forwardRef<
  HTMLButtonElement,
  SegmentedControlOptionProps
>((props, ref) => {
  const {
    value,
    renderLabel,
    renderIcon,
    screenReaderLabel,
    isDisabled: isOptionDisabled = false,
    themeOverride
  } = props

  const {
    size,
    isDisabled: isGroupDisabled,
    selectedValue,
    tabbableValue,
    onSelect,
    onKeyDown
  } = useContext(SegmentedControlContext)

  const isSelected = selectedValue === value
  const isDisabled = isOptionDisabled || isGroupDisabled
  const hasLabel = renderLabel != null

  error(
    hasLabel || !!screenReaderLabel,
    '[SegmentedControl.Option] An option without `renderLabel` needs a `screenReaderLabel` so screen readers can name it.'
  )

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { size, isSelected, isDisabled },
    componentId: 'SegmentedControl',
    displayName: 'SegmentedControlOption'
  })

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement)

  return (
    <BaseButton
      {...passthroughProps(omitProps(props, allowedProps))}
      role="radio"
      aria-checked={isSelected}
      aria-label={screenReaderLabel}
      size={buttonSizes[size]}
      color="secondary"
      withBackground={isSelected}
      withBorder={false}
      interaction={isDisabled ? 'disabled' : 'enabled'}
      tabIndex={value === tabbableValue ? 0 : -1}
      renderIcon={renderIcon}
      onClick={(event) => onSelect(event as unknown as SyntheticEvent, value)}
      onKeyDown={(event) =>
        onKeyDown(event as unknown as KeyboardEvent<Element>)
      }
      elementRef={(element) => {
        buttonRef.current = element as HTMLButtonElement | null
      }}
      themeOverride={styles?.buttonTheme}
      data-cid="SegmentedControlOption"
    >
      {hasLabel ? callRenderProp(renderLabel) : null}
    </BaseButton>
  )
})

SegmentedControlOption.displayName = 'SegmentedControlOption'

export default SegmentedControlOption
export { SegmentedControlOption }
