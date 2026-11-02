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

import { useStyleNew } from '@instructure/emotion'
import { IconButton } from '@instructure/ui-buttons/latest'
import { PanelLeftOpenInstUIIcon } from '@instructure/ui-icons'

import type { CollapsedSubNavProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.CollapsedSubNav
---
**/
const CollapsedSubNav = (props: CollapsedSubNavProps) => {
  const { label, onExpand } = props

  const styles = useStyleNew({
    generateStyle,
    componentId: 'SubNav'
  })

  return (
    // the whole strip opens the SubNav, and the button inside gives keyboard and screen reader access
    <div role="presentation" css={styles?.collapsedSubNav} onClick={onExpand}>
      <IconButton
        screenReaderLabel={label}
        // the icon mirrors itself in RTL
        renderIcon={PanelLeftOpenInstUIIcon}
        withBackground={false}
        withBorder={false}
        size="small"
        // the strip grows on hover, so the button itself shows no hover background
        themeOverride={{ secondaryGhostHoverBackground: 'transparent' }}
      />
    </div>
  )
}

export default CollapsedSubNav
export { CollapsedSubNav }
