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
 * A curated composition playground for a compound component, letting a reader
 * edit both the outer element's props and a representative child's props. The
 * `template` is JSX with one `{{id}}` placeholder per section, positioned where
 * that element's attributes belong; each section's `config` typically carries
 * an `include` list of the props to expose.
 */
export type CustomPlayground = {
  sections: Array<{ id: string; label?: string; config?: PropEditorConfig }>
  template: string
}

/**
 * Which docs pages get an auto-injected `PropEditor` and how it's configured.
 *
 * The docs `Document` page renders a playground for every component that
 * {@link shouldAutoInject} accepts, using {@link getAutoInjectConfig} for any
 * per-component tuning. This registry is the single place to opt a component
 * out or adjust its generated form — no per-README edits required.
 */

/**
 * Components that must NOT get an auto-injected playground because they can't
 * render standalone from a simple `<Name .../>` tag: render-prop components
 * (children is a function), purely behavioral/positioning utilities, and
 * portals that render their output elsewhere. Add ids here as broken previews
 * surface — the preview itself is error-boundaried, so a missed one degrades
 * to an error box rather than crashing the page.
 */
const NO_AUTO_INJECT = new Set<string>([
  'Focusable', // children is a render function
  'Selectable', // children is a render function
  'Dialog', // behavioral, no visual output of its own
  'Portal', // renders children into a detached node
  'Position', // positioning utility around a target/content pair
  'Transition' // needs children + an `in` toggle to show anything
])

/**
 * Per-component overrides for the auto-injected playground, keyed by component
 * id. Only components that need tuning appear here; everything else is driven
 * entirely by react-docgen metadata. `sampleChildren` seeds the `children`
 * control so the preview isn't empty on first render.
 */
const AUTO_INJECT_CONFIG: Record<string, PropEditorConfig> = {
  Button: { sampleChildren: 'Click me' },
  CondensedButton: { sampleChildren: 'Click me' },
  Heading: { sampleChildren: 'Heading text' },
  Text: { sampleChildren: 'Some text' },
  Link: { sampleChildren: 'A link' },
  Pill: { sampleChildren: 'Pill' },
  Tag: { sampleChildren: 'Tag' },
  Byline: { sampleChildren: 'Byline content' },
  Alert: { sampleChildren: 'This is an alert' },
  ToggleDetails: { sampleChildren: 'Details content' }
}

/**
 * A minimal component doc has an id, a source extension, and prop metadata.
 * `props` is kept loose (react-docgen's descriptor shape is wider than the
 * subset {@link PropEditor} consumes); the gate only counts its keys.
 */
type AutoInjectDoc = {
  id?: string
  extension?: string
  props?: Record<string, unknown>
}

/**
 * Whether a component doc page should get an auto-injected playground.
 *
 * Skips: pages with no id, non-component pages (markdown/utility docs with no
 * prop metadata), compound child components (e.g. `Menu.Item`) which only
 * render inside a parent, and anything on the {@link NO_AUTO_INJECT} denylist.
 */
export function shouldAutoInject(doc: AutoInjectDoc): boolean {
  const { id, extension, props } = doc
  if (!id) return false
  // Only real component source files carry a renderable tag + props.
  if (extension && !['.js', '.ts', '.tsx'].includes(extension)) return false
  if (!props || Object.keys(props).length === 0) return false
  // Compound children (`Foo.Bar`) can't render without their parent.
  if (id.includes('.')) return false
  if (NO_AUTO_INJECT.has(id)) return false
  return true
}

/** Per-component playground config, or `{}` when none is registered. */
export function getAutoInjectConfig(id: string): PropEditorConfig {
  return AUTO_INJECT_CONFIG[id] ?? {}
}

/**
 * Components whose documented subcomponents are internal parts, not things a
 * consumer composes (e.g. `Rating.Icon`, `Pagination.Page` in the v2 prop-driven
 * API, `Calendar` which renders a full month on its own). Despite having dotted
 * child docs, these are edited as a single element, so they get the simple form
 * rather than being skipped as compound.
 */
const FORCE_SIMPLE = new Set<string>(['Rating', 'Pagination', 'Calendar'])

/** Whether a component with subcomponents should still get the simple form. */
export function isForceSimple(id: string): boolean {
  return FORCE_SIMPLE.has(id)
}

/**
 * Curated composition playgrounds for compound components, keyed by the outer
 * component's id. A compound component only gets an auto-injected playground if
 * it has an entry here — otherwise it falls back to its README examples (a bare
 * `<Menu />` with no children isn't a useful form). Section ids must match a
 * `{{id}}` placeholder in the `template` and, for children, a child doc id
 * (e.g. `Menu.Item`) so the editor can source that element's metadata.
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

  Modal: {
    sections: [{ id: 'Modal', config: { include: ['size', 'variant'] } }],
    template: `<View as="div" display="block" height="20rem" position="relative" withVisualDebug>
  <Modal open label="Example dialog" constrain="parent" {{Modal}}>
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

  Menu: {
    sections: [
      {
        id: 'Menu',
        config: {
          include: ['label', 'placement', 'withArrow', 'disabled'],
          // `placement` is typed as the `PlacementPropValues` alias, so it can't
          // be auto-inferred as a select — supply a curated set of options.
          overrides: {
            placement: {
              control: 'select',
              options: [
                'top start',
                'top center',
                'top end',
                'bottom start',
                'bottom center',
                'bottom end',
                'start center',
                'end center'
              ]
            }
          }
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

/** The curated composition playground for a component, if one is registered. */
export function getCustomPlayground(id: string): CustomPlayground | undefined {
  return CUSTOM_PLAYGROUNDS[id]
}
