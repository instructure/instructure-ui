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

import { useState } from 'react'

import { useStyleNew } from '@instructure/emotion'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  ChevronDownInstUIIcon,
  ChevronRightInstUIIcon
} from '@instructure/ui-icons'
import { Text } from '@instructure/ui-text/latest'

import { getNamedStepIndex } from '../getNamedStepIndex.js'
import type { MobileStepsProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: Stepper.MobileSteps
---
**/
const MobileSteps = ({
  label,
  headingId,
  headingLevel,
  listId,
  steps,
  stepCountLabel,
  toggleLabel,
  themeOverride,
  children
}: MobileStepsProps) => {
  const [expanded, setExpanded] = useState(false)

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { expanded },
    componentId: 'Stepper'
  })

  const namedIndex = getNamedStepIndex(steps)
  const named = steps[namedIndex]
  // the chevron right mirrors itself in RTL
  const Chevron = expanded ? ChevronDownInstUIIcon : ChevronRightInstUIIcon

  return (
    <>
      <div css={styles?.bar}>
        {/* TODO: the texts use the Text tokens until design adds Stepper ones (the title also needs the
        heading font family) */}
        {/* the bar shows the heading even when showLabel is false, as the designs do */}
        <Text
          as={headingLevel}
          id={headingId}
          margin="0"
          size="x-small"
          weight="normal"
          lineHeight="default"
        >
          {label}
        </Text>
        {named && (
          <Text
            as="p"
            margin="0"
            size="medium"
            weight="bold"
            lineHeight="condensed"
          >
            {named.title}
          </Text>
        )}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded(!expanded)}
          css={styles?.toggle}
        >
          <Chevron size="md" color="baseColor" />
          {named && (
            // muted text is too light on the expanded bar background
            <Text size="small" weight="normal" lineHeight="default">
              {stepCountLabel(namedIndex + 1, steps.length)}
            </Text>
          )}
          <ScreenReaderContent>{toggleLabel}</ScreenReaderContent>
        </button>
      </div>
      {/* hidden, not just visually hidden, so screen readers skip the collapsed list */}
      <ol id={listId} hidden={!expanded} css={styles?.list}>
        {children}
      </ol>
    </>
  )
}

export default MobileSteps
export { MobileSteps }
