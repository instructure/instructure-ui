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

import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-heading'
import { Link } from '@instructure/ui-link'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import type { ComponentTheme as ComponentThemeType } from '@instructure/shared-types'
import { ComponentTheme } from '../ComponentTheme'
import { ContentWrap } from '../ContentWrap'
import { Section } from '../Section'

type SharedTokensPageProps = {
  layout: string
  rawTokens: Record<string, any>
}

const SharedTokensPage = ({ layout, rawTokens }: SharedTokensPageProps) => {
  const smallerScreens = layout === 'small' || layout === 'medium'

  const processedData: Record<string, any> = { ...rawTokens }
  if (processedData.boxShadow) {
    const composed: Record<string, string> = {}
    for (const [elevation, shadows] of Object.entries(
      processedData.boxShadow as Record<string, Record<string, any>>
    )) {
      composed[elevation] = boxShadowObjectsToCSSString(shadows)
    }
    processedData.boxShadow = composed
  }

  const v11_7Href = window.location.pathname.match(/v\d+_\d+/)
    ? window.location.pathname.replace(/v\d+_\d+/, 'v11_7')
    : `/v11_7${window.location.pathname}`

  const content = (
    <View
      as="div"
      padding={smallerScreens ? 'x-large none none large' : 'x-large none none'}
    >
      <Heading level="h1" as="h2" margin="0 0 medium 0">
        Shared Tokens
      </Heading>
      <Alert variant="info" margin="0 0 medium">
        Shared tokens are designed for components for <strong>v11.7</strong> and
        later. If you are viewing an older version,{' '}
        <Link href={v11_7Href}>switch to v11.7</Link>
      </Alert>
      <Text as="p">
        Use these tokens when building custom solutions to ensure your
        components respond correctly to theme changes, including dark mode and
        high contrast. To access the current theme and its tokens at runtime,
        use the <code>useComputedTheme</code> hook from{' '}
        <code>@instructure/emotion</code>.
      </Text>
      {Object.entries(processedData).map(([section, data]) => (
        <View key={section} as="div" margin="0 0 large">
          <Heading as="h3" level="h3" margin="0 0 small">
            {section}
          </Heading>
          <ComponentTheme componentTheme={data as ComponentThemeType} />
        </View>
      ))}
    </View>
  )

  return (
    <Section id="shared-tokens">
      <ContentWrap padding="large">{content}</ContentWrap>
    </Section>
  )
}

export { SharedTokensPage }
