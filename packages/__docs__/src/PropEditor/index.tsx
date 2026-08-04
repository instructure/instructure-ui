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

import {
  generateControls,
  serializeComposition,
  serializeJsx
} from './propControls'
import type {
  Control,
  PropEditorProps,
  PropValue,
  ReactDocgenProps
} from './props'

/** A section's resolved controls, ready to render and serialize. */
type ResolvedSection = {
  id: string
  label: string
  controls: Control[]
  skipped: string[]
}

/** Per-section form values: `{ [sectionId]: { [propName]: value } }`. */
type SectionValues = Record<string, Record<string, PropValue>>

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
function PropEditor({
  componentId,
  props: providedProps,
  config: configProp,
  sections: sectionInputs,
  template
}: PropEditorProps) {
  const { componentVersion, themeKey, themes } = useContext(AppContext)
  const name = componentId

  // Stabilize config: when it isn't passed (composition mode), the inline
  // default would be a fresh object every render, thrashing the memo below and
  // re-seeding (i.e. wiping) the form on every keystroke.
  const config = useMemo(() => configProp ?? {}, [configProp])

  // Composition mode: multiple elements edited against a template. Otherwise
  // the single-element form, sourcing metadata from props or a runtime fetch.
  const isComposition = Boolean(sectionInputs && template)

  const [docgenProps, setDocgenProps] = useState<ReactDocgenProps | null>(
    providedProps ?? null
  )
  const [status, setStatus] = useState<Status>(
    providedProps || isComposition ? 'ready' : 'loading'
  )
  const [errorMsg, setErrorMsg] = useState('')
  const [values, setValues] = useState<SectionValues>({})

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

  // Fetch the component's prop metadata (mirrors App.getDocsBasePath). Skipped
  // when metadata is supplied via props (the auto-injected Document case) or in
  // composition mode (each section carries its own metadata).
  useEffect(() => {
    if (isComposition) return
    if (providedProps) {
      setDocgenProps(providedProps)
      setStatus('ready')
      return
    }

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
  }, [name, componentVersion, providedProps, isComposition])

  // Resolve every section's controls. Simple mode is just a single section
  // keyed by the component name; composition mode has one per template slot.
  const sections = useMemo<ResolvedSection[]>(() => {
    if (isComposition) {
      return sectionInputs!.map((section) => {
        const { controls, skipped } = generateControls(
          section.props,
          section.config || {}
        )
        return {
          id: section.id,
          label: section.label || section.id,
          controls,
          skipped
        }
      })
    }
    if (!docgenProps) return []
    const { controls, skipped } = generateControls(docgenProps, config)
    return [{ id: name, label: name, controls, skipped }]
  }, [isComposition, sectionInputs, docgenProps, config, name])

  // A structural signature of the sections/controls. Seeding keys off this
  // rather than the `sections` array identity, so an unrelated re-render that
  // produces an equivalent `sections` won't re-seed (and wipe) the form.
  const sectionsKey = useMemo(
    () =>
      sections
        .map((s) => `${s.id}:${s.controls.map((c) => c.name).join(',')}`)
        .join('|'),
    [sections]
  )

  // Seed the form with each control's default whenever the controls change.
  useEffect(() => {
    const initial: SectionValues = {}
    sections.forEach((section) => {
      const sectionValues: Record<string, PropValue> = {}
      section.controls.forEach((control) => {
        sectionValues[control.name] = control.initialValue
      })
      initial[section.id] = sectionValues
    })
    setValues(initial)
    // Seeding is keyed on the structural signature; `sections` itself is
    // intentionally not a dependency (its identity changes on every render).
  }, [sectionsKey])

  const code = useMemo(() => {
    if (isComposition) {
      return serializeComposition(template!, sections, values)
    }
    const section = sections[0]
    return section
      ? serializeJsx(name, section.controls, values[section.id] || {})
      : ''
  }, [isComposition, template, sections, values, name])

  const setValue = (sectionId: string, propName: string, value: PropValue) => {
    setValues((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [propName]: value }
    }))
  }

  const renderControl = (sectionId: string, control: Control) => {
    const value = values[sectionId]?.[control.name]

    if (control.type === 'boolean') {
      return (
        <Checkbox
          variant="toggle"
          size="small"
          label={control.name}
          checked={value === true}
          onChange={(event) =>
            setValue(sectionId, control.name, event.target.checked)
          }
        />
      )
    }

    if (control.type === 'select') {
      return (
        <SimpleSelect
          renderLabel={control.name}
          value={value == null ? '' : String(value)}
          onChange={(_event, { value: selected }) =>
            setValue(
              sectionId,
              control.name,
              selected === '' ? undefined : selected
            )
          }
        >
          {!control.required && (
            <SimpleSelect.Option
              id={`${sectionId}-${control.name}--unset`}
              value=""
            >
              (unset)
            </SimpleSelect.Option>
          )}
          {(control.options || []).map((option) => (
            <SimpleSelect.Option
              key={option}
              id={`${sectionId}-${control.name}--${option}`}
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
            setValue(
              sectionId,
              control.name,
              val === '' ? undefined : Number(val)
            )
          }
        />
      )
    }

    return (
      <TextInput
        renderLabel={control.name}
        value={value == null ? '' : String(value)}
        onChange={(_event, val) => setValue(sectionId, control.name, val)}
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
          {sections.map((section, index) => (
            <View
              key={section.id}
              as="div"
              margin={index === 0 ? '0' : 'medium 0 0 0'}
            >
              {/* Single-section (simple) mode keeps the generic "Props" label;
                  composition mode labels each group by its element. */}
              <Text weight="bold">
                {sections.length > 1 ? section.label : 'Props'}
              </Text>
              <View as="div" margin="small 0 0 0">
                {section.controls.map((control) => (
                  <View key={control.name} as="div" margin="0 0 small 0">
                    {renderControl(section.id, control)}
                  </View>
                ))}
              </View>
              {section.skipped.length > 0 && (
                <View as="div" margin="small 0 0 0">
                  <Text size="small" color="secondary">
                    Not editable here: {section.skipped.join(', ')}
                  </Text>
                </View>
              )}
            </View>
          ))}
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
