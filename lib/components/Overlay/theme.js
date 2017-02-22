export default function ({ stacking }) {
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: stacking.topmost
  }
}
