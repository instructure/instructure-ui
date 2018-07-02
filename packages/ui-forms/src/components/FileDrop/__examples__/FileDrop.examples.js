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
import IconFolder from '@instructure/ui-icons/lib/Line/IconFolder'
import IconImage from '@instructure/ui-icons/lib/Line/IconImage'
import IconBlueprint from '@instructure/ui-icons/lib/Line/IconBlueprint'

/* eslint-disable instructure-ui/no-relative-package-imports */
import Billboard from '../../../../../ui-billboard/lib/components/Billboard'
/* eslint-disable instructure-ui/no-relative-package-imports */
import FileDrop from '../index'

export const textAsLabel = () => {
  return (
    <FileDrop
      accept="image/*"
      onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }} // eslint-disable-line no-console
      onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }} // eslint-disable-line no-console
      label="Upload your image here"
    />
  )
}

export const componentAsLabel = () => {
  return (
    <FileDrop
      allowMultiple={false}
      accept=".pdf"
      onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }} // eslint-disable-line no-console
      onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }} // eslint-disable-line no-console
      label={
        <Billboard
          size="small"
          heading="Upload your file here"
          message="Allows only one pdf"
          hero={<IconFolder/>}
        />
      }
    />
  )
}

export const acceptsType = () => {
  return (
    <FileDrop
      allowMultiple={false}
      accept=".png"
      onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }} // eslint-disable-line no-console
      onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }} // eslint-disable-line no-console
      label={
        <Billboard
          size="medium"
          heading="Upload your Image here"
          message="Allows only one png"
          hero={<IconImage/>}
        />
      }
    />
  )
}

export const allowMultiple = () => {
  return (
    <FileDrop
      allowMultiple={true}
      accept=".pdf"
      onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }} // eslint-disable-line no-console
      onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }} // eslint-disable-line no-console
      label={
        <Billboard
          size="large"
          heading="Upload your files here"
          message="Allows more than one"
          hero={<IconBlueprint/>}
        />
      }
    />
  )
}

export const disabled = () => {
  return (
    <FileDrop
      allowMultiple={true}
      accept=".pdf"
      onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }} // eslint-disable-line no-console
      onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }} // eslint-disable-line no-console
      label={
        <Billboard
          size="medium"
          heading="Upload your files here"
          message="Allows more than one"
          hero={<IconBlueprint/>}
          disabled
        />
      }
      disabled
    />
  )
}
