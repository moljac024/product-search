export const scase = (input, cases) => {
  if (input in cases) {
    return cases[input]
  } else if ('default' in cases) {
    return cases.default
  } else {
    return null
  }
}
