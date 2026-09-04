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

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HOOK = fileURLToPath(
  new URL('../check-commit-message.mjs', import.meta.url)
)

// built by concatenation so this file's own text does not read as a commit
// invocation to the hook it is testing
const GC = 'git ' + 'commit'

const heredoc = (message: string) =>
  `${GC} -m "$(cat <<'EOF'\n${message}\nEOF\n)"`

function runHook(command: string) {
  const payload = JSON.stringify({
    tool_name: 'Bash',
    tool_input: { command }
  })
  const result = spawnSync('node', [HOOK], { input: payload, encoding: 'utf8' })
  return { status: result.status, stderr: result.stderr }
}

describe('check-commit-message hook', () => {
  describe('allows', () => {
    it('a subject-only commit', () => {
      expect(
        runHook(`${GC} -m "fix(ui-select): keep highlight when options change"`)
          .status
      ).toBe(0)
    })

    it('a long prose body explaining a subtle cause', () => {
      // shaped after 9b0467db66, a genuinely good 11-line body
      const message = [
        'fix(ui-dialog): cancel the scheduled focus activation on close',
        '',
        'Dialog activates its FocusRegion in a requestAnimationFrame callback. When',
        'the Dialog closed before that frame ran, close() found no region to blur and',
        'left the frame scheduled. The callback then activated a region for an already',
        'closed Dialog, which nothing ever blurred.',
        '',
        'Co-Authored-By: Claude <noreply@anthropic.com>'
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(0)
    })

    it('a single lead-in heading followed by a few bullets', () => {
      // shaped after ba6f9459d8 / 7e40bc5a2c, which use "The fixes:" as a lead-in
      const message = [
        'test(many): fix tests after the vitest-browser conversion',
        '',
        'A real browser does layout, hit-testing and focus, and a fair number of',
        'tests relied on jsdom not doing any of that.',
        '',
        'The fixes:',
        '- userEvent.click(..., { force: true }) in ~36 places',
        '- await expect.element() instead of a bare assertion',
        '- drop the manual act() wrappers'
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(0)
    })

    it('a handful of bullets naming specific files', () => {
      // shaped after ea28383285, where naming the files is the point
      const message = [
        'fix(many): update eslint-disable comments for oxlint rule ids',
        '',
        'Two disable comments reference rule names that do not match oxlint, so',
        'they silently stopped suppressing anything:',
        '- packages/__docs__/globals.ts: no @ scope prefix on the custom rule',
        '- packages/ui-table/src/Table.test.tsx: stale directive'
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(0)
    })

    it('a BREAKING CHANGE note', () => {
      const message = [
        'feat(ui-select)!: remove deprecated onOpen prop',
        '',
        'BREAKING CHANGE: onOpen has been removed, use onShowOptions instead.'
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(0)
    })

    it('a commit chained after another command', () => {
      expect(runHook(`git add . && ${GC} -m "chore: bump deps"`).status).toBe(0)
    })
  })

  describe('ignores commands that are not a commit', () => {
    it.each([
      ['git log', 'git log -n 5 --oneline'],
      ['an unrelated command', 'pnpm run test:vitest'],
      ['a command that only mentions committing', `echo "run ${GC} to save"`]
    ])('%s', (_name, command) => {
      expect(runHook(command).status).toBe(0)
    })
  })

  describe('blocks', () => {
    it('an attempt to skip the hooks with HUSKY=0', () => {
      const { status, stderr } = runHook(
        `HUSKY=0 ${GC} -m "fix(ui-select): ok"`
      )
      expect(status).toBe(2)
      expect(stderr).toContain('Do not skip the git hooks')
    })

    it('an attempt to skip the hooks with --no-verify', () => {
      expect(runHook(`${GC} --no-verify -m "fix(ui-select): ok"`).status).toBe(
        2
      )
    })

    it('a subject over 72 characters', () => {
      const { status, stderr } = runHook(
        `${GC} -m "feat(many): add margin prop to v2 FormFieldGroup, CheckboxGroup, RadioInputGroup, Checkbox, RadioInput, Text, and ToggleButton"`
      )
      expect(status).toBe(2)
      expect(stderr).toContain('the limit is 72')
    })

    it('a body grouped under several changelog headings', () => {
      // shaped after f7bb16e114, the 30-line pnpm migration changelog
      const message = [
        'feat(many): migrate from npm to pnpm',
        '',
        'Configuration:',
        '- add pnpm-workspace.yaml',
        '',
        'Build Tooling:',
        '- update scripts/bootstrap.js',
        '',
        'Documentation:',
        '- update npm references'
      ].join('\n')

      const { status, stderr } = runHook(heredoc(message))
      expect(status).toBe(2)
      expect(stderr).toContain('groups changes under')
    })

    it('a body that is a long bullet list', () => {
      const bullets = Array.from(
        { length: 14 },
        (_, i) => `- change number ${i}`
      )
      const message = ['feat(many): migrate to pnpm', '', ...bullets].join('\n')

      const { status, stderr } = runHook(heredoc(message))
      expect(status).toBe(2)
      expect(stderr).toContain('bullets')
    })

    it('a body enumerating many changed files', () => {
      const bullets = Array.from(
        { length: 8 },
        (_, i) => `- update packages/ui-thing-${i}/src/index.ts`
      )
      const message = ['feat(many): migrate to pnpm', '', ...bullets].join('\n')

      const { status, stderr } = runHook(heredoc(message))
      expect(status).toBe(2)
      expect(stderr).toContain('changed files')
    })

    it('a body over 28 lines', () => {
      const lines = Array.from({ length: 30 }, (_, i) => `prose line ${i}`)
      const message = ['feat(many): migrate to pnpm', '', ...lines].join('\n')

      const { status, stderr } = runHook(heredoc(message))
      expect(status).toBe(2)
      expect(stderr).toContain('the limit is 28')
    })

    it('the robot attribution line, which belongs in PR bodies only', () => {
      const message = [
        'chore: tweak docs',
        '',
        '🤖 Generated with [Claude Code](https://claude.com/claude-code)'
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(2)
    })

    it('a body line over 100 characters', () => {
      const message = [
        'fix(ui-view): memoize style lookup',
        '',
        'x'.repeat(120)
      ].join('\n')

      expect(runHook(heredoc(message)).status).toBe(2)
    })
  })

  describe('fails open', () => {
    it.each([
      ['on malformed json', 'not json'],
      ['on empty input', '']
    ])('%s', (_name, input) => {
      const result = spawnSync('node', [HOOK], { input, encoding: 'utf8' })
      expect(result.status).toBe(0)
    })
  })
})
