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
import { Modal } from '@instructure/ui-modal/latest'
import { Button, CloseButton } from '@instructure/ui-buttons/latest'
import { Heading } from '@instructure/ui-heading/latest'
import { Text } from '@instructure/ui-text/latest'
import { Link } from '@instructure/ui-link/latest'
import { useStyleLegacy as useStyle } from '@instructure/emotion'

import { NutritionFactsProps } from './props'
import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components/AI Components
---
**/
const NutritionFacts = ({
  modalLabel,
  title,
  featureName,
  data,
  closeButtonText,
  closeIconButtonScreenReaderLabel,
  triggerText,
  fullscreen = false
}: NutritionFactsProps) => {
  const [open, setOpen] = useState(false)

  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    componentId: 'NutritionFacts',
    displayName: 'NutritionFacts'
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
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        label={modalLabel}
        shouldCloseOnDocumentClick
        size={fullscreen ? 'fullscreen' : 'medium'}
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
            <Heading variant="titleSection" level="h3">
              {' '}
              {featureName}{' '}
            </Heading>
            {data.map(({ blockTitle, segmentData }, index) => {
              return (
                <div key={index} css={styles?.blockContainer}>
                  <Heading variant="titleModule" level="h4">
                    {' '}
                    {blockTitle}{' '}
                  </Heading>
                  <div css={styles?.segmentContainer}>
                    {segmentData.map(
                      (
                        { segmentTitle, description, value, valueDescription },
                        index
                      ) => {
                        return (
                          <div key={index} css={styles?.segmentCard}>
                            <div css={styles?.segmentCardExplainerContainer}>
                              <Heading variant="label">
                                {' '}
                                {segmentTitle}{' '}
                              </Heading>
                              <Text variant="contentSmall" color="secondary">
                                {' '}
                                {description}{' '}
                              </Text>
                            </div>
                            <Text variant="content"> {value} </Text>
                            <Text variant="contentSmall" color="secondary">
                              {' '}
                              {valueDescription}{' '}
                            </Text>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>{closeButtonText}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NutritionFacts
export { NutritionFacts }
