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

'use client'
import React from 'react'
import {
  FileDrop as fd,
  View as vw,
  Heading as hd,
  Text as tx,
  Billboard as bb,
  Flex as fl,
  IconModuleLine as iml,
  IconUploadSolid as ius,
  IconVideoLine as ivl,
  IconImageLine as iil,
  IconAnnotateLine as ial,
  IconPdfLine as ipfl
} from '@instructure/ui/latest'

const FileDrop = fd as any
const View = vw as any
const Heading = hd as any
const Text = tx as any
const Billboard = bb as any
const Flex = fl as any

const IconModuleLine = iml as any
const IconUploadSolid = ius as any
const IconVideoLine = ivl as any
const IconImageLine = iil as any
const IconAnnotateLine = ial as any
const IconPdfLine = ipfl as any

export default function FileDropPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <div style={{ display: 'flex', gap: '1rem' }}>
        <FileDrop
          accept="image/*"
          renderLabel={
            <View as="div" padding="xx-large large" background="primary">
              <IconModuleLine size="large" />
              <Heading>Drop files here to add them to module</Heading>
              <Text color="brand">
                Drag and drop, or click to browse your computer
              </Text>
            </View>
          }
        />

        <FileDrop
          renderLabel={
            <Billboard
              heading="Upload your image"
              message="Drag and drop, or click to browse your computer"
              hero={<IconImageLine />}
            />
          }
          interaction="disabled"
        />
      </div>

      {/* Accept examples (README Accept section) */}
      <View display="block">
        <FileDrop
          accept=".csv"
          renderLabel={
            <View
              background="secondary"
              as="div"
              textAlign="center"
              padding="x-large large"
            >
              <IconUploadSolid />
              <Text as="div" weight="bold">
                Upload document
              </Text>
              <Text>Drag and drop or browse your files</Text>
              <Text size="small" as="div" lineHeight="double">
                A single CSV document
              </Text>
            </View>
          }
          display="inline-block"
          width="22rem"
          margin="x-small"
        />
        <FileDrop
          accept="video/*"
          renderLabel={
            <Billboard
              size="small"
              message="All video file types"
              hero={<IconVideoLine />}
            />
          }
          display="inline-block"
          width="11rem"
          margin="x-small"
        />
        <FileDrop
          accept=".jpg"
          messages={[{ text: 'Invalid file type', type: 'error' }]}
          renderLabel={
            <Billboard
              size="small"
              message="Only .jpg files"
              hero={<IconImageLine />}
            />
          }
          maxWidth="15rem"
          margin="0 auto"
        />
      </View>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <FileDrop
          shouldAllowMultiple
          renderLabel={
            <View
              as="div"
              textAlign="center"
              padding="large"
              margin="large 0 0 0"
            >
              <IconAnnotateLine color="brand" size="large" />
              <Text as="div" color="brand">
                Drag and Drop or Click to Browser your Computer
              </Text>
            </View>
          }
          width="18rem"
          height="16rem"
          margin="x-small"
        />

        {/* height="100%" container (README height Property) */}
        <div style={{ height: '20rem' }}>
          <FileDrop
            height="100%"
            renderLabel={
              <Flex
                direction="column"
                height="100%"
                alignItems="center"
                justifyItems="center"
              >
                <Flex.Item padding="small">
                  <IconPdfLine size="large" />
                </Flex.Item>
                <Flex.Item padding="small">
                  <Text size="large">
                    Drag and Drop or Click to Browser your Computer
                  </Text>
                </Flex.Item>
                <Flex.Item padding="small">
                  <Text color="secondary" size="small">
                    Accepted File Type is PDF
                  </Text>
                </Flex.Item>
              </Flex>
            }
          />
        </div>
      </div>
    </main>
  )
}
