export default function warn () {
  if (process.env.NODE_ENV !== 'production') {
    console.warn.apply(undefined, arguments) // eslint-disable-line no-console
  }
}
