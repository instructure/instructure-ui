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
import { Text } from '@instructure/ui-text/latest'
import { safeLinkProps } from '@instructure/ui-utils'

import type { InstitutionLogoProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.InstitutionLogo
---
**/
const InstitutionLogo = (props: InstitutionLogoProps) => {
  const { logo, collapsed } = props
  const isLink = !!logo.href
  const { showName: showNameProp = true } = logo
  const showName = !collapsed && showNameProp

  const styles = useStyleNew({
    generateStyle,
    params: { collapsed, isLink, wordmark: !showNameProp },
    componentId: 'MainNavInstitutionLogo'
  })

  if (!logo.src && !showName) {
    return null
  }

  const content = (
    <>
      {logo.src && (
        <img
          css={styles?.mark}
          src={logo.src}
          // the visible name labels the logo when it shows
          alt={showName ? '' : logo.name}
        />
      )}
      {showName && (
        <Text color="inherit" weight="bold">
          {logo.name}
        </Text>
      )}
    </>
  )

  if (isLink) {
    // drops unsafe hrefs, for example javascript: URLs that would run code on click
    const { href } = safeLinkProps({ href: logo.href, tag: 'a', attr: 'href' })
    return (
      <a css={styles?.logo} href={href}>
        {content}
      </a>
    )
  }

  return <div css={styles?.logo}>{content}</div>
}

export default InstitutionLogo
export { InstitutionLogo }
