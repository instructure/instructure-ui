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
import { Modal } from '@instructure/ui'

const MODAL_IUI = () => {
  return (
    <Modal
      open={true}
      onDismiss={() => {}}
      onSubmit={() => {}}
      size="auto"
      label="Modal Dialog: Hello World"
      shouldCloseOnDocumentClick
    >
      <Modal.Header>
        <h2 style={{ margin: 0 }}>Hello World</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Lorem Ipsum</p>
      </Modal.Body>
      <Modal.Footer>
        <button>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default MODAL_IUI
