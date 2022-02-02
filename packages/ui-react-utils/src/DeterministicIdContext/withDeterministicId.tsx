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
import React, {
  forwardRef,
  PropsWithoutRef,
  RefAttributes,
  useContext
} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { DeterministicIdContext } from './DeterministicIdContext'
import { decorator } from '@instructure/ui-decorator'
import { generateId } from '@instructure/ui-utils'

import type { InstUIComponent } from '@instructure/shared-types'
import { warn } from '@instructure/console'

type WithDeterministicIdProps = {
  deterministicId?: (instanceName?: string) => string
}
/**
 * This decorator is used to enable the decorated class to use the `DeterministicIdContext` which is needed
 * for deterministic id generation.
 *
 * The context is there for the users to pass an `instanceCounterMap` Map which is then used
 * in the child components to deterministically create ids for them based on the `instanceCounterMap`.
 * Read more about it here: [SSR guide](/#server-side-rendering)
 */
const withDeterministicId = decorator((ComposedComponent: InstUIComponent) => {
  type Props = PropsWithoutRef<Record<string, unknown>> & RefAttributes<any>
  const WithDeterministicId = forwardRef(
    (props: Props, ref: React.ForwardedRef<any>) => {
      const componentName =
        ComposedComponent.componentId ||
        ComposedComponent.displayName ||
        ComposedComponent.name
      const instanceCounterMap = useContext(DeterministicIdContext)
      const deterministicId = (instanceName = componentName) =>
        generateId(instanceName, instanceCounterMap)

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
    }
  )

  hoistNonReactStatics(WithDeterministicId, ComposedComponent)

  // we have to pass these on, because sometimes users
  // access propTypes of the component in other components
  // eslint-disable-next-line react/forbid-foreign-prop-types
  WithDeterministicId.propTypes = ComposedComponent.propTypes
  WithDeterministicId.defaultProps = ComposedComponent.defaultProps

  // These static fields exist on InstUI components
  //@ts-expect-error fix this
  WithDeterministicId.allowedProps = ComposedComponent.allowedProps

  if (process.env.NODE_ENV !== 'production') {
    WithDeterministicId.displayName = `WithDeterministicId(${ComposedComponent.displayName})`
  }

  return WithDeterministicId
})

export default withDeterministicId
export { withDeterministicId }
export type { WithDeterministicIdProps }
