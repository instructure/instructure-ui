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

import { useTheme } from '@emotion/react'

/**
 * ---
 * category: utilities/themes
 * ---
 * A hook that returns the fully resolved theme object from the context, with all token layers evaluated.
 *
 * The raw `newTheme` stored on the context exposes its layers as functions
 * that depend on the previous layer (`semantics` takes `primitives`,
 * `components` and `sharedTokens` take `semantics`). This hook runs those
 * functions for you and returns the computed values, so you can read
 * tokens directly without having to know the evaluation order.
 *
 * @returns An object containing the computed `primitives`, `semantics`,
 *          `components` and `sharedTokens` of the current theme.
 */
export const useComputedTheme = () => {
    const rawTheme = (useTheme() as any).newTheme

    const primitives = rawTheme?.primitives
    const semantics = rawTheme?.semantics?.(primitives)
    const components = Object.keys(rawTheme?.components).reduce(
        (acc, component) => ({
            ...acc,
            [component]: rawTheme.components[component]?.(semantics)
        }),
        {}
    )
    const sharedTokens = rawTheme?.sharedTokens?.(semantics)

    return {
        primitives,
        semantics,
        components,
        sharedTokens
    }
}