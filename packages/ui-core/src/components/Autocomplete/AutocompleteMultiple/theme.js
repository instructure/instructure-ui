export default function generator ({ spacing }) {
  return {
    tagTopMargin: spacing.xxxSmall,
    tagStartMargin: spacing.xxSmall
  }
}

generator.canvas = function (variables) {
  return {}
}
