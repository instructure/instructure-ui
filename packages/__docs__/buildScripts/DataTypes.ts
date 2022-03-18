/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Buffer } from 'buffer'

// This is the format of the saved JSON files
type ProcessedFile = ParsedCodeData &
  YamlMetaInfo &
  PackagePathData & { id: string; title: string }

type PackagePathData = {
  extension: string
  esPath: string
  relativePath: string
  packageName: string
  requirePath: string
  requireStr: string
  srcPath: string
  srcUrl: string
}

// YAML descriptions exported with gray-matter
type YamlMetaInfo = {
  experimental?: boolean
  category?: string
  describes?: string
  description: string
  id?: string
  isWIP?: boolean
  order?: string
  parent?: string
  // if true it won't be included in the docs
  private: boolean
  tags?: string
}

// this is parsed by getReactDoc/getJSDoc
type ParsedCodeData = {
  // these are from JSDoc
  // it can have Buffer type only during parsing
  description?: string | Buffer
  displayName?: string
  kind?: string
  //TODO This seems always be empty, remove it (added via JSDoc)
  sections?: any[]
  undocumented?: boolean
  params?: {
    description?: string
    defaultValue?: string | number | boolean
    name: string
    type?: { names: string[] }
    optional?: boolean
  }
  returns?: JSDocFunctionReturns[]
  // these are from https://github.com/reactjs/react-docgen/blob/main/src/Documentation.ts
  props?: Record<string, PropDescriptor>
  context?: Record<string, PropDescriptor>
  childContext?: Record<string, PropDescriptor>
  composes?: string[]
  methods?: MethodDescriptor[] // TODO seems always empty, processFile filters all out
}

type JSDocFunctionReturns = {
  description: string
  type: {
    names: string[]
  }
}

interface MethodParameter {
  name: string
  type?: TypeDescriptor | null
  optional?: boolean
}

interface MethodReturn {
  type: TypeDescriptor | undefined
}

type MethodModifier = 'static' | 'generator' | 'async' | 'get' | 'set'

interface MethodDescriptor {
  name: string
  description?: string | null
  docblock: string | null
  modifiers: MethodModifier[]
  params: MethodParameter[]
  returns: MethodReturn | null
}

interface PropDescriptor {
  type?: PropTypeDescriptor
  flowType?: TypeDescriptor
  tsType?: TypeDescriptor<TSFunctionSignatureType>
  required?: boolean
  defaultValue?: any
  description?: string
}

interface PropTypeDescriptor {
  name:
    | 'arrayOf'
    | 'custom'
    | 'enum'
    | 'array'
    | 'bool'
    | 'func'
    | 'number'
    | 'object'
    | 'string'
    | 'any'
    | 'element'
    | 'node'
    | 'symbol'
    | 'objectOf'
    | 'shape'
    | 'exact'
    | 'union'
    | 'elementType'
    | 'instanceOf'
  value?: any
  raw?: string
  computed?: boolean
  // These are only needed for shape/exact types.
  // Consider consolidating PropTypeDescriptor and PropDescriptor
  description?: string
  required?: boolean
}

type TypeDescriptor<T = FunctionSignatureType> =
  | SimpleType
  | LiteralType
  | ElementsType<T>
  | ObjectSignatureType<T>
  | T

interface SimpleType extends BaseType {
  name: string
  raw?: string
}

interface LiteralType extends BaseType {
  name: 'literal'
  value: string
}

interface ElementsType<T = FunctionSignatureType> extends BaseType {
  name: string
  raw: string
  elements: Array<TypeDescriptor<T>>
}

interface FunctionArgumentType<T> {
  name: string
  type?: TypeDescriptor<T>
  rest?: boolean
}

interface FunctionSignatureType extends BaseType {
  name: 'signature'
  type: 'function'
  raw: string
  signature: {
    arguments: Array<FunctionArgumentType<FunctionSignatureType>>
    return: TypeDescriptor
  }
}

interface TSFunctionSignatureType extends FunctionSignatureType {
  signature: {
    arguments: Array<FunctionArgumentType<TSFunctionSignatureType>>
    return: TypeDescriptor<TSFunctionSignatureType>
    this?: TypeDescriptor<TSFunctionSignatureType>
  }
}

interface ObjectSignatureType<T = FunctionSignatureType> extends BaseType {
  name: 'signature'
  type: 'object'
  raw: string
  signature: {
    properties: Array<{
      key: string | TypeDescriptor<T>
      value: TypeDescriptor<T>
    }>
    constructor?: TypeDescriptor<T>
  }
}

interface BaseType {
  required?: boolean
  nullable?: boolean
  alias?: string
}
// end react-docgen part

type LibraryOptions = {
  name: string
  version: string
  repository: string
  author: string
  packages: 'packages'
  scope: '@instructure'
  codepen: {
    js_external: string
  }
}

type Section = {
  docs: string[]
  sections: string[]
  level: number
  title?: string
}

export type ParsedDoc = {
  // This holds the navigation menu structure
  sections: Record<string, Section>
  // This holds what children page(s) does a component have. For example `Grid`'s
  // children are `Grid.Col` and `Grid.Row`
  parents: Record<string, { children: string[] }>
  // The description of every component. Keys are component names, e.g. "Tag".
  // Taken from the "describes" field of Readme.md-s
  descriptions: Record<string, string>
  // Hold minimal information about each document that is needed for search
  // functionality
  docs: Record<
    string,
    {
      title: string
      order?: string
      category?: string
      isWIP?: boolean
      tags?: string
    }
  >
}

type IconGlyph = {
  name: string
  variant: any
  glyphName: string
  deprecated: boolean
}

type IconFormat = {
  format: 'React' | 'SVG' | 'Font'
  glyphs: Record<string, IconGlyph>
  packageName: string
  requirePath: string
}

type MainIconsData = {
  packageName: string
  formats: Record<'icons-svg' | `icons-react` | 'icons-font', IconFormat>
}

type MainDocsData = {
  themes: Record<string, { resource: any; requirePath: string }>
  library: LibraryOptions
} & ParsedDoc

export type {
  ProcessedFile,
  PackagePathData,
  YamlMetaInfo,
  ParsedCodeData,
  JSDocFunctionReturns,
  PropDescriptor,
  MethodDescriptor,
  MethodParameter,
  MethodReturn,
  TypeDescriptor,
  TSFunctionSignatureType,
  SimpleType,
  LiteralType,
  ElementsType,
  ObjectSignatureType,
  BaseType,
  LibraryOptions,
  IconFormat,
  IconGlyph,
  MainDocsData,
  MainIconsData
}
