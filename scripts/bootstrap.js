#! /usr/bin/env node
/* eslint-disable no-console */

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
const { execSync, fork, spawn } = require('child_process')
const path = require('path')

const opts = { stdio: 'inherit' }

// Track phases for summary
const phases = []

function trackPhase(name, fn) {
  const start = Date.now()
  const phase = { name, start, end: null, duration: null, status: 'running', error: null }
  phases.push(phase)

  const finish = (error = null) => {
    phase.end = Date.now()
    phase.duration = ((phase.end - phase.start) / 1000).toFixed(1)
    phase.status = error ? 'failed' : 'success'
    phase.error = error ? error.message : null
  }

  try {
    const result = fn()
    if (result && typeof result.then === 'function') {
      return result.then(
        () => {
          finish()
          return Promise.resolve()
        },
        (error) => {
          finish(error)
          return Promise.reject(error)
        }
      )
    }
    finish()
    return result
  } catch (error) {
    finish(error)
    throw error
  }
}

function printSummary(actualTotalDuration) {
  const summedDuration = phases.reduce((sum, p) => sum + parseFloat(p.duration), 0).toFixed(1)
  const totalDuration = actualTotalDuration || summedDuration
  const hasErrors = phases.some(p => p.status === 'failed')

  console.log('\n' + '═'.repeat(80))
  console.log('Bootstrap Summary')
  console.log('═'.repeat(80))
  console.log(
    '│ ' +
    'Phase'.padEnd(30) +
    '│ ' +
    'Duration'.padEnd(10) +
    '│ ' +
    'Status'.padEnd(10) +
    '│'
  )
  console.log('├' + '─'.repeat(31) + '┼' + '─'.repeat(11) + '┼' + '─'.repeat(11) + '┤')

  phases.forEach(phase => {
    const status = phase.status === 'success' ? '✓ Success' : '✗ Failed'
    console.log(
      '│ ' +
      phase.name.padEnd(30) +
      '│ ' +
      (phase.duration + 's').padEnd(10) +
      '│ ' +
      status.padEnd(10) +
      '│'
    )
    if (phase.error) {
      console.log('│ ' + 'Error: '.padEnd(30) + '│ ' + phase.error.padEnd(21) + '│')
    }
  })

  console.log('├' + '─'.repeat(31) + '┼' + '─'.repeat(11) + '┼' + '─'.repeat(11) + '┤')
  console.log(
    '│ ' +
    'TOTAL'.padEnd(30) +
    '│ ' +
    (totalDuration + 's').padEnd(10) +
    '│ ' +
    (hasErrors ? '✗ Failed' : '✓ Success').padEnd(10) +
    '│'
  )
  console.log('└' + '─'.repeat(31) + '┴' + '─'.repeat(11) + '┴' + '─'.repeat(11) + '┘')

  if (hasErrors) {
    console.log('\n⚠️  Bootstrap completed with errors. See details above.')
  } else {
    console.log('\n✓ Bootstrap completed successfully!')
  }
}

async function buildProject() {
  await trackPhase('Icon build', () => {
    execSync('pnpm --filter @instructure/ui-icons prepare-build', opts)
  })

  console.info('Running SWC compilation and TypeScript declarations in parallel...')

  const parallelBuildPhases = [
    { trackName: 'SWC compilation', name: 'Building packages with SWC', command: 'build' },
    { trackName: 'TypeScript declarations', name: 'Building TypeScript declarations', command: 'build:types' }
  ]

  await Promise.all(
    parallelBuildPhases.map(({ trackName, name, command }) => {
      return trackPhase(trackName, () => {
        return new Promise((resolve, reject) => {
          console.info(`${name}...`)
          const child = spawn('pnpm', ['run', command], {
            stdio: 'inherit',
            shell: true
          })
          child.on('close', (code) => {
            if (code !== 0) {
              reject(new Error(`'${command}' failed with exit code ${code}`))
            } else {
              resolve()
            }
          })
          child.on('error', reject)
        })
      })
    })
  )

  console.info('Generating tokens...')

  await trackPhase('Token generation', () => {
    return new Promise((resolve, reject) => {
      const child = spawn('pnpm', ['run', 'build:tokens'], {
        stdio: 'inherit',
        shell: true
      })
      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`'build:tokens' failed with exit code ${code}`))
        } else {
          resolve()
        }
      })
      child.on('error', reject)
    })
  })
}
async function bootstrap() {
  const bootstrapStart = Date.now()

  await trackPhase('Clean', () => {
    return new Promise((resolve, reject) => {
      const child = fork(path.resolve('scripts/clean.js'), opts)
      child.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`clean script failed with exit code ${code}`))
        } else {
          resolve()
        }
      })
      child.on('error', reject)
    })
  })

  try {
    await buildProject()
  } catch (error) {
    // Error already tracked, just print summary
  }

  const actualTotalDuration = ((Date.now() - bootstrapStart) / 1000).toFixed(1)
  printSummary(actualTotalDuration)

  const hasErrors = phases.some(p => p.status === 'failed')
  if (hasErrors) {
    process.exit(1)
  }
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error)
  printSummary() // No actual time available in error case
  process.exit(1)
})
