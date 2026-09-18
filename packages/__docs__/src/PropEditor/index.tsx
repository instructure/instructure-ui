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
import { Button } from '@instructure/ui-buttons'
import { Text } from '@instructure/ui-text'
import { Checkbox } from '@instructure/ui-checkbox'
import { TextInput } from '@instructure/ui-text-input'
import { NumberInput } from '@instructure/ui-number-input'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'

import { AppContext } from '../appContext'
import Preview from '../Preview'

import { generateControls, serializeComposition } from './propControls'
import type { Control, PropEditorProps, PropValue } from './props'

/** A section's resolved controls, ready to render and serialize. */
type ResolvedSection = {
  id: string
  label: string
  controls: Control[]
  skipped: string[]
}

/** Per-section form values: `{ [sectionId]: { [propName]: value } }`. */
type SectionValues = Record<string, Record<string, PropValue>>

/**
 * A form-based playground for a component's props. Derives a form control per
 * prop from the component's react-docgen metadata, then renders a live preview
 * of the resulting JSX alongside the snippet itself.
 *
 * Which components get one, and how each is configured, lives in `./registry`.
 *
 * @private used only by the docs app.
 */
function PropEditor({
  componentId,
  sections: sectionInputs,
  template
}: PropEditorProps) {
  // The page-level theme switcher drives the preview, the same way it drives
  // every `type: example` block (see `Playground`). It knows which themes
  // apply to the selected library version; a local switcher here would have to
  // duplicate that and would get it wrong for the legacy versions.
  const { themeKey } = useContext(AppContext)

  const [values, setValues] = useState<SectionValues>({})

  // Resolve every section's controls — one per template slot.
  const sections = useMemo<ResolvedSection[]>(
    () =>
      sectionInputs.map((section) => {
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
      }),
    [sectionInputs]
  )

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

  const code = useMemo(
    () => serializeComposition(template, sections, values),
    [template, sections, values]
  )

  // A reader-triggered remount, for state that lives inside the preview rather
  // than in the form: an Alert that has already timed out, a checkbox toggled
  // by hand, text typed into an input.
  const [resetNonce, setResetNonce] = useState(0)

  // Some props are only read while a component mounts — the uncontrolled
  // `default*` seeds, Alert's `timeout`, ProgressCircle's mount animation — so
  // handing the same element a new value does nothing and the control reads as
  // broken. Keying the preview on those values swaps in a freshly mounted
  // element instead. Only they are in the key: keying on everything would tear
  // the preview down on each keystroke of an unrelated text control.
  const previewKey = useMemo(() => {
    const mountValues = sections.map((section) =>
      section.controls
        .filter((control) => control.mountOnly)
        .map(
          (control) =>
            `${control.name}=${String(values[section.id]?.[control.name])}`
        )
        .join(',')
    )
    return `${resetNonce}|${mountValues.join('|')}`
  }, [sections, values, resetNonce])

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
        {/* Controls column: narrow, holds the prop selectors. */}
        <Flex.Item size="18rem" shouldGrow shouldShrink>
          {sections.map((section, index) => (
            <View
              key={section.id}
              as="div"
              margin={index === 0 ? '0' : 'medium 0 0 0'}
            >
              {/* Single-section mode keeps the generic "Props" label; a
                  composition labels each group by its element. */}
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
          <Flex alignItems="center" justifyItems="space-between">
            <Flex.Item>
              <Text weight="bold">Preview</Text>
            </Flex.Item>
            <Flex.Item>
              <Button
                size="small"
                onClick={() => setResetNonce((nonce) => nonce + 1)}
              >
                Reset preview
              </Button>
            </Flex.Item>
          </Flex>
          <View as="div" margin="small 0 0 0">
            <Preview
              key={previewKey}
              code={code}
              themeKey={themeKey}
              fullscreen={false}
            />
          </View>

          <View as="div" margin="medium 0 0 0">
            <SourceCodeEditor
              label={`${componentId} code`}
              language="jsx"
              value={code}
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

export { PropEditor }
