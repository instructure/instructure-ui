import { shape, arrayOf, objectOf, string, func, object } from 'prop-types'

export const component = shape({
  name: string,
  doc: object,
  path: string,
  generateTheme: func
})

export const componentList = arrayOf(component)
export const componentMap = objectOf(component)
export const componentsByCategory = objectOf(componentList)

export const doc = shape({
  name: string,
  title: string,
  html: string
})

export const docList = arrayOf(doc)
export const docMap = objectOf(doc)

export const library = shape({
  name: string,
  description: string,
  version: string,
  repository: string,
  homepage: string,
  author: string
})
