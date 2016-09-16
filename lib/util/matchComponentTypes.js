import getDisplayName from './getDisplayName'

export default function matchComponentTypes (componentInstance, types = []) {
  const displayNames = types.map((type) => getDisplayName(type))
  return componentInstance && displayNames.indexOf(getDisplayName(componentInstance.type)) >= 0
}
