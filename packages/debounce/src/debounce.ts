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

interface DebounceOptions {
  /**
   * Specify invoking on the leading edge of the timeout
   */
  leading?: boolean
  /**
   * The maximum time `func` is allowed to be delayed before it's invoked
   */
  maxWait?: number
  /**
   * Specify invoking on the trailing edge of the timeout
   */
  trailing?: boolean
}

export type Debounced<F extends (...args: any) => any> = F & {
  cancel: () => void
  flush: () => ReturnType<F>
}

/**
 * ---
 * category: utilities/utils
 * ---
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked. The debounced function comes with a cancel
 * method to cancel delayed func invocations and a flush method to immediately invoke them. Provide options
 * to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout.
 * The func is invoked with the last arguments provided to the debounced function. Subsequent calls to the
 * debounced function return the result of the last func invocation.
 *
 * [lodash.debounce](https://github.com/lodash/lodash/blob/master/debounce.js)
 * doesn't work well with [sinon fakeTimers](http://sinonjs.org/releases/v1.17.7/fake-timers/)
 * so this is forked from the lodash source.
 *
 * Note: Modified from the original to check for cancelled boolean before invoking func to prevent React setState
 * on unmounted components.
 * For a cool explanation see https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * @module debounce
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options options object.
 * @returns Returns the new debounced function.
 */
function debounce<F extends (...args: any) => any>(
  func: F,
  wait = 0,
  options: DebounceOptions = {}
) {
  let lastArgs: unknown | undefined
  let lastThis: unknown
  let result: ReturnType<F>
  let lastCallTime: number
  let lastInvokeTime = 0
  let timers: ReturnType<typeof setTimeout>[] = []
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  const leading = !!options.leading
  const maxing = 'maxWait' in options
  const trailing = 'trailing' in options ? !!options.trailing : true
  const maxWait = maxing ? Math.max(+!options.maxWait || 0, wait) : 0

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = undefined
    lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args as unknown[])
    return result
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timers.push(setTimeout(timerExpired, wait))
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number): number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const result = wait - timeSinceLastCall

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result
  }

  function shouldInvoke(time: number): boolean {
    if (typeof lastCallTime === 'undefined') {
      return true
    }
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      trailingEdge(time)
    } else {
      // Restart the timer.
      timers.push(setTimeout(timerExpired, remainingWait(time)))
    }
  }

  function trailingEdge(time: number) {
    clearAllTimers()
    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    clearAllTimers()
    lastInvokeTime = 0
    lastCallTime = 0
    lastArgs = lastThis = undefined
  }

  function flush() {
    return timers.length === 0 ? result : trailingEdge(Date.now())
  }

  function clearAllTimers() {
    timers.forEach((timerId) => clearTimeout(timerId))
    timers = []
  }

  function debounced(...args: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timers.length === 0) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timers.push(setTimeout(timerExpired, wait))
        return invokeFunc(lastCallTime)
      }
    }
    if (timers.length === 0) {
      timers.push(setTimeout(timerExpired, wait))
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced as Debounced<F>
}

export default debounce
export { debounce }
