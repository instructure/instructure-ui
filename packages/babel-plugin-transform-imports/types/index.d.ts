export = transformImports
declare function transformImports({ types: t }: { types: any }): {
  visitor: {
    ImportDeclaration: (path: any, state: any) => void
  }
}
//# sourceMappingURL=index.d.ts.map
