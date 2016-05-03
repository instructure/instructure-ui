export default function capitalizeFirstLetter (word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word
}
