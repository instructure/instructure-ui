import React from 'react'
import type { Renderable } from '@instructure/shared-types'
import { InstUIIconOwnProps } from '../wrapLucideIcon/props'
/**
 * Renders an icon wrapped in IconPropsProvider to apply size and color via React context.
 * Handles both component references and React elements.
 *
 * @param icon - The icon to render (component reference or React element)
 * @param size - Semantic size token (e.g., 'xs', 'sm', 'md', 'lg', 'xl', '2xl').
 * @param color - Semantic color token (e.g., 'baseColor', 'errorColor', 'ai').
 * @returns Icon element wrapped in IconPropsProvider context
 */
declare function renderIconWithProps(
  icon: Renderable,
  size: InstUIIconOwnProps['size'],
  color: InstUIIconOwnProps['color']
): React.ReactElement
export { renderIconWithProps }
//# sourceMappingURL=renderIconWithProps.d.ts.map
