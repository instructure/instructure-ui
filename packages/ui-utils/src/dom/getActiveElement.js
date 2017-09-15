export default function getActiveElement (doc) {
  try {
    return (doc || document).activeElement
  } catch (e) { /* ie throws if no active element */ }
}
