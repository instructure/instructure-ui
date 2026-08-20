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

import { Component, StrictMode } from 'react'
import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { act } from 'react'
import { describe, it, expect, vi } from 'vitest'

import { useDeterministicId, withDeterministicId } from '../index.js'
import type { WithDeterministicIdProps } from '../DeterministicIdContext'

// A function component that uses the hook and generates several ids.
const HookComponent = () => {
  const getId = useDeterministicId('HookComponent')
  const id = getId()
  const labelId = getId('HookComponent-label')
  return (
    <div id={id}>
      <label id={labelId} htmlFor={id}>
        Label
      </label>
      <input id={id} aria-describedby={labelId} />
    </div>
  )
}

// A class component that uses the decorator-injected prop.
@withDeterministicId()
class ClassComponent extends Component<WithDeterministicIdProps> {
  render() {
    const id = this.props.deterministicId!()
    const messagesId = this.props.deterministicId!('ClassComponent-messages')
    return (
      <div id={id} aria-describedby={messagesId}>
        <span id={messagesId}>messages</span>
      </div>
    )
  }
}

const App = (): ReactElement => (
  <div>
    <HookComponent />
    <HookComponent />
    <ClassComponent />
    <ClassComponent />
  </div>
)

/**
 * Renders `tree` to an HTML string (the "server"), places it in a container,
 * then hydrates the same tree (the "client") and returns any console.error
 * calls captured during hydration. React logs hydration id/markup mismatches
 * via console.error, so an empty list means server and client ids matched.
 */
async function hydrateAndCollectErrors(tree: ReactElement): Promise<string[]> {
  const html = renderToString(tree)
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  const errors: string[] = []
  const spy = vi
    .spyOn(console, 'error')
    .mockImplementation((...args: unknown[]) => {
      errors.push(args.map(String).join(' '))
    })

  try {
    await act(async () => {
      hydrateRoot(container, tree)
    })
  } finally {
    spy.mockRestore()
    document.body.removeChild(container)
  }
  return errors
}

describe('deterministic id SSR/hydration', () => {
  it('hydrates hook and decorator components without id mismatch warnings', async () => {
    const errors = await hydrateAndCollectErrors(<App />)

    const mismatches = errors.filter((e) =>
      /hydrat|did not match|server rendered|mismatch/i.test(e)
    )
    expect(mismatches).toEqual([])
  })

  it('hydrates without warnings under StrictMode (double render is stable)', async () => {
    const errors = await hydrateAndCollectErrors(
      <StrictMode>
        <App />
      </StrictMode>
    )

    const mismatches = errors.filter((e) =>
      /hydrat|did not match|server rendered|mismatch/i.test(e)
    )
    expect(mismatches).toEqual([])
  })
})
