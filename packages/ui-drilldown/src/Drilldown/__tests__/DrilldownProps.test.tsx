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

import React from 'react'

import { expect, mount, stub } from '@instructure/ui-test-utils'
import { Popover } from '@instructure/ui-popover'

import { Drilldown } from '../index'
import { DrilldownLocator } from '../DrilldownLocator'

describe('<Drilldown />', async () => {
  describe('rootPageId prop', async () => {
    it('should set the initial page and render it', async () => {
      await mount(
        <Drilldown rootPageId="page1">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const page0Option = await drilldown.find('#option01', {
        expectEmpty: true
      })
      const page1Option = await drilldown.find('#option11')

      expect(page0Option).to.not.exist()
      expect(page1Option).to.exist()
    })
  })

  describe('children prop', async () => {
    it('should not allow non-DrilldownPage children', async () => {
      stub(console, 'error')
      await mount(
        <Drilldown rootPageId="page0">
          <div id="testDiv">DIV</div>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find({
        expectEmpty: true
      })

      expect(drilldown).to.not.exist()
    })
  })

  describe('id prop', async () => {
    it('should put id attr on the drilldown', async () => {
      await mount(
        <Drilldown rootPageId="page0" id="testId">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getId()).to.equal('testId')
    })
  })

  describe('label prop', async () => {
    it('should be added as aria-label', async () => {
      await mount(
        <Drilldown rootPageId="page0" label="testLabel">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getAttribute('aria-label')).to.equal('testLabel')
    })
  })

  describe('disabled prop', async () => {
    it('should disable all options', async () => {
      await mount(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions()

      expect(allOptions.length).to.equal(4) // header action + 3 options

      allOptions.forEach((option) => {
        expect(option.getAttribute('aria-disabled')).to.equal('true')
      })
    })

    it('should prevent option actions', async () => {
      await mount(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="page1option">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const page0option = await drilldown.find('#page0option')

      await page0option.click()

      const page1option = await drilldown.find('#page1option', {
        expectEmpty: true
      })

      expect(page0option).to.be.visible()
      expect(page1option).to.not.be.visible()
    })

    it('should disabled trigger, if provided', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          disabled
          trigger={<button data-test-id="toggleButton">Toggle</button>}
        >
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const toggleButton = await drilldown.find('[data-test-id="toggleButton"]')

      expect(toggleButton.getAttribute('aria-disabled')).to.equal('true')
      expect(
        (toggleButton.getDOMNode() as HTMLButtonElement).disabled
      ).to.equal(true)

      await toggleButton.click()

      const option = await drilldown.find('#page0option', { expectEmpty: true })

      expect(option).to.not.be.visible()
    })
  })

  describe('rotateFocus prop', async () => {
    it('should rotate focus in the drilldown by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option1 = await drilldown.find('#option01')
      const option2 = await drilldown.find('#option02')

      await drilldown.focus()
      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option1.getDOMNode())

      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option2.getDOMNode())

      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option1.getDOMNode())
    })

    it('should prevent focus rotation in the drilldown with "false"', async () => {
      await mount(
        <Drilldown rootPageId="page0" rotateFocus={false}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option1 = await drilldown.find('#option01')
      const option2 = await drilldown.find('#option02')

      await drilldown.focus()
      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option1.getDOMNode())

      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option2.getDOMNode())

      await drilldown.keyDown('down')

      expect(document.activeElement).to.equal(option2.getDOMNode())
    })
  })

  describe('role prop', async () => {
    it('should be "menu" by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getAttribute('role')).to.equal('menu')
    })

    it('should be apply role', async () => {
      await mount(
        <Drilldown rootPageId="page0" role="list">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getAttribute('role')).to.equal('list')
    })
  })

  describe('elementRef prop (and ref static prop)', async () => {
    it('should give back the drilldown element when there is no trigger', async () => {
      const ref = React.createRef<Drilldown>()
      const elementRef = stub()
      await mount(
        <Drilldown rootPageId="page0" elementRef={elementRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>,
        {
          props: { ref }
        }
      )

      const drilldown = await DrilldownLocator.find()

      expect(ref.current).to.be.not.null()
      expect(ref.current!.ref).to.be.eq(drilldown.getDOMNode())

      expect(elementRef).to.have.been.calledWith(drilldown.getDOMNode())
      expect(elementRef.args[0][0]).to.have.attribute('role', 'menu')
    })

    it('should give back the Popover root when drilldown has trigger and is closed', async () => {
      const ref = React.createRef<Drilldown>()
      const elementRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          elementRef={elementRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>,
        {
          props: { ref }
        }
      )

      const drilldown = await DrilldownLocator.find()
      const popoverRoot = await drilldown.findPopoverRoot()

      expect(ref.current).to.be.not.null()
      expect(ref.current!.ref).to.be.eq(popoverRoot.getDOMNode())

      expect(elementRef).to.have.been.calledWith(popoverRoot.getDOMNode())
    })

    it('should give back the the Popover root when drilldown has trigger and is open', async () => {
      const ref = React.createRef<Drilldown>()
      const elementRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          elementRef={elementRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>,
        {
          props: { ref }
        }
      )

      const drilldown = await DrilldownLocator.find()
      const popoverRoot = await drilldown.findPopoverRoot()

      expect(ref.current).to.be.not.null()
      expect(ref.current!.ref).to.be.eq(popoverRoot.getDOMNode())

      expect(elementRef).to.have.been.calledWith(popoverRoot.getDOMNode())
    })
  })

  describe('drilldownRef prop', async () => {
    it('should give back the drilldown element when there is no trigger', async () => {
      const drilldownRef = stub()
      await mount(
        <Drilldown rootPageId="page0" drilldownRef={drilldownRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldownRef).to.have.been.calledWith(drilldown.getDOMNode())
      expect(drilldownRef.args[0][0]).to.have.attribute('role', 'menu')
    })

    it("shouldn't be called when drilldown has trigger and is closed", async () => {
      const drilldownRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          drilldownRef={drilldownRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(drilldownRef).to.not.have.been.called()
    })

    it('should give back the drilldown element when drilldown has trigger and is open', async () => {
      const drilldownRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          drilldownRef={drilldownRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const drilldownMenu = await popoverContent.find('[role="menu"]')

      expect(drilldownRef).to.have.been.calledWith(drilldownMenu.getDOMNode())
    })
  })

  describe('popoverRef prop', async () => {
    it('should not be called when there is no trigger', async () => {
      const popoverRef = stub()
      await mount(
        <Drilldown rootPageId="page0" popoverRef={popoverRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(popoverRef).to.not.have.been.called()
    })

    it('should give back the Popover component when drilldown has trigger and is closed', async () => {
      const popoverRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          popoverRef={popoverRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverRoot = await drilldown.findPopoverRoot()

      expect(popoverRef).to.have.been.called()
      // Popover component's public ref prop
      expect(popoverRef.args[0][0].ref).to.equal(popoverRoot.getDOMNode())
    })

    it('should give back the Popover component when drilldown has trigger and is open', async () => {
      const popoverRef = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          popoverRef={popoverRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverRoot = await drilldown.findPopoverRoot()

      expect(popoverRef).to.have.been.called()
      // Popover component's public ref prop
      expect(popoverRef.args[0][0].ref).to.equal(popoverRoot.getDOMNode())
    })
  })

  describe('width prop', async () => {
    it('should set the width of the drilldown', async () => {
      await mount(
        <Drilldown rootPageId="page0" width="20rem">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.width).to.equal('320px')
    })

    it('should set the width of the drilldown in the popover', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          width="20rem"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const container = await popoverContent.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.width).to.equal('320px')
    })

    it('should be overruled by maxWidth prop', async () => {
      await mount(
        <Drilldown rootPageId="page0" width="20rem" maxWidth="10rem">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.width).to.equal('160px')
    })

    it('should be affected by overflowX prop', async () => {
      await mount(
        <Drilldown rootPageId="page0" width="20rem" overflowX="auto">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">
              <div style={{ whiteSpace: 'nowrap' }}>
                Option with a very long label so that it has to break
              </div>
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerNode = container.getDOMNode()
      const containerStyle = getComputedStyle(containerNode)

      expect(containerStyle.width).to.equal('320px')
      expect(containerStyle.overflowX).to.equal('auto')
      expect(containerNode.scrollWidth > containerNode.clientWidth).to.equal(
        true
      )
    })
  })

  describe('height prop', async () => {
    it('should set the height of the drilldown', async () => {
      await mount(
        <Drilldown rootPageId="page0" height="20rem">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.height).to.equal('320px')
    })

    it('should set the height of the drilldown in the popover', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          height="20rem"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const container = await popoverContent.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.height).to.equal('320px')
    })

    it('should be overruled by maxWidth prop', async () => {
      await mount(
        <Drilldown rootPageId="page0" height="20rem" maxHeight="10rem">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerStyle = getComputedStyle(container.getDOMNode())

      expect(containerStyle.height).to.equal('160px')
    })

    it('should be affected by overflowX prop', async () => {
      await mount(
        <Drilldown rootPageId="page0" height="10rem" overflowY="auto">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
            <Drilldown.Option id="option04">Option</Drilldown.Option>
            <Drilldown.Option id="option05">Option</Drilldown.Option>
            <Drilldown.Option id="option06">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const container = await drilldown.findSizableContainer()
      const containerNode = container.getDOMNode()
      const containerStyle = getComputedStyle(containerNode)

      expect(containerStyle.height).to.equal('160px')
      expect(containerStyle.overflowY).to.equal('auto')
      expect(containerNode.scrollHeight > containerNode.clientHeight).to.equal(
        true
      )
    })
  })

  describe('placement prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          popoverRef={(e) => {
            popoverRef = e
          }}
          placement={'top start'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.placement).to.equal('top start')
    })
  })

  describe('defaultShow prop', async () => {
    it('should display Popover on render', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()

      expect(popoverContent).to.be.visible()
    })
  })

  describe('show prop', async () => {
    it('should display popover', async () => {
      const onToggle = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          show
          onToggle={onToggle}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()

      expect(popoverContent).to.be.visible()
    })

    it('should give error if onToggle is not provided (controllable)', async () => {
      const consoleError = stub(console, 'error')
      await mount(
        <Drilldown rootPageId="page0" trigger={<button>Toggle</button>} show>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()

      expect(popoverContent).to.be.visible()
      expect(consoleError).to.have.been.called()
    })
  })

  describe('onFocus prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      const onFocus = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          onFocus={onFocus}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.onFocus).to.equal(onFocus)
    })
  })

  describe('onMouseOver prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      const onMouseOver = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          onMouseOver={onMouseOver}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.onMouseOver).to.equal(onMouseOver)
    })
  })

  describe('shouldContainFocus prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          shouldContainFocus={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.shouldContainFocus).to.equal(true)
    })
  })

  describe('shouldReturnFocus prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          shouldReturnFocus={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.shouldReturnFocus).to.equal(false)
    })
  })

  describe('withArrow prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          withArrow={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.withArrow).to.equal(false)
    })
  })

  describe('offsetX prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          offsetX={'2rem'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.offsetX).to.equal('2rem')
    })
  })

  describe('offsetY prop', async () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          offsetY={'2rem'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.offsetY).to.equal('2rem')
    })
  })

  describe('shouldHideOnSelect prop', async () => {
    it('should be true by default', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const option = await popoverContent.find('#option01')

      await option.click()

      expect(popoverContent).to.not.be.visible()
    })

    it('should not close on subPage nav, even if "true"', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const option = await popoverContent.find('#option01')

      await option.click()

      expect(popoverContent).to.be.visible()
      expect(await popoverContent.find('#option11')).to.be.visible()
    })

    it('should not close on Back nav, even if "true"', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const option = await popoverContent.find('#option01')

      await option.click()

      const backNav = await popoverContent.findHeaderBackOption()

      await backNav.click()

      expect(popoverContent).to.be.visible()
      expect(await popoverContent.find('#option01')).to.be.visible()
    })

    it('should prevent closing when "false"', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const popoverContent = await drilldown.findPopoverContent()
      const option = await popoverContent.find('#option01')

      await option.click()

      expect(popoverContent).to.be.visible()
      expect(option).to.be.visible()
    })
  })
})
