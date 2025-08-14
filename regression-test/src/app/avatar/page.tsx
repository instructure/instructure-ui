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
import { Avatar as avv } from 'instructure-ui/ui-avatar/es/index'
import {
  IconGroupLine as igl,
  IconAiSolid
} from 'instructure-ui/ui-icons/es/index'

const Avatar = avv as any
const IconGroupLine = igl as any

export default function AvatarPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div>
        <Avatar
          name="Sarah Robinson"
          src="/assets/avatarSquare.jpg"
          margin="0 space8 0 0"
        />
        <Avatar name="Sarah Robinson" margin="0 space8 0 0" />
        <Avatar
          name="Sarah Robinson"
          renderIcon={<IconGroupLine />}
          margin="0 space8 0 0"
        />
        <Avatar
          name="Kyle Montgomery"
          src="/assets/avatarSquare.jpg"
          shape="rectangle"
          margin="0 space8 0 0"
        />
        <Avatar
          name="Kyle Montgomery"
          shape="rectangle"
          margin="0 space8 0 0"
        />
        <Avatar
          name="Kyle Montgomery"
          renderIcon={<IconGroupLine />}
          shape="rectangle"
        />
      </div>
      <div>
        <Avatar
          size="xx-small"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar
          size="x-small"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar
          size="small"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar
          size="medium"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar
          size="large"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar
          size="x-large"
          color="ai"
          renderIcon={IconAiSolid}
          margin="0 space8 0 0"
        />
        <Avatar size="xx-large" color="ai" renderIcon={IconAiSolid} />
      </div>
      <div>
        <Avatar name="Arthur C. Clarke" margin="0 space8 0 0" />
        <Avatar name="James Arias" color="shamrock" margin="0 space8 0 0" />
        <Avatar name="Charles Kimball" color="barney" margin="0 space8 0 0" />
        <Avatar name="Melissa Reed" color="crimson" margin="0 space8 0 0" />
        <Avatar name="Heather Wheeler" color="fire" margin="0 space8 0 0" />
        <Avatar name="David Herbert" color="licorice" margin="0 space8 0 0" />
        <Avatar name="Isaac Asimov" color="ash" />
      </div>
      <div>
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Arthur C. Clarke"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="James Arias"
          color="shamrock"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Charles Kimball"
          color="barney"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Melissa Reed"
          color="crimson"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Heather Wheeler"
          color="fire"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="David Herbert"
          color="licorice"
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Isaac Asimov"
          color="ash"
        />
      </div>
      <div>
        <Avatar name="Arthur C. Clarke" hasInverseColor margin="0 space8 0 0" />
        <Avatar
          name="James Arias"
          color="shamrock"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          name="Charles Kimball"
          color="barney"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          name="Melissa Reed"
          color="crimson"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          name="Heather Wheeler"
          color="fire"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          name="David Herbert"
          color="licorice"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar name="Isaac Asimov" color="ash" hasInverseColor />
      </div>
      <div>
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Arthur C. Clarke"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="James Arias"
          color="shamrock"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Charles Kimball"
          color="barney"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Melissa Reed"
          color="crimson"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Heather Wheeler"
          color="fire"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="David Herbert"
          color="licorice"
          hasInverseColor
          margin="0 space8 0 0"
        />
        <Avatar
          renderIcon={<IconGroupLine />}
          name="Isaac Asimov"
          color="ash"
          hasInverseColor
        />
      </div>
      <div>
        <Avatar
          name="Isaac Asimov"
          renderIcon={<IconGroupLine />}
          themeOverride={{ color: '#efb410' }}
          margin="0 space8 0 0"
        />
        <Avatar
          name="Heather Wheeler"
          color="fire"
          themeOverride={{ colorFire: 'magenta' }}
          margin="0 space8 0 0"
        />
        <Avatar
          name="Charles Kimball"
          renderIcon={<IconGroupLine />}
          hasInverseColor
          themeOverride={{ color: 'lightblue', background: 'black' }}
          margin="0 space8 0 0"
        />
        <Avatar
          name="David Herbert"
          hasInverseColor
          color="fire"
          themeOverride={{ colorFire: '#013410' }}
        />
      </div>
      <div>
        <Avatar
          name="Sarah Robinson"
          src="/assets/avatarSquare.jpg"
          margin="0 space8 0 0"
          showBorder="always"
        />
        <Avatar
          name="Sarah Robinson"
          renderIcon={<IconGroupLine />}
          margin="0 space8 0 0"
          showBorder="never"
        />
      </div>
    </main>
  )
}
