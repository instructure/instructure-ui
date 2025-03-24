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

// This is the format of the saved JSON files
import { Documentation } from 'react-docgen'
import { BaseTheme } from '@instructure/shared-types'

type ProcessedFile =
  Documentation &
  YamlMetaInfo &
  JsDocResult &
  PackagePathData &
  { title: string, id:string }

type PackagePathData = {
  extension: string
  esPath: string
  relativePath: string
  packageName: string
  requirePath: string
  requireStr: string
  srcPath: string
  srcUrl: string
  themeUrl?: string
  themePath?: string
}

// YAML descriptions exported with gray-matter
type YamlMetaInfo = {
  category?: string
  describes?: string
  description: string
  id?: string
  title?: string
  isWIP?: boolean
  order?: string
  parent?: string
  // if true it won't be included in the docs
  private: boolean
  tags?: string
}

type JsDocResult = {
  // the comment section above the function
  comment?: string,
  // metadata about the parsed file like filename
  meta?: any,
  // the comment without the comment characters ("/*" etc)
  description?: string,
  kind?: string,
  name?: string,
  // function params. undefined if the comment is e.g. above imports
  params?: {
    description?: string
    defaultValue?: string | number | boolean
    name: string
    type?: { names: string[] }
    optional?: boolean
  }[],
  // function return value. undefined if the comment is e.g. above imports
  returns?: JSDocFunctionReturns[],
  //e.g. "module:debounce", "module:FocusRegion"
  longname: string,
  access?: string,
  undocumented?: boolean,
  title?: string
}

type JSDocFunctionReturns = {
  description: string
  type: {
    names: string[]
  }
}

type LibraryOptions = {
  name: string
  version: string
  repository: string
  author: string
  packages: 'packages'
  scope: '@instructure'
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
  docs: ParsedDocSummary
}

export type ParsedDocSummary = Record<string,{
  title: string
  order?: string
  category?: string
  isWIP?: boolean
  tags?: string
}>

type Glyph = {
  bidirectional: boolean
  lineSrc: string
  solidSrc: string
  name: string
  glyphName: string
}

type MainIconsData = {
  glyphs: Glyph[]
}

type MainDocsData = {
  themes: Record<string, { resource: BaseTheme; requirePath: string }>
  library: LibraryOptions
} & ParsedDoc

export type {
  ProcessedFile,
  PackagePathData,
  YamlMetaInfo,
  JSDocFunctionReturns,
  LibraryOptions,
  Glyph,
  MainDocsData,
  MainIconsData,
  JsDocResult
}
