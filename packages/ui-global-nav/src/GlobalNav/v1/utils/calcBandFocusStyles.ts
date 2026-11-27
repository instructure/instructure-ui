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

/**
 * ---
 * private: true
 * ---
 * Returns the focus ring of the nav items: a 2px band 1px outside the item and a 2px band 1px
 * inside it. Each theme colors a different band, so calcFocusOutlineStyles, which draws one ring,
 * can't take these tokens.
 */
const calcBandFocusStyles = (outerColor: string, innerColor: string) => ({
  position: 'relative' as const,
  outlineStyle: 'solid',
  outlineWidth: '0.125rem',
  outlineOffset: '0.0625rem',
  outlineColor: 'transparent',
  transition: 'outline-color 0.2s',
  // forced colors mode draws even a transparent outline, so there the ring only exists on focus
  '@media (forced-colors: active)': {
    outlineStyle: 'none'
  },
  // an element has one outline, so the inner band is a layer with an inset box-shadow
  '&::after': {
    content: '""',
    position: 'absolute' as const,
    inset: '0.0625rem',
    borderRadius: 'inherit',
    boxShadow: 'inset 0 0 0 0.125rem transparent',
    transition: 'box-shadow 0.2s',
    pointerEvents: 'none' as const
  },
  '&:focus': {
    outlineColor: outerColor,
    '&::after': {
      boxShadow: `inset 0 0 0 0.125rem ${innerColor}`
    },
    // forced colors mode drops the inner band's box-shadow, so the outline is the whole ring there
    '@media (forced-colors: active)': {
      outlineStyle: 'solid'
    }
  }
})

export default calcBandFocusStyles
export { calcBandFocusStyles }
