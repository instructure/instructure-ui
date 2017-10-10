/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Get the active element of the specified document
 *
 * @param {DomNode} doc - document by default or user specified doc
 * @throws Will throw an error in ie if no active element
 * @return {DomNode} the active element
 */
export default function getActiveElement (doc) {
  try {
    return (doc || document).activeElement
  } catch (e) { /* ie throws if no active element */ }
}
