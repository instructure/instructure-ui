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

/**
 * ---
 * category: utilities/react
 * ---
 * Parse the component props for the interaction type. It will return one of 'enabled', 'disabled', or 'readonly'.
 * This is useful for form elements where consumers are able to either use the interaction prop as specified or the
 * native html disabled or readonly attributes
 *
 * @param {Object} args
 * @param {Object} args.props - the component props
 * @param {string} args.props.interaction - specifies the interaction mode, one of 'enabled', 'disabled', or 'readonly'
 * @param {boolean} args.props.disabled - specifies if the component is disabled. Will take precedence over readOnly
 * @param {boolean} args.props.readOnly - specifies if the component is readOnly
 * @param {Array} args.interactionTypes - an array specifying the interaction types available to the component, ['disabled', 'readOnly'] by default
 * @returns {String} one of 'enabled', 'disabled', or 'readonly'
 */
export function getInteraction({
  props = {},
  interactionTypes = ['disabled', 'readOnly']
} = {}) {
  const { interaction, disabled, readOnly } = props

  // interaction is the source of truth when it is provided
  if (interaction) return interaction

  // if there's no interaction specified, use disabled or readOnly if they are defined as props (note, disabled will win
  // over readOnly if both are provided)
  if (interactionTypes.includes('disabled') && disabled) return 'disabled'
  if (interactionTypes.includes('readOnly') && readOnly) return 'readonly'

  // We were provided with nothing, use enabled by default
  return 'enabled'
}
