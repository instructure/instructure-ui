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
import { Popover } from '@instructure/ui-popover/latest'
import { CloseButton } from '@instructure/ui-buttons/latest'
import { Heading } from '@instructure/ui-heading/latest'
import { Text } from '@instructure/ui-text/latest'
import { Link } from '@instructure/ui-link/latest'
import { ExternalLinkInstUIIcon } from '@instructure/ui-icons'
import { useStyle } from '@instructure/emotion'
import { NutritionFacts } from '../../NutritionFacts/v1'
import { DataPermissionLevels } from '../../DataPermissionLevels/v1'

import { AiInformationProps } from './props'
import generateStyle from './styles'

/**
---
category: components/AI Components
---
**/
const AiInformation = ({
  title,
  data,
  trigger,
  fullscreenModals = false,

  dataPermissionLevelsModalLabel,
  dataPermissionLevelsTitle,
  dataPermissionLevelsData,
  dataPermissionLevelsCloseButtonText,
  dataPermissionLevelsCloseIconButtonScreenReaderLabel,
  dataPermissionLevelsCurrentFeature,
  dataPermissionLevelsCurrentFeatureText,

  nutritionFactsModalLabel,
  nutritionFactsTitle,
  nutritionFactsFeatureName,
  nutritionFactsData,
  nutritionFactsCloseButtonText,
  nutritionFactsCloseIconButtonScreenReaderLabel,
  themeOverride
}: AiInformationProps) => {
  const [open, setOpen] = useState(false)

  const styles = useStyle({
    generateStyle,
    themeOverride,
    componentId: 'AiInformation',
    displayName: 'AiInformation'
  })

  return (
    <div>
      <Popover
        renderTrigger={trigger}
        isShowingContent={open}
        on="click"
        screenReaderLabel="Popover Dialog Example"
        shouldContainFocus
        shouldReturnFocus
        shouldCloseOnDocumentClick
        offsetY="1rem"
        onShowContent={() => setOpen(true)}
        onHideContent={() => setOpen(false)}
      >
        <div css={styles?.aiInformation}>
          <div css={styles?.header}>
            <Heading level="h2" aiVariant="stacked" variant="titleModule">
              {title}
            </Heading>
            <CloseButton
              placement="end"
              offset="small"
              onClick={() => setOpen(false)}
              screenReaderLabel="Close"
            />
          </div>
          <div>
            {data.map(
              (
                {
                  featureName,
                  privacyNoticeText,
                  privacyNoticeUrl,
                  permissionLevelText,
                  permissionLevel,
                  description,
                  permissionLevelsModalTriggerText,
                  modelNameText,
                  modelName,
                  nutritionFactsModalTriggerText
                },
                index
              ) => (
                <div key={index}>
                  <div css={styles?.privacyNotice}>
                    <Link
                      href={privacyNoticeUrl}
                      renderIcon={<ExternalLinkInstUIIcon size="sm" />}
                      iconPlacement="end"
                      variant="standalone"
                    >
                      {privacyNoticeText}
                    </Link>
                  </div>
                  <div css={styles?.featureName}>
                    <Heading level="h3" variant="titleCardRegular">
                      {featureName}
                    </Heading>
                  </div>

                  <div css={styles?.permissionLevelText}>
                    <Heading level="h4" variant="label">
                      {permissionLevelText}
                    </Heading>
                  </div>
                  <div css={styles?.permissionLevel}>
                    <Text variant="legend"> {permissionLevel} </Text>
                  </div>
                  <div css={styles?.description}>
                    <Text variant="contentSmall"> {description} </Text>
                  </div>
                  <div css={styles?.permissionLevelsModalTriggerText}>
                    <DataPermissionLevels
                      fullscreen={fullscreenModals}
                      title={dataPermissionLevelsTitle}
                      currentFeatureText={
                        dataPermissionLevelsCurrentFeatureText
                      }
                      currentFeature={dataPermissionLevelsCurrentFeature}
                      closeIconButtonScreenReaderLabel={
                        dataPermissionLevelsCloseIconButtonScreenReaderLabel
                      }
                      closeButtonText={dataPermissionLevelsCloseButtonText}
                      modalLabel={dataPermissionLevelsModalLabel}
                      triggerText={permissionLevelsModalTriggerText}
                      data={dataPermissionLevelsData}
                    />
                  </div>
                  <div css={styles?.modelNameText}>
                    <Heading level="h3" variant="label">
                      {' '}
                      {modelNameText}{' '}
                    </Heading>
                  </div>
                  <div css={styles?.modelName}>
                    <Text variant="contentSmall"> {modelName} </Text>
                  </div>
                  <NutritionFacts
                    fullscreen={fullscreenModals}
                    modalLabel={nutritionFactsModalLabel}
                    title={nutritionFactsTitle}
                    featureName={nutritionFactsFeatureName}
                    closeButtonText={nutritionFactsCloseButtonText}
                    closeIconButtonScreenReaderLabel={
                      nutritionFactsCloseIconButtonScreenReaderLabel
                    }
                    triggerText={nutritionFactsModalTriggerText}
                    data={nutritionFactsData}
                  />
                  {data.length !== index + 1 ? (
                    <div css={styles?.divider} />
                  ) : null}
                </div>
              )
            )}
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default AiInformation
export { AiInformation }
