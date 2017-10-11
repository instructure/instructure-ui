/**
* ---
* parent: Autocomplete
* ---
*/
export default function getOptionId (option) {
  if (typeof option === 'string') {
    return option
  }

  if (!option || typeof option !== 'object') {
    return null
  }

  if (option.id !== undefined && option.id !== null) {
    return option.id
  }

  if (option.value !== undefined && option.value !== null) {
    return option.value
  }

  return null
}
