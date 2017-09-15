import getDisplayName from './getDisplayName'

export default function matchComponentTypes (componentInstance, types = []) {
  if (componentInstance && componentInstance.type) {
    const displayNames = types.map((type) => getDisplayName(type))
    return displayNames.indexOf(getDisplayName(componentInstance.type)) >= 0
  } else {
    return false
  }
}
