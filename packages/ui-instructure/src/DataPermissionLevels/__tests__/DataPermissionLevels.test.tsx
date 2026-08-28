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
import { render } from 'vitest-browser-react'
import { describe, it, expect } from 'vitest'
import { DataPermissionLevels } from '@instructure/ui-instructure/latest'

describe('<DataPermissionLevels/>', () => {
  const props = {
    modalLabel: 'Data permission levels modal',
    title: 'Data Permission Levels',
    currentFeatureText: 'Current Feature:',
    currentFeature: 'Feature name',
    closeButtonText: 'Close',
    closeIconButtonScreenReaderLabel: 'Close',
    triggerText: 'Permission Levels',
    data: [
      {
        level: 'LEVEL 1',
        title: 'Descriptive Analytics and Research',
        description: 'We leverage anonymized aggregate data.',
        highlighted: true
      }
    ]
  }

  describe('trigger', () => {
    it('should render as a button that announces it opens a dialog', async () => {
      await render(<DataPermissionLevels {...props} />)

      const trigger = document.querySelector('button')

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveTextContent(props.triggerText)
    })

    it('should render an icon after the trigger text', async () => {
      await render(<DataPermissionLevels {...props} />)

      const icon = document.querySelector('button svg')

      expect(icon).toBeInTheDocument()
      // the icon is a suffix cue, so the label text must directly precede it
      expect(icon!.parentElement!.previousSibling?.textContent).toBe(
        props.triggerText
      )
    })

    it('should keep the icon decorative so it does not alter the accessible name', async () => {
      await render(<DataPermissionLevels {...props} />)

      const icon = document.querySelector('button svg')

      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
