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
import { Modal } from '@instructure/ui-modal'
import { Button, CloseButton } from '@instructure/ui-buttons'
import { Heading } from '@instructure/ui-heading'
import { Text } from '@instructure/ui-text'
import { Link } from '@instructure/ui-link'
import { useStyleRework } from '@instructure/emotion'

import { DataPermissionLevelsProps } from './props'
import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components/AI Components
---
**/
const DataPermissionLevels = ({
  modalLabel,
  title,
  data,
  closeButtonText,
  closeIconButtonScreenReaderLabel,
  currentFeature,
  currentFeatureText,
  triggerText,
  fullscreen = false
}: DataPermissionLevelsProps) => {
  const [open, setOpen] = useState(false)

  const styles = useStyleRework({
    generateStyle,
    generateComponentTheme,
    componentId: 'DataPermissionLevels',
    displayName: 'DataPermissionLevels'
  })

  return (
    <div>
      <Link
        variant="standalone"
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        forceButtonRole={false}
        href="#"
      >
        {triggerText}
      </Link>
      <Modal
        size={fullscreen ? 'fullscreen' : 'medium'}
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        label={modalLabel}
        shouldCloseOnDocumentClick
      >
        <Modal.Header spacing="compact">
          <Heading aiVariant="stacked">{title}</Heading>
          <CloseButton
            size="medium"
            placement="end"
            offset="small"
            onClick={() => setOpen(false)}
            screenReaderLabel={closeIconButtonScreenReaderLabel}
          />
        </Modal.Header>
        <Modal.Body>
          <div css={styles?.body}>
            {data.map(({ level, title, description, highlighted }, index) => (
              <div
                key={index}
                css={highlighted ? styles?.highlightedCard : styles?.card}
              >
                {highlighted ? (
                  <div css={styles?.currentFeature}>
                    <Heading
                      color="primary-inverse"
                      level="reset"
                      variant="labelInline"
                    >
                      {currentFeatureText}{' '}
                    </Heading>
                    <Text color="primary-inverse" variant="content">
                      {currentFeature}
                    </Text>
                  </div>
                ) : null}

                <div css={styles?.contentContainer}>
                  <div css={styles?.level}>{level}</div>
                  <div css={styles?.permissionTitle}>
                    <Text variant="descriptionPage">{title} </Text>
                  </div>
                  <Text variant="content" color="secondary">
                    {description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>{closeButtonText}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DataPermissionLevels
export { DataPermissionLevels }
