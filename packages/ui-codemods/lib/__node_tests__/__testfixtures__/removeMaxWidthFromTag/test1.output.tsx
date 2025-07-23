// @ts-nocheck

import { Tag } from '@instructure/ui-tag'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <div>
      <Tag
        text="hello"
        themeOverride={{
          defaultBackground: 'custom value'
        }}
      />
      <Tag
        text="hello"
        themeOverride={() => ({
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
      <Tag text="hello" />
      <Tag
        text="hello"
        themeOverride={{
          ...someOverrides
        }}
      />
      <Tag
        text="hello"
        themeOverride={{
          ...someOverrides
        }}
      />
      <Tag themeOverride={getThemeOverride()} />
      <Tag themeOverride={theme} />
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Tag: {
              defaultBackground: 'custom value'
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>

      <Tag text="hello" />

      <InstUISettingsProvider
        theme={(theme) => {
          return {
            componentOverrides: {
              Tag: {
                defaultBackground: 'custom value'
              }
            }
          }
        }}
      >
        <Tag text="hello" />
      </InstUISettingsProvider>

      <Tag text="hello" />

      <Tag
        themeOverride={isMobile ? { maxWidth: '100%' } : { width: '200px' }}
      />
    </div>
  )
}
