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

'use client'
import React from 'react'
import {
  ProgressBar as pb,
  ProgressCircle as pc,
  View as vw,
  Text as tx
} from '@instructure/ui'

const ProgressCircle = pc as any
const ProgressBar = pb as any
const View = vw as any
const Text = tx as any

export default function ProgressBarPage() {
  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <section style={{ width: '500px' }}>
        <div>Sizes:</div>
        <ProgressBar
          size="x-small"
          screenReaderLabel="Loading completion"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          size="small"
          screenReaderLabel="Loading completion"
          valueNow={20}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          screenReaderLabel="Loading completion"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          size="large"
          screenReaderLabel="Loading completion"
          valueNow={40}
          valueMax={60}
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
      </section>

      <section style={{ width: '500px' }}>
        <div>Inverse:</div>
        <View background="primary-inverse" as="div" padding="small">
          <ProgressBar
            screenReaderLabel="Loading completion"
            color="primary-inverse"
            valueNow={30}
            valueMax={60}
            renderValue={({ valueNow, valueMax }: any) => (
              <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
            )}
            formatScreenReaderValue={({ valueNow, valueMax }: any) =>
              Math.round((valueNow / valueMax) * 100) + ' percent'
            }
          />
        </View>
      </section>

      <section style={{ width: '500px' }}>
        <div>Colors:</div>
        <ProgressBar
          screenReaderLabel="Loading completion"
          meterColor="info"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          screenReaderLabel="Loading completion"
          meterColor="success"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          screenReaderLabel="Loading completion"
          meterColor="alert"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          screenReaderLabel="Loading completion"
          meterColor="warning"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
        <ProgressBar
          screenReaderLabel="Loading completion"
          meterColor="danger"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
          renderValue={({ valueNow, valueMax }: any) => (
            <Text>{Math.round((valueNow / valueMax) * 100)}%</Text>
          )}
          formatScreenReaderValue={({ valueNow, valueMax }: any) =>
            Math.round((valueNow / valueMax) * 100) + ' percent'
          }
        />
      </section>

      <div>ProgressCircle:</div>
      <section style={{ width: '600px' }}>
        <ProgressCircle
          size="x-small"
          screenReaderLabel="Loading completion"
          valueNow={40}
          valueMax={60}
          margin="0 small 0 0"
        />
        <ProgressCircle
          screenReaderLabel="Loading completion"
          valueNow={40}
          valueMax={60}
          margin="0 small 0 0"
          formatScreenReaderValue={function ({ valueNow, valueMax }: any) {
            return valueNow + ' out of ' + valueMax
          }}
          renderValue={function ({ valueNow, valueMax }: any) {
            return (
              <span>
                <Text size="large" weight="bold">
                  {valueNow}
                </Text>
                <br />
                <Text size="small">/&nbsp;</Text>
                <Text size="small">{valueMax}</Text>
              </span>
            )
          }}
        />
        <View background="primary-inverse" as="div">
          <ProgressCircle
            screenReaderLabel="Loading completion"
            color="primary-inverse"
            valueNow={50}
            valueMax={60}
          />
        </View>
      </section>
      <section style={{ width: '600px' }}>
        <ProgressCircle
          screenReaderLabel="Loading completion"
          meterColor="info"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
        />
        <ProgressCircle
          screenReaderLabel="Loading completion"
          meterColor="success"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
        />
        <ProgressCircle
          screenReaderLabel="Loading completion"
          meterColor="alert"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
        />
        <ProgressCircle
          screenReaderLabel="Loading completion"
          meterColor="warning"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
        />
        <ProgressCircle
          screenReaderLabel="Loading completion"
          meterColor="danger"
          valueNow={40}
          valueMax={60}
          margin="0 0 small"
        />
      </section>
    </main>
  )
}
