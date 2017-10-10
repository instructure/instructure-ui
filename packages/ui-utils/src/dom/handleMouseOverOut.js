import contains from './contains'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Simple implementation of mouseEnter and mouseLeave.
 * React's built version is broken: https://github.com/facebook/react/issues/4251
 * for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
 * from one child element to another.
 *
 * @param handler {function} Callback function for handling the event
 * @param event {Event} The DOM Event that was fired
 */
export default function handleMouseOverOut (handler, event) {
  const target = event.currentTarget
  const related = event.relatedTarget || event.nativeEvent.toElement

  if (!related || (related !== target && !contains(target, related))) {
    handler(event)
  }
}
