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

import type { SyntheticEvent } from 'react'

import { useStyleNew } from '@instructure/emotion'
import { IconButton } from '@instructure/ui-buttons/latest'
import {
  ChevronsLeftInstUIIcon,
  ChevronsRightInstUIIcon
} from '@instructure/ui-icons'
import { Tooltip } from '@instructure/ui-tooltip/latest'

import type { CollapseButtonProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.CollapseButton
---
**/
const CollapseButton = (props: CollapseButtonProps) => {
  const { collapsed, collapseLabel, expandLabel, onCollapse } = props

  const styles = useStyleNew({
    generateStyle,
    componentId: 'CollapseButton',
    useTokensFrom: 'MainNavItem'
  })

  const label = collapsed ? expandLabel : collapseLabel

  return (
    // TODO INSTUI-5242: an open tooltip flashes at its old spot on toggle, until Position updates before paint
    <Tooltip renderTip={label}>
      <IconButton
        screenReaderLabel={label}
        // the icons mirror themselves in RTL
        renderIcon={
          collapsed ? ChevronsRightInstUIIcon : ChevronsLeftInstUIIcon
        }
        withBackground={false}
        withBorder={false}
        size="small"
        // IconButton types the event target as ViewProps, at runtime it is the DOM button
        onClick={(event) =>
          onCollapse(event as unknown as SyntheticEvent, !collapsed)
        }
        themeOverride={styles?.iconButtonThemeOverride}
      />
    </Tooltip>
  )
}

export default CollapseButton
export { CollapseButton }
