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

type Primitives = {
  white: string
  grey11: string
  grey12: string
  grey14: string
  grey24: string
  grey45: string
  grey57: string
  grey70: string
  grey82: string
  grey100: string
  grey125: string

  blue12: string
  blue45: string
  blue57: string
  blue70: string
  blue82: string

  green12: string
  green45: string
  green57: string
  green70: string
  green82: string

  orange12: string
  orange30: string
  orange45: string
  orange57: string
  orange70: string
  orange82: string

  red12: string
  red45: string
  red57: string
  red70: string
  red82: string
}

type Contrasts = {
  white: Primitives[keyof Primitives]
  grey11: Primitives[keyof Primitives]
  grey1214: Primitives[keyof Primitives]
  grey1424: Primitives[keyof Primitives]
  grey24: Primitives[keyof Primitives]
  grey4570: Primitives[keyof Primitives]
  grey5782: Primitives[keyof Primitives]
  grey100: Primitives[keyof Primitives]
  grey125: Primitives[keyof Primitives]

  blue12: Primitives[keyof Primitives]
  blue4570: Primitives[keyof Primitives]
  blue5782: Primitives[keyof Primitives]

  green12: Primitives[keyof Primitives]
  green4570: Primitives[keyof Primitives]
  green5782: Primitives[keyof Primitives]

  orange12: Primitives[keyof Primitives]
  orange3045: Primitives[keyof Primitives]
  orange4570: Primitives[keyof Primitives]
  orange5782: Primitives[keyof Primitives]

  red12: Primitives[keyof Primitives]
  red4570: Primitives[keyof Primitives]
  red5782: Primitives[keyof Primitives]
}

type ThemedContrasts = {
  white: Primitives[keyof Primitives]
  grey11: Primitives[keyof Primitives]
  grey1214: Primitives[keyof Primitives]
  grey1424: Primitives[keyof Primitives]
  grey24: Primitives[keyof Primitives]
  grey4570: Primitives[keyof Primitives]
  grey5782: Primitives[keyof Primitives]
  grey100: Primitives[keyof Primitives]
  grey125: Primitives[keyof Primitives]

  blue12: Primitives[keyof Primitives]
  blue4570: Primitives[keyof Primitives]
  blue5782: Primitives[keyof Primitives]

  green12: Primitives[keyof Primitives]
  green4570: Primitives[keyof Primitives]
  green5782: Primitives[keyof Primitives]

  orange12: Primitives[keyof Primitives]
  orange3045: Primitives[keyof Primitives]
  orange4570: Primitives[keyof Primitives]
  orange5782: Primitives[keyof Primitives]

  red12: Primitives[keyof Primitives]
  red4570: Primitives[keyof Primitives]
  red5782: Primitives[keyof Primitives]
}

type Colors = {
  primitives: Primitives
  contrasts: ThemedContrasts
}

export type { Colors, Primitives, Contrasts, ThemedContrasts }
