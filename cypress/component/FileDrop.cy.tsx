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
import { expect } from 'chai'
import 'cypress-real-events'

import '../support/component'
import { FileDrop } from '@instructure/ui'

describe('<FileDrop/>', () => {
  describe('file-type checking when onDrop', () => {
    it('responds to drop event', async () => {
      const onDrop = cy.spy()
      cy.mount(<FileDrop renderLabel="fake label" onDrop={onDrop} />)

      cy.get('label').trigger('drop')

      cy.wrap(onDrop).should('have.been.calledWithMatch')
    })

    it('responds to change event', async () => {
      const onDrop = cy.spy()
      cy.mount(<FileDrop renderLabel="fake label" onDrop={onDrop} />)

      cy.get('input[type="file"]').trigger('change', { force: true })

      cy.wrap(onDrop).should('have.been.called')
    })

    it('accepts correct files using mimetypes', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.png', { type: 'image/png' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([file])
          expect(rejected).to.deep.equal([])
        })

      cy.wrap(onDropAccepted).should('have.been.called')
      cy.wrap(onDropRejected).should('not.have.been.called')
    })

    it('rejects incorrect files using mimetypes and shouldEnablePreview', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          shouldEnablePreview
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([])
          expect(rejected).to.deep.equal([file])
        })

      cy.wrap(onDropAccepted).should('not.have.been.called')
      cy.wrap(onDropRejected).should('have.been.called')
    })

    it('accepts correct files using mimetypes and enablePreview', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          accept="image/*"
          shouldEnablePreview
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.png', { type: 'image/png' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([file])
          expect(rejected).to.deep.equal([])
        })

      cy.wrap(onDropAccepted).should('have.been.called')
      cy.wrap(onDropRejected).should('not.have.been.called')
    })

    it('accepts correct files using extensions', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          accept="jpeg"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.jpeg', { type: 'image/jpeg' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([file])
          expect(rejected).to.deep.equal([])
        })

      cy.wrap(onDropAccepted).should('have.been.called')
      cy.wrap(onDropRejected).should('not.have.been.called')
    })

    it('rejects incorrect files using mimetypes', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([])
          expect(rejected).to.deep.equal([file])
        })

      cy.wrap(onDropAccepted).should('not.have.been.called')
      cy.wrap(onDropRejected).should('have.been.called')
    })

    it('rejects incorrect files using extensions', async () => {
      const onDrop = cy.spy()
      const onDropAccepted = cy.spy()
      const onDropRejected = cy.spy()

      cy.mount(
        <FileDrop
          renderLabel="fake label"
          accept="jpeg"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )
      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      cy.get('label').trigger('drop', { dataTransfer })

      cy.wrap(onDrop)
        .should('have.been.called')
        .then(() => {
          const { args } = onDrop.lastCall
          const accepted = args[0]
          const rejected = args[1]

          expect(accepted).to.deep.equal([])
          expect(rejected).to.deep.equal([file])
        })

      cy.wrap(onDropAccepted).should('not.have.been.called')
      cy.wrap(onDropRejected).should('have.been.called')
    })
  })

  describe('onDrag events', () => {
    it('responds to onDragEnter event', async () => {
      const onDragEnter = cy.spy()
      cy.mount(<FileDrop renderLabel="fake label" onDragEnter={onDragEnter} />)

      cy.get('label').trigger('dragenter')

      cy.wrap(onDragEnter).should('have.been.called')
    })

    it('responds to onDragOver event', async () => {
      const onDragOver = cy.spy()
      cy.mount(<FileDrop renderLabel="fake label" onDragOver={onDragOver} />)

      cy.get('label').trigger('dragover')

      cy.wrap(onDragOver).should('have.been.called')
    })

    it('responds to onDragLeave event', async () => {
      const onDragLeave = cy.spy()
      cy.mount(<FileDrop renderLabel="fake label" onDragLeave={onDragLeave} />)

      cy.get('label').trigger('dragleave')

      cy.wrap(onDragLeave).should('have.been.called')
    })
  })

  it('stops propagation when the ESC key is released and file browser is open', async () => {
    cy.mount(<FileDrop renderLabel="fake label" />)

    cy.get('label').click()
    cy.get('input').should('be.focused')

    cy.get('input').then(($input) => {
      const stopPropagationSpy = cy.spy()

      $input[0].addEventListener('keyup', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.stopPropagation = stopPropagationSpy
      })

      cy.get('input').realPress('Escape')

      cy.wrap(stopPropagationSpy).should('have.been.called')
    })
  })
})
