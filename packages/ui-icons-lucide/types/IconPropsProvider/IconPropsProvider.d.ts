import type { InstUIIconOwnProps } from '../wrapLucideIcon/props'
type IconPropsContextValue = Pick<InstUIIconOwnProps, 'size' | 'color'>
type IconPropsProviderProps = React.PropsWithChildren<IconPropsContextValue>
declare const IconPropsProvider: React.FC<IconPropsProviderProps>
export { IconPropsProvider }
export type { IconPropsContextValue }
//# sourceMappingURL=IconPropsProvider.d.ts.map
