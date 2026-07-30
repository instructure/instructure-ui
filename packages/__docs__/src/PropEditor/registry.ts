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

import type { PropEditorConfig } from './props'

/**
 * A representative set of the `PlacementPropValues` alias. That type is an
 * import rather than an inline union, so react-docgen can't resolve it to
 * options and the components using it need a curated list. The bare directions
 * come first because they are what these components default to — an option list
 * missing the default leaves the select blank.
 */
const PLACEMENTS = [
  'top',
  'bottom',
  'start',
  'end',
  'top start',
  'top center',
  'top end',
  'bottom start',
  'bottom center',
  'bottom end',
  'start center',
  'end center'
]

/**
 * A curated composition playground for a compound component, letting a reader
 * edit both the outer element's props and a representative child's props. The
 * `template` is JSX with one `{{id}}` placeholder per section, positioned where
 * that element's attributes belong; each section's `config` typically carries
 * an `include` list of the props to expose.
 */
export type CustomPlayground = {
  sections: Array<{ id: string; label?: string; config?: PropEditorConfig }>
  template: string
  /**
   * Prop names the component has to expose for this template to apply. The docs
   * site serves several minor versions from one registry, and a few components
   * changed API between them — v11.6's `DateInput` is the old manual-calendar
   * one, v11.7's is the `DateInput2` API under the same name. A template written
   * against one shape is skipped on versions whose metadata lacks these props,
   * rather than rendering a preview that can't work.
   */
  requiresProps?: string[]
}

/**
 * Which docs pages get a `PropEditor` and how it's configured.
 *
 * A playground is opt-in: a component gets one only by appearing in
 * {@link SIMPLE_PLAYGROUNDS} (single-element form) or
 * {@link CUSTOM_PLAYGROUNDS} (curated composition). Everything else keeps its
 * README examples as its documentation. Deriving the list from prop metadata
 * instead was tried and doesn't work: most components can't render from a bare
 * `<Name />` — they need a required `label`/`renderLabel`/`src`, a data array,
 * a render prop, or a portal target — so the generated preview came out empty,
 * unlabeled, or crashed.
 */

/**
 * Components that get the simple single-element form, keyed by id, with that
 * component's form config.
 *
 * A component belongs here when `<Name />` plus a few seeded values renders a
 * complete example — that is, every prop it *needs* is one the form can edit
 * (a string, number, boolean, or literal union), so `defaults` can supply it
 * and the snippet stays copy-pasteable. Components that need something the
 * form can't type — element children, a render prop, a data fixture — get a
 * {@link CUSTOM_PLAYGROUNDS} template instead.
 */
const SIMPLE_PLAYGROUNDS: Record<string, PropEditorConfig> = {
  Alert: { defaults: { children: 'This is an alert' } },
  Avatar: { defaults: { name: 'Sarah Robbins' } },
  // `standalone` renders the badge on its own; normally it wraps a child.
  Badge: { defaults: { count: 99, standalone: true } },
  Billboard: { defaults: { heading: 'Nothing to see here' } },
  Button: { defaults: { children: 'Click me' } },
  Byline: { defaults: { children: 'Byline content' } },
  // Renders a full month grid from its own defaults. `selectedLabel` is
  // required from v11.7 on; on older versions there's no such prop and the
  // seed is simply unused.
  Calendar: { defaults: { selectedLabel: 'Selected' } },
  Checkbox: { defaults: { label: 'Enable notifications' } },
  CloseButton: { defaults: { screenReaderLabel: 'Close' } },
  ColorContrast: {
    defaults: {
      firstColor: '#FFFFFF',
      secondColor: '#0F7C51',
      label: 'Contrast ratio',
      successLabel: 'PASS',
      failureLabel: 'FAIL',
      normalTextLabel: 'Normal text',
      largeTextLabel: 'Large text',
      graphicsTextLabel: 'Graphics text'
    }
  },
  ColorIndicator: {},
  ColorPicker: {
    defaults: { label: 'Background color', placeholderText: 'Enter HEX' }
  },
  CondensedButton: { defaults: { children: 'Click me' } },
  ContextView: { defaults: { children: 'Context content' } },
  Heading: { defaults: { children: 'Heading text' } },
  Link: { defaults: { children: 'A link' } },
  // Prop-driven: the page buttons come from the counts, not from children.
  Pagination: { defaults: { totalPageNumber: 10, currentPage: 3 } },
  Pill: { defaults: { children: 'Pill' } },
  ProgressBar: {
    defaults: {
      screenReaderLabel: 'Loading completion',
      valueNow: 40,
      valueMax: 60
    }
  },
  ProgressCircle: {
    defaults: {
      screenReaderLabel: 'Loading completion',
      valueNow: 40,
      valueMax: 60
    }
  },
  RadioInput: { defaults: { label: 'Option one' } },
  // `max` defaults to 0, which leaves nothing to drag.
  RangeInput: { defaults: { label: 'Volume', max: 100 } },
  Rating: { defaults: { label: 'Course rating', valueNow: 3 } },
  SourceCodeEditor: {
    defaults: { label: 'Code editor', defaultValue: 'const answer = 42' }
  },
  Text: { defaults: { children: 'Some text' } },
  TextArea: { defaults: { label: 'Description' } },
  ToggleDetails: {
    defaults: { summary: 'Toggle me', children: 'Details content' }
  },
  TruncateText: {
    defaults: {
      children:
        'A long line of text that gets truncated once it outgrows its container'
    }
  },
  View: { defaults: { children: 'View content' } }
}

/**
 * The simple-form config for a component, or `undefined` when it isn't
 * registered for a single-element playground.
 */
export function getSimplePlayground(id: string): PropEditorConfig | undefined {
  return SIMPLE_PLAYGROUNDS[id]
}

/**
 * Curated composition playgrounds, keyed by the outer component's id. This is
 * the home for anything the single-element form can't express: compound
 * components (a bare `<Menu />` with no children isn't a useful form) and
 * components whose required props have to be hardcoded around the editable
 * ones. Section ids must match a `{{id}}` placeholder in the `template` and,
 * for children, a child doc id (e.g. `Menu.Item`) so the editor can source that
 * element's metadata.
 *
 * Only the placeholders are substituted, so a template can be anything the
 * README examples can be — including a stateful wrapper component ending in
 * `render(<Example />)`. That's what a controlled component with no internal
 * fallback needs (see `ColorMixer`): a hardcoded handler would leave it frozen.
 * Whatever the template wires up itself belongs in the section's `exclude`, so
 * the form doesn't write a second copy of the same attribute.
 */
const CUSTOM_PLAYGROUNDS: Record<string, CustomPlayground> = {
  AppNav: {
    sections: [
      {
        id: 'AppNav.Item',
        label: 'AppNav.Item (first item)',
        config: { include: ['isSelected'] }
      }
    ],
    template: `<AppNav screenReaderLabel="App navigation">
  <AppNav.Item renderLabel="Dashboard" href="#" {{AppNav.Item}} />
  <AppNav.Item renderLabel="Courses" href="#" />
  <AppNav.Item renderLabel="Calendar" href="#" />
</AppNav>`
  },

  Breadcrumb: {
    sections: [{ id: 'Breadcrumb', config: { include: ['size'] } }],
    template: `<Breadcrumb label="You are here" {{Breadcrumb}}>
  <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
  <Breadcrumb.Link href="#">Courses</Breadcrumb.Link>
  <Breadcrumb.Link>Assignments</Breadcrumb.Link>
</Breadcrumb>`
  },

  CheckboxGroup: {
    sections: [
      {
        id: 'CheckboxGroup',
        config: {
          defaults: { name: 'notifications', description: 'Notify me about' }
        }
      }
    ],
    template: `<CheckboxGroup {{CheckboxGroup}}>
  <Checkbox label="Comments" value="comments" />
  <Checkbox label="Mentions" value="mentions" />
  <Checkbox label="Announcements" value="announcements" />
</CheckboxGroup>`
  },

  // Controlled with no internal fallback: without a `value`/`onChange` pair the
  // sliders and the palette can't move, so the template owns that state and the
  // form edits the rest.
  ColorMixer: {
    sections: [
      { id: 'ColorMixer', config: { include: ['disabled', 'withAlpha'] } }
    ],
    template: `const Example = () => {
  const [value, setValue] = useState('#328DCFC2')

  return (
    <ColorMixer
      value={value}
      onChange={setValue}
      rgbRedInputScreenReaderLabel="Input field for red"
      rgbGreenInputScreenReaderLabel="Input field for green"
      rgbBlueInputScreenReaderLabel="Input field for blue"
      rgbAlphaInputScreenReaderLabel="Input field for alpha"
      colorSliderNavigationExplanationScreenReaderLabel="You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively"
      alphaSliderNavigationExplanationScreenReaderLabel="You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively"
      colorPaletteNavigationExplanationScreenReaderLabel="You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively"
      {{ColorMixer}}
    />
  )
}

render(<Example />)`
  },

  // Same as ColorMixer: `selected`/`onSelect` have to be wired up for a swatch
  // to look selectable, and the swatch list is an array the form can't type.
  ColorPreset: {
    sections: [
      {
        id: 'ColorPreset',
        config: {
          include: ['disabled', 'label'],
          defaults: { label: 'Choose a color' }
        }
      }
    ],
    template: `const Example = () => {
  const [selected, setSelected] = useState('#0CBF94')

  return (
    <ColorPreset
      colors={['#ffffff', '#0CBF94', '#0C89BF', '#BF0C6D', '#BF8D0C', '#ff0000', '#576A66', '#35423A']}
      selected={selected}
      onSelect={setSelected}
      colorScreenReaderLabel={(hexCode, isSelected) => 'color with hex code ' + hexCode + (isSelected ? ' selected' : '')}
      {{ColorPreset}}
    />
  )
}

render(<Example />)`
  },

  // Only `data` has to be hardcoded — every label is an editable string.
  DataPermissionLevels: {
    sections: [
      {
        id: 'DataPermissionLevels',
        config: {
          defaults: {
            title: 'Data Permission Levels',
            triggerText: 'Data Permission Levels',
            modalLabel: 'Data permission levels',
            currentFeatureText: 'Current Feature:',
            currentFeature: 'Feature name',
            closeButtonText: 'Close',
            closeIconButtonScreenReaderLabel: 'Close'
          }
        }
      }
    ],
    template: `<DataPermissionLevels
  data={[
    {
      level: 'LEVEL 1',
      title: 'Descriptive Analytics and Research',
      description: 'Anonymized aggregate data informs model development and product improvements. No AI models are used at this level.',
      highlighted: true
    },
    {
      level: 'LEVEL 2',
      title: 'AI-Powered Features Without Data Training',
      description: 'Off-the-shelf AI models take customer data as input. No data is used to train the model.'
    }
  ]}
  {{DataPermissionLevels}}
/>`
  },

  // From v11.7 on, `DateInput` is the DateInput2 API under the old name. The
  // v11.6 component of that name is a different, manual-calendar API that needs
  // `Calendar.Day` children and a fistful of request handlers, so this entry is
  // gated on a prop only the new one has.
  DateInput: {
    sections: [
      {
        id: 'DateInput',
        config: {
          exclude: ['value'],
          defaults: { invalidDateErrorMessage: 'Invalid date' }
        }
      }
    ],
    requiresProps: ['screenReaderLabels'],
    template: `const Example = () => {
  const [value, setValue] = useState('')

  return (
    <DateInput
      renderLabel="Choose a date"
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month',
        datePickerDialog: 'Date picker',
        selectedLabel: 'Selected'
      }}
      value={value}
      onChange={(event, inputValue) => setValue(inputValue)}
      {{DateInput}}
    />
  )
}

render(<Example />)`
  },

  // Fully controlled, with no internal fallback: without this state, typing in
  // the input and picking a day in the calendar both leave the field empty.
  DateInput2: {
    sections: [
      {
        id: 'DateInput2',
        config: {
          exclude: ['value'],
          defaults: { invalidDateErrorMessage: 'Invalid date' }
        }
      }
    ],
    template: `const Example = () => {
  const [value, setValue] = useState('')

  return (
    <DateInput2
      renderLabel="Choose a date"
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month'
      }}
      value={value}
      onChange={(event, inputValue) => setValue(inputValue)}
      {{DateInput2}}
    />
  )
}

render(<Example />)`
  },

  DateTimeInput: {
    sections: [
      {
        id: 'DateTimeInput',
        config: {
          defaults: {
            description: 'Pick a date and time',
            prevMonthLabel: 'Previous month',
            nextMonthLabel: 'Next month'
          }
        }
      }
    ],
    // `screenReaderLabels` is the v11.7 shape; the two seeded month labels are
    // the older equivalent. Each version ignores the props it doesn't have, so
    // one template serves both.
    template: `<DateTimeInput
  dateRenderLabel="Date"
  timeRenderLabel="Time"
  invalidDateTimeMessage="Enter a valid date and time"
  screenReaderLabels={{
    calendarIcon: 'Open calendar',
    prevMonthButton: 'Previous month',
    nextMonthButton: 'Next month',
    datePickerDialog: 'Date picker',
    selectedLabel: 'Selected'
  }}
  {{DateTimeInput}}
/>`
  },

  DrawerLayout: {
    sections: [
      {
        id: 'DrawerLayout.Tray',
        label: 'DrawerLayout.Tray',
        config: { include: ['placement', 'border', 'shadow'] }
      }
    ],
    template: `<View as="div" display="block" height="14rem" withVisualDebug>
  <DrawerLayout>
    <DrawerLayout.Tray label="Navigation" open {{DrawerLayout.Tray}}>
      <View as="div" padding="small">Tray content</View>
    </DrawerLayout.Tray>
    <DrawerLayout.Content label="Main content">
      <View as="div" padding="small">Page content</View>
    </DrawerLayout.Content>
  </DrawerLayout>
</View>`
  },

  Drilldown: {
    sections: [
      {
        id: 'Drilldown.Option',
        label: 'Drilldown.Option (first option)',
        config: { include: ['disabled'] }
      }
    ],
    template: `<Drilldown rootPageId="root" width="18rem" maxHeight="20rem">
  <Drilldown.Page id="root" renderTitle="Options">
    <Drilldown.Option id="opt1" {{Drilldown.Option}}>Option one</Drilldown.Option>
    <Drilldown.Option id="opt2">Option two</Drilldown.Option>
    <Drilldown.Option id="opt3">Option three</Drilldown.Option>
  </Drilldown.Page>
</Drilldown>`
  },

  FileDrop: {
    sections: [{ id: 'FileDrop' }],
    template: `<FileDrop renderLabel="Drop files here, or click to browse" {{FileDrop}} />`
  },

  Flex: {
    sections: [
      {
        id: 'Flex',
        config: {
          include: ['direction', 'alignItems', 'justifyItems', 'wrap']
        }
      },
      {
        id: 'Flex.Item',
        label: 'Flex.Item (first item)',
        config: { include: ['shouldGrow', 'shouldShrink'] }
      }
    ],
    template: `<Flex {{Flex}}>
  <Flex.Item {{Flex.Item}}>
    <View as="div" padding="small" withVisualDebug>Item 1</View>
  </Flex.Item>
  <Flex.Item>
    <View as="div" padding="small" withVisualDebug>Item 2</View>
  </Flex.Item>
  <Flex.Item>
    <View as="div" padding="small" withVisualDebug>Item 3</View>
  </Flex.Item>
</Flex>`
  },

  FormFieldGroup: {
    sections: [
      {
        id: 'FormFieldGroup',
        // `children` is typed as a node, so the form would offer a text control
        // for it — but the template owns the children here.
        config: {
          exclude: ['children'],
          defaults: { description: 'Contact details' }
        }
      }
    ],
    template: `<FormFieldGroup {{FormFieldGroup}}>
  <TextInput renderLabel="First name" />
  <TextInput renderLabel="Last name" />
</FormFieldGroup>`
  },

  Grid: {
    sections: [
      {
        id: 'Grid',
        config: {
          include: [
            'colSpacing',
            'rowSpacing',
            'hAlign',
            'vAlign',
            'visualDebug'
          ]
        }
      }
    ],
    template: `<Grid {{Grid}}>
  <Grid.Row>
    <Grid.Col>Column one</Grid.Col>
    <Grid.Col>Column two</Grid.Col>
    <Grid.Col>Column three</Grid.Col>
  </Grid.Row>
</Grid>`
  },

  IconButton: {
    sections: [
      {
        id: 'IconButton',
        config: { defaults: { screenReaderLabel: 'Edit' } }
      }
    ],
    template: `<IconButton renderIcon={<EditInstUIIcon />} {{IconButton}} />`
  },

  Img: {
    sections: [
      // `src` is a string the form could edit, but the sample image comes from
      // a docs global, so it stays in the template.
      {
        id: 'Img',
        config: { exclude: ['src'], defaults: { alt: 'Placeholder' } }
      }
    ],
    template: `<Img src={placeholderImage(320, 200)} {{Img}} />`
  },

  InlineList: {
    sections: [
      { id: 'InlineList', config: { include: ['delimiter', 'size'] } }
    ],
    template: `<InlineList {{InlineList}}>
  <InlineList.Item>Home</InlineList.Item>
  <InlineList.Item>Courses</InlineList.Item>
  <InlineList.Item>Grades</InlineList.Item>
</InlineList>`
  },

  // `children` is raw SVG markup, which the form can't offer as a text control.
  InlineSVG: {
    sections: [{ id: 'InlineSVG', config: { exclude: ['children'] } }],
    template: `<InlineSVG viewBox="0 0 24 24" width="3rem" height="3rem" {{InlineSVG}}>
  <circle cx="12" cy="12" r="10" fill="currentColor" />
</InlineSVG>`
  },

  List: {
    sections: [
      { id: 'List', config: { include: ['delimiter', 'isUnstyled', 'size'] } }
    ],
    template: `<List {{List}}>
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third item</List.Item>
</List>`
  },

  Metric: {
    sections: [{ id: 'Metric' }],
    template: `<Metric renderLabel="Grade" renderValue="92%" {{Metric}} />`
  },

  MetricGroup: {
    sections: [{ id: 'MetricGroup', config: { exclude: ['children'] } }],
    template: `<MetricGroup {{MetricGroup}}>
  <Metric renderLabel="Grade" renderValue="92%" />
  <Metric renderLabel="Missing" renderValue="4" />
  <Metric renderLabel="Late" renderValue="2" />
</MetricGroup>`
  },

  // Modal always renders through a `Portal`, so without a `mountNode` it lands
  // in `document.body` and the preview box stays empty. `constrain="parent"`
  // only switches the dialog to absolute positioning — it needs the sized,
  // relatively-positioned mount node to be constrained to, same as the README's
  // "Constraining Modal to a parent element" example.
  Modal: {
    sections: [{ id: 'Modal', config: { include: ['size', 'variant'] } }],
    template: `<View as="div" display="block" height="20rem" position="relative" id="modalPlaygroundMount" withVisualDebug>
  <Modal open label="Example dialog" constrain="parent" mountNode={() => document.getElementById('modalPlaygroundMount')} {{Modal}}>
    <Modal.Header>
      <Heading>Modal heading</Heading>
    </Modal.Header>
    <Modal.Body>
      <Text>Modal body content goes here.</Text>
    </Modal.Body>
    <Modal.Footer>
      <Button color="primary">Confirm</Button>
    </Modal.Footer>
  </Modal>
</View>`
  },

  NumberInput: {
    sections: [{ id: 'NumberInput' }],
    template: `<NumberInput renderLabel="Number of students" {{NumberInput}} />`
  },

  // Only `data` has to be hardcoded — every label is an editable string.
  NutritionFacts: {
    sections: [
      {
        id: 'NutritionFacts',
        config: {
          defaults: {
            title: 'Nutrition Facts',
            featureName: 'Feature name',
            triggerText: 'Nutrition Facts',
            modalLabel: 'AI nutrition facts',
            closeButtonText: 'Close',
            closeIconButtonScreenReaderLabel: 'Close'
          }
        }
      }
    ],
    template: `<NutritionFacts
  data={[
    {
      blockTitle: 'Model & Data',
      segmentData: [
        {
          segmentTitle: 'Base Model',
          description: 'The foundational AI further training is built on.',
          value: 'Claude 3 Haiku'
        },
        {
          segmentTitle: 'Trained with User Data',
          description: 'Whether customer data was used to improve results.',
          value: 'No'
        }
      ]
    },
    {
      blockTitle: 'Privacy & Compliance',
      segmentData: [
        {
          segmentTitle: 'Data Retention',
          description: 'How long the model stores customer data.',
          value: 'None'
        }
      ]
    }
  ]}
  {{NutritionFacts}}
/>`
  },

  Options: {
    sections: [
      {
        id: 'Options.Item',
        label: 'Options.Item (first item)',
        config: { include: ['variant'] }
      }
    ],
    template: `<Options>
  <Options.Item {{Options.Item}}>Option one</Options.Item>
  <Options.Item>Option two</Options.Item>
  <Options.Separator />
  <Options.Item>Option three</Options.Item>
</Options>`
  },

  // Portal-rendered, but positioned against its trigger, so the content lands
  // next to the preview rather than over the page. `isShowingContent` is seeded
  // to pin it open: left uncontrolled it would close on the first mouse move,
  // and every later `placement` change would then have nothing to move.
  Popover: {
    sections: [
      {
        id: 'Popover',
        config: {
          include: ['isShowingContent', 'placement', 'color', 'withArrow'],
          defaults: { isShowingContent: true },
          overrides: { placement: { control: 'select', options: PLACEMENTS } }
        }
      }
    ],
    template: `<View as="div" padding="x-large" textAlign="center">
  <Popover renderTrigger={<Button>Trigger</Button>} {{Popover}}>
    <View as="div" padding="small">Popover content</View>
  </Popover>
</View>`
  },

  Pages: {
    sections: [
      {
        id: 'Pages.Page',
        label: 'Pages.Page (first page)',
        config: { include: ['textAlign'] }
      }
    ],
    template: `<Pages defaultPageIndex={0}>
  <Pages.Page {{Pages.Page}}>
    <View as="div" padding="medium">First page content</View>
  </Pages.Page>
  <Pages.Page>
    <View as="div" padding="medium">Second page content</View>
  </Pages.Page>
</Pages>`
  },

  RadioInputGroup: {
    sections: [
      {
        id: 'RadioInputGroup',
        config: {
          exclude: ['children'],
          defaults: { name: 'grading', description: 'Grading type' }
        }
      }
    ],
    template: `<RadioInputGroup {{RadioInputGroup}}>
  <RadioInput label="Points" value="points" />
  <RadioInput label="Percentage" value="percentage" />
  <RadioInput label="Letter grade" value="letter" />
</RadioInputGroup>`
  },

  // `children` is a render function, so the template owns it and the form keeps
  // what decides the outcome: what gets measured. The preview area is narrower
  // than the docs viewport, so flipping `match` between the two swaps which
  // breakpoint wins.
  Responsive: {
    sections: [{ id: 'Responsive', config: { include: ['match', 'display'] } }],
    template: `<View as="div" width="20rem" padding="small" withVisualDebug>
  <Responsive
    query={{ narrow: { maxWidth: 600 }, wide: { minWidth: 601 } }}
    props={{
      narrow: { color: 'danger', children: 'narrow: the measured area is at most 600px' },
      wide: { color: 'success', children: 'wide: the measured area is over 600px' }
    }} {{Responsive}}>
    {(props) => <Text {...props} />}
  </Responsive>
</View>`
  },

  Select: {
    sections: [{ id: 'Select', config: { include: ['size', 'interaction'] } }],
    template: `<Select renderLabel="Choose an option" {{Select}}>
  <Select.Option id="opt1">Option one</Select.Option>
  <Select.Option id="opt2">Option two</Select.Option>
  <Select.Option id="opt3">Option three</Select.Option>
</Select>`
  },

  SideNavBar: {
    sections: [
      { id: 'SideNavBar', config: { include: ['minimized'] } },
      {
        id: 'SideNavBar.Item',
        label: 'SideNavBar.Item (first item)',
        config: { include: ['selected'] }
      }
    ],
    template: `<View as="div" display="block" height="22rem" withVisualDebug>
  <SideNavBar label="Main navigation" toggleLabel="Expand / collapse" {{SideNavBar}}>
    <SideNavBar.Item icon={<InboxInstUIIcon />} label="Inbox" href="#" {{SideNavBar.Item}} />
    <SideNavBar.Item icon={<InboxInstUIIcon />} label="Courses" href="#" />
    <SideNavBar.Item icon={<InboxInstUIIcon />} label="Calendar" href="#" />
  </SideNavBar>
</View>`
  },

  SimpleSelect: {
    sections: [
      {
        id: 'SimpleSelect',
        config: { include: ['size', 'interaction', 'isInline'] }
      }
    ],
    template: `<SimpleSelect renderLabel="Choose an option" {{SimpleSelect}}>
  <SimpleSelect.Option id="opt1" value="opt1">Option one</SimpleSelect.Option>
  <SimpleSelect.Option id="opt2" value="opt2">Option two</SimpleSelect.Option>
  <SimpleSelect.Option id="opt3" value="opt3">Option three</SimpleSelect.Option>
</SimpleSelect>`
  },

  Spinner: {
    sections: [{ id: 'Spinner' }],
    template: `<Spinner renderTitle="Loading" {{Spinner}} />`
  },

  // `children` is raw SVG markup, which the form can't offer as a text control.
  SVGIcon: {
    sections: [
      {
        id: 'SVGIcon',
        config: { exclude: ['children'], defaults: { size: 'medium' } }
      }
    ],
    template: `<SVGIcon viewBox="0 0 24 24" {{SVGIcon}}>
  <path d="M12 2 15 9 22 9 16 14 18 22 12 17 6 22 8 14 2 9 9 9Z" fill="currentColor" />
</SVGIcon>`
  },

  Table: {
    sections: [{ id: 'Table', config: { include: ['hover', 'layout'] } }],
    template: `<Table caption={() => 'Top courses'} {{Table}}>
  <Table.Head>
    <Table.Row>
      <Table.ColHeader id="name">Name</Table.ColHeader>
      <Table.ColHeader id="role">Role</Table.ColHeader>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.RowHeader>Alice</Table.RowHeader>
      <Table.Cell>Teacher</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.RowHeader>Bob</Table.RowHeader>
      <Table.Cell>Student</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`
  },

  Tabs: {
    sections: [
      { id: 'Tabs', config: { include: ['variant'] } },
      {
        id: 'Tabs.Panel',
        label: 'Tabs.Panel (first panel)',
        config: { include: ['isSelected', 'isDisabled'] }
      }
    ],
    template: `<Tabs {{Tabs}}>
  <Tabs.Panel renderTitle="First" id="one" {{Tabs.Panel}}>
    <View as="div" padding="small">First panel</View>
  </Tabs.Panel>
  <Tabs.Panel renderTitle="Second" id="two">
    <View as="div" padding="small">Second panel</View>
  </Tabs.Panel>
  <Tabs.Panel renderTitle="Third" id="three">
    <View as="div" padding="small">Third panel</View>
  </Tabs.Panel>
</Tabs>`
  },

  // `text` is a string-or-node union, which the form can't infer a control for.
  Tag: {
    sections: [{ id: 'Tag' }],
    template: `<Tag text="Static" {{Tag}} />`
  },

  TextInput: {
    sections: [{ id: 'TextInput' }],
    template: `<TextInput renderLabel="Full name" {{TextInput}} />`
  },

  TimeSelect: {
    sections: [{ id: 'TimeSelect' }],
    template: `<TimeSelect renderLabel="Choose a time" {{TimeSelect}} />`
  },

  // `status` on its own only sets `aria-pressed` — the icon, tooltip and label
  // that make a state change visible are the app's job, so a form control for it
  // looked like it did nothing. As in the README, the template owns the status
  // and derives all three from it: both states are one click apart.
  ToggleButton: {
    sections: [
      {
        id: 'ToggleButton',
        config: { exclude: ['status', 'screenReaderLabel'] }
      }
    ],
    template: `const Example = () => {
  const [pressed, setPressed] = useState(false)

  return (
    <ToggleButton
      status={pressed ? 'pressed' : 'unpressed'}
      renderIcon={pressed ? LockInstUIIcon : UnlockInstUIIcon}
      renderTooltipContent={pressed ? 'Unlock assignment' : 'Lock assignment'}
      screenReaderLabel={pressed ? 'Unlock assignment' : 'Lock assignment'}
      onClick={() => setPressed(!pressed)}
      {{ToggleButton}}
    />
  )
}

render(<Example />)`
  },

  ToggleGroup: {
    sections: [
      {
        id: 'ToggleGroup',
        config: {
          exclude: ['children'],
          defaults: { summary: 'Assignment details' }
        }
      }
    ],
    template: `<ToggleGroup toggleLabel="Expand / collapse details" {{ToggleGroup}}>
  <View as="div" padding="small">Details content</View>
</ToggleGroup>`
  },

  // Portal-rendered and `position: fixed`, so left alone it covers the docs page.
  // The `transform` on the mount node makes it the containing block for fixed
  // descendants, which keeps the tray (and its mask) inside the preview. Focus
  // containment is off for the same reason: with it on, an open tray traps the
  // keyboard and the form can't be reached.
  Tray: {
    sections: [
      {
        id: 'Tray',
        config: {
          include: [
            'open',
            'placement',
            'size',
            'border',
            'shadow',
            'enableMask'
          ],
          defaults: { open: true }
        }
      }
    ],
    template: `<div
  id="trayPlaygroundMount"
  style={{
    position: 'relative',
    height: '18rem',
    overflow: 'hidden',
    transform: 'translateZ(0)',
    outline: '0.0625rem dashed #C7CDD1'
  }}
>
  <View as="div" padding="small">Page content behind the tray</View>
  <Tray
    label="Navigation"
    shouldContainFocus={false}
    shouldReturnFocus={false}
    mountNode={() => document.getElementById('trayPlaygroundMount')}
    {{Tray}}
  >
    <View as="div" padding="medium">Tray content</View>
  </Tray>
</div>`
  },

  // Same as Popover: anchored to its trigger, and pinned open so a `placement`
  // change has something to reposition.
  Tooltip: {
    sections: [
      {
        id: 'Tooltip',
        config: {
          include: ['isShowingContent', 'placement', 'color'],
          defaults: { isShowingContent: true },
          overrides: { placement: { control: 'select', options: PLACEMENTS } }
        }
      }
    ],
    template: `<View as="div" padding="x-large" textAlign="center">
  <Tooltip renderTip="Tooltip content" {{Tooltip}}>
    <Button>Trigger</Button>
  </Tooltip>
</View>`
  },

  TreeBrowser: {
    sections: [{ id: 'TreeBrowser' }],
    template: `<TreeBrowser
  rootId={1}
  defaultExpanded={[1]}
  collections={{
    1: { id: 1, name: 'Assignments', collections: [2], items: [1] },
    2: { id: 2, name: 'Math Assignments', collections: [], items: [2, 3] }
  }}
  items={{
    1: { id: 1, name: 'Syllabus' },
    2: { id: 2, name: 'Addition Worksheet' },
    3: { id: 3, name: 'Subtraction Worksheet' }
  }}
  {{TreeBrowser}}
/>`
  },

  Menu: {
    sections: [
      {
        id: 'Menu',
        config: {
          include: ['label', 'placement', 'withArrow', 'disabled'],
          overrides: { placement: { control: 'select', options: PLACEMENTS } }
        }
      },
      {
        id: 'Menu.Item',
        label: 'Menu.Item (first item)',
        config: { include: ['selected', 'type', 'disabled'] }
      }
    ],
    // Matches the README example: a triggered popover menu. `defaultShow` keeps
    // it open so prop changes stay visible in the preview.
    template: `<Menu trigger={<Button>Menu</Button>} defaultShow {{Menu}}>
  <Menu.Item {{Menu.Item}}>Configurable item</Menu.Item>
  <Menu.Item>Another item</Menu.Item>
  <Menu.Separator />
  <Menu.Item>Third item</Menu.Item>
</Menu>`
  }
}

/*
 * Deliberately absent, so nobody re-derives them from the prop tables:
 *
 *  - AiInformation — needs two nested data fixtures plus 13 label strings the
 *    form can't type (they're typed as lookups into another component's
 *    props), which buys a ~70-line template with two editable props.
 *  - DateInput on v11.6 — the old manual-calendar API needs `Calendar.Day`
 *    children generated from a date library plus eight request handlers; the
 *    `DateInput` entry above covers v11.7's replacement of it.
 *  - TopNavBar — `children` is a render function, and its README already
 *    carries a hand-written Playground section.
 *  - Overlay, Mask — portal-rendered and full-viewport with no anchor to
 *    constrain them to, and dismissable only through their own handler, so one
 *    opened from the form takes over the docs page. (Tray gets the same
 *    treatment as Modal instead: a mount node it can't escape.)
 *  - Editable, InPlaceEdit — `children` is a render function *and* the props
 *    worth editing are the ones it receives, so the form would drive nothing.
 *  - FormField, InstUISettingsProvider — wrappers with nothing of their own to
 *    show; what a reader would tweak belongs to the child they wrap.
 */

/** The curated composition playground for a component, if one is registered. */
export function getCustomPlayground(id: string): CustomPlayground | undefined {
  return CUSTOM_PLAYGROUNDS[id]
}
