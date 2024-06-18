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
import {
  Dialog,
  View,
  Button,
  CloseButton,
  Portal,
  Mask,
  FormFieldGroup,
  TextInput,
  Heading
} from '@instructure/ui'
import React, { useState } from 'react'

const DIALOG_IUI = () => {
  const [open, setOpen] = useState(false)
  let _firstName = null

  return (
    <View as="div" padding="large">
      <Button onClick={() => setOpen(true)}>Open the Dialog</Button>
      <Portal open={open}>
        <Mask>
          <Dialog
            open={open}
            shouldContainFocus
            defaultFocusElement={() => _firstName}
            shouldReturnFocus
            onDismiss={() => setOpen(false)}
          >
            <View
              as="div"
              maxWidth="40rem"
              maxHeight="30rem"
              background="primary"
              shadow="above"
              style={{ position: 'relative' }}
              padding="medium"
            >
              <CloseButton
                placement="end"
                onClick={() => setOpen(false)}
                screenReaderLabel="Close"
              />
              <FormFieldGroup
                description={
                  <Heading level="h4" as="span">
                    Full name
                  </Heading>
                }
                layout="columns"
              >
                <TextInput
                  width="12rem"
                  renderLabel="First"
                  inputRef={(c) => (_firstName = c)}
                />
                <TextInput width="12rem" renderLabel="Last" />
              </FormFieldGroup>
            </View>
          </Dialog>
        </Mask>
      </Portal>
    </View>
  )
}

export default DIALOG_IUI
