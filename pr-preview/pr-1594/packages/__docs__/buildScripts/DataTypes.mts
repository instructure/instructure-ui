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
// TODO these are from React-docgen Documentation.d.ts,
// remove when react-docgen exports them
interface MethodParameter {
  name: string;
  description?: string;
  optional: boolean;
  type?: TypeDescriptor<FunctionSignatureType> | null;
}

interface MethodReturn {
  description?: string;
  type: TypeDescriptor<FunctionSignatureType> | undefined;
}

interface PropDescriptor {
  type?: PropTypeDescriptor;
  flowType?: TypeDescriptor<FunctionSignatureType>;
  tsType?: TypeDescriptor<TSFunctionSignatureType>;
  required?: boolean;
  defaultValue?: DefaultValueDescriptor;
  description?: string;
}

interface PropTypeDescriptor {
  name: 'any' | 'array' | 'arrayOf' | 'bool' | 'custom' | 'element' | 'elementType' | 'enum' | 'exact' | 'func' | 'instanceOf' | 'node' | 'number' | 'object' | 'objectOf' | 'shape' | 'string' | 'symbol' | 'union';
  value?: unknown;
  raw?: string;
  computed?: boolean;
  description?: string;
  required?: boolean;
}

type TypeDescriptor<T = FunctionSignatureType> = ElementsType<T> | LiteralType | ObjectSignatureType<T> | SimpleType | T;

interface DefaultValueDescriptor {
  value: unknown;
  computed: boolean;
}
interface BaseType {
  required?: boolean;
  nullable?: boolean;
  alias?: string;
}
interface SimpleType extends BaseType {
  name: string;
  raw?: string;
}
interface LiteralType extends BaseType {
  name: 'literal';
  value: string;
}
interface ElementsType<T = FunctionSignatureType> extends BaseType {
  name: string;
  raw: string;
  elements: Array<TypeDescriptor<T>>;
}

interface FunctionArgumentType<T> {
  name: string
  type?: TypeDescriptor<T>
  rest?: boolean
}

interface FunctionSignatureType extends BaseType {
  name: 'signature';
  type: 'function';
  raw: string;
  signature: {
    arguments: Array<FunctionArgumentType<FunctionSignatureType>>;
    return?: TypeDescriptor<FunctionSignatureType>;
  };
}
interface TSFunctionSignatureType extends FunctionSignatureType {
  signature: {
    arguments: Array<FunctionArgumentType<TSFunctionSignatureType>>;
    return?: TypeDescriptor<TSFunctionSignatureType>;
    this?: TypeDescriptor<TSFunctionSignatureType>;
  };
}
interface ObjectSignatureType<T = FunctionSignatureType> extends BaseType {
  name: 'signature';
  type: 'object';
  raw: string;
  signature: {
    properties: Array<{
      key: TypeDescriptor<T> | string;
      value: TypeDescriptor<T>;
      description?: string;
    }>;
    constructor?: TypeDescriptor<T>;
  };
}
// end react-docgen part

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
  JSDocFunctionReturns,
  PropDescriptor,
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
  MainIconsData,
  JsDocResult
}
