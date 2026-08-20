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
import { ComponentClass, forwardRef } from 'react'
import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { decorator } from '@instructure/ui-decorator'
import { useDeterministicId } from './useDeterministicId.js'

import type { InstUIComponent } from '@instructure/shared-types'
import { warn } from '@instructure/console'

declare const process: Record<string, any> | undefined

type WithDeterministicIdProps = {
  deterministicId?: (instanceName?: string) => string
}
/**
 * This decorator injects a `deterministicId` prop into the decorated class,
 * used to generate SSR-safe, hydration-stable ids.
 *
 * It is backed by React's built-in {@link https://react.dev/reference/react/useId `useId`},
 * which produces the same id on the server and the client for a given position
 * in the React tree, so ids no longer rely on a global instance counter. The
 * injected `deterministicId(instanceName?)` function may be called multiple
 * times with distinct `instanceName` values to derive several unique, stable
 * ids from the same component instance.
 *
 * Note: for apps that mount more than one independent React root on the same
 * page (including module federation), pass a distinct `identifierPrefix` to each
 * `createRoot`/`hydrateRoot` call so ids stay unique across roots.
 * Read more about it here: [SSR guide](https://instructure.design/#server-side-rendering)
 */
const withDeterministicId = decorator((ComposedComponent: InstUIComponent) => {
  type Props = PropsWithoutRef<Record<string, unknown>> & RefAttributes<any>
  const WithDeterministicId: ForwardRefExoticComponent<Props> & {
    originalType?: ComponentClass
  } = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
    const componentName =
      ComposedComponent.componentId ||
      ComposedComponent.displayName ||
      ComposedComponent.name
    const deterministicId = useDeterministicId(componentName)

    if (props.deterministicId) {
      warn(
        false,
        `Manually passing the "deterministicId" property is not allowed on the ${componentName} component.\n`,
        props.deterministicId
      )
    }

    return (
      <ComposedComponent
        ref={ref}
        deterministicId={deterministicId}
        {...props}
      />
    )
  })

  hoistNonReactStatics(WithDeterministicId, ComposedComponent)

  // These static fields exist on InstUI components
  //@ts-expect-error fix this
  WithDeterministicId.allowedProps = ComposedComponent.allowedProps

  // added so it can be tested with ReactTestUtils
  // more info: https://github.com/facebook/react/issues/13455
  WithDeterministicId.originalType =
    ComposedComponent.originalType || ComposedComponent

  if (
    typeof process !== 'undefined' &&
    process?.env?.NODE_ENV !== 'production'
  ) {
    WithDeterministicId.displayName = `WithDeterministicId(${ComposedComponent.displayName})`
  }

  return WithDeterministicId
})

export default withDeterministicId
export { withDeterministicId }
export type { WithDeterministicIdProps }
