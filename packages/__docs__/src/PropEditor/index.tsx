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

import { useContext, useEffect, useMemo, useState } from 'react'

import { View } from '@instructure/ui-view'
import { Flex } from '@instructure/ui-flex'
import { Text } from '@instructure/ui-text'
import { Spinner } from '@instructure/ui-spinner'
import { Checkbox } from '@instructure/ui-checkbox'
import { TextInput } from '@instructure/ui-text-input'
import { NumberInput } from '@instructure/ui-number-input'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'

import { AppContext } from '../appContext'
import Preview from '../Preview'
import { getDeployBase } from '../navigationUtils'

import { generateControls, serializeJsx } from './propControls'
import type {
  Control,
  PropEditorProps,
  PropValue,
  ReactDocgenProps
} from './props'

type Status = 'loading' | 'ready' | 'error'

const noop = () => {}

/**
 * An auto-generated, form-based playground for a component's props. Reads the
 * component's react-docgen metadata (fetched at runtime, the same JSON the
 * props table uses), derives a form control per prop, and renders a live
 * preview plus the equivalent JSX. Intended for use inside component READMEs
 * via a `type: embed` code block, e.g. `<PropEditor componentId="Button" />`.
 *
 * @private used only by the docs app.
 */
function PropEditor({ componentId, config = {} }: PropEditorProps) {
  const { componentVersion, themeKey, themes } = useContext(AppContext)
  const name = componentId

  const [docgenProps, setDocgenProps] = useState<ReactDocgenProps | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [values, setValues] = useState<Record<string, PropValue>>({})

  // A theme override local to the preview, so a reader can flip themes without
  // scrolling back to the page-level theme switcher. Seeded from the app's
  // selected theme and reset to it whenever that changes.
  const [selectedTheme, setSelectedTheme] = useState<string>(String(themeKey))
  useEffect(() => {
    setSelectedTheme(String(themeKey))
  }, [themeKey])

  // The switchable themes, minus the shared-tokens bundle and the legacy
  // wrappers (v2 components use the new theming system).
  const themeOptions = useMemo(
    () =>
      Object.keys(themes || {}).filter(
        (key) => key !== 'shared-tokens' && !key.startsWith('legacy-')
      ),
    [themes]
  )

  // Fetch the component's prop metadata (mirrors App.getDocsBasePath).
  useEffect(() => {
    let cancelled = false
    const base = getDeployBase()
    const versionSeg = componentVersion ? `/${componentVersion}` : ''
    const url = `${base}/docs${versionSeg}/${name}.json`

    setStatus('loading')
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`request failed (${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setDocgenProps((data.props as ReactDocgenProps) || {})
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setErrorMsg(err?.message || String(err))
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [name, componentVersion])

  const { controls, skipped } = useMemo(
    () =>
      docgenProps
        ? generateControls(docgenProps, config)
        : { controls: [] as Control[], skipped: [] as string[] },
    [docgenProps, config]
  )

  // Seed the form with each control's default whenever the controls change.
  useEffect(() => {
    const initial: Record<string, PropValue> = {}
    controls.forEach((control) => {
      initial[control.name] = control.initialValue
    })
    setValues(initial)
  }, [controls])

  const code = useMemo(
    () => serializeJsx(name, controls, values),
    [name, controls, values]
  )

  const setValue = (propName: string, value: PropValue) => {
    setValues((prev) => ({ ...prev, [propName]: value }))
  }

  const renderControl = (control: Control) => {
    const value = values[control.name]

    if (control.type === 'boolean') {
      return (
        <Checkbox
          variant="toggle"
          size="small"
          label={control.name}
          checked={value === true}
          onChange={(event) => setValue(control.name, event.target.checked)}
        />
      )
    }

    if (control.type === 'select') {
      return (
        <SimpleSelect
          renderLabel={control.name}
          value={value == null ? '' : String(value)}
          onChange={(_event, { value: selected }) =>
            setValue(control.name, selected === '' ? undefined : selected)
          }
        >
          {!control.required && (
            <SimpleSelect.Option id={`${control.name}--unset`} value="">
              (unset)
            </SimpleSelect.Option>
          )}
          {(control.options || []).map((option) => (
            <SimpleSelect.Option
              key={option}
              id={`${control.name}--${option}`}
              value={option}
            >
              {option}
            </SimpleSelect.Option>
          ))}
        </SimpleSelect>
      )
    }

    if (control.type === 'number') {
      return (
        <NumberInput
          renderLabel={control.name}
          value={value == null ? '' : String(value)}
          onChange={(_event, val) =>
            setValue(control.name, val === '' ? undefined : Number(val))
          }
        />
      )
    }

    return (
      <TextInput
        renderLabel={control.name}
        value={value == null ? '' : String(value)}
        onChange={(_event, val) => setValue(control.name, val)}
      />
    )
  }

  if (status === 'loading') {
    return (
      <View as="div" padding="medium">
        <Spinner renderTitle="Loading props" size="x-small" />
        <View as="span" margin="0 0 0 small">
          <Text>Loading {name} props…</Text>
        </View>
      </View>
    )
  }

  if (status === 'error') {
    return (
      <View as="div" padding="medium">
        <Text color="danger">
          Could not load props for <code>{name}</code>: {errorMsg}
        </Text>
      </View>
    )
  }

  return (
    <View
      as="div"
      display="block"
      background="secondary"
      padding="medium"
      borderRadius="medium"
      margin="medium 0"
    >
      <Flex alignItems="stretch" gap="medium" wrap="wrap">
        {/* Controls column: narrow, holds the theme + prop selectors. */}
        <Flex.Item size="18rem" shouldGrow shouldShrink>
          {themeOptions.length > 1 && (
            <View as="div" margin="0 0 small 0">
              <SimpleSelect
                renderLabel="Theme"
                value={selectedTheme}
                onChange={(_event, { value: selected }) =>
                  setSelectedTheme(String(selected))
                }
              >
                {themeOptions.map((option) => (
                  <SimpleSelect.Option
                    key={option}
                    id={`theme--${option}`}
                    value={option}
                  >
                    {option}
                  </SimpleSelect.Option>
                ))}
              </SimpleSelect>
            </View>
          )}
          <Text weight="bold">Props</Text>
          <View as="div" margin="small 0 0 0">
            {controls.map((control) => (
              <View key={control.name} as="div" margin="0 0 small 0">
                {renderControl(control)}
              </View>
            ))}
          </View>
          {skipped.length > 0 && (
            <View as="div" margin="small 0 0 0">
              <Text size="small" color="secondary">
                Not editable here: {skipped.join(', ')}
              </Text>
            </View>
          )}
        </Flex.Item>

        {/* Preview column: takes the remaining space beside the controls. */}
        <Flex.Item size="24rem" shouldGrow shouldShrink>
          <Text weight="bold">Preview</Text>
          <View as="div" margin="small 0 0 0">
            <Preview code={code} language="jsx" themeKey={selectedTheme} />
          </View>

          <View as="div" margin="medium 0 0 0">
            <SourceCodeEditor
              label={`${name} code`}
              language="jsx"
              value={code}
              onChange={noop}
              readOnly
              lineWrapping
            />
          </View>
        </Flex.Item>
      </Flex>
    </View>
  )
}

PropEditor.displayName = 'PropEditor'

export default PropEditor
export { PropEditor }
