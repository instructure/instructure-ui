// @ts-nocheck

import { Tag } from '@instructure/ui-tag'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <div>
      <Tag
        text="hello"
        themeOverride={{
          maxWidth: '10px',
          defaultBackground: 'custom value'
        }}
      />
      <Tag
        text="hello"
        themeOverride={() => ({
          maxWidth: '10px',
          defaultBackground: 'custom value'
        })}
      />
      <Tag
        text="hello"
        themeOverride={{
          defaultBackground: 'custom value'
        }}
      />
      <Button
        text="hello"
        themeOverride={{
          maxWidth: '10px'
        }}
      />
      <Tag
        text="hello"
        themeOverride={{
          maxWidth: '10px'
        }}
      />
      <Tag
        text="hello"
        themeOverride={{
          ...someOverrides
        }}
      />
      <Tag
        text="hello"
        themeOverride={{
          ...someOverrides,
          maxWidth: '10px'
        }}
      />
      <Tag themeOverride={getThemeOverride()} />
      <Tag themeOverride={theme} />
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Tag: {
              maxWidth: '10px',
              defaultBackground: 'custom value'
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Tag: {
              maxWidth: '10px'
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={(theme) => {
          return {
            componentOverrides: {
              Tag: {
                maxWidth: '10px',
                defaultBackground: 'custom value'
              }
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={(theme) => {
          return {
            componentOverrides: {
              Tag: {
                maxWidth: '10px'
              }
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>
      <Tag
        themeOverride={isMobile ? { maxWidth: '100%' } : { width: '200px' }}
      />
    </div>
  )
}
