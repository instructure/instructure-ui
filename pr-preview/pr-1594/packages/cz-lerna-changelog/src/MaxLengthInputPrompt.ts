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

import chalk from 'chalk'
import InputPrompt from 'inquirer/lib/prompts/input'
import type { Interface as ReadlineInterface } from 'readline'
import { Answers, InputQuestionOptions } from 'inquirer'

export interface MaxLengthQuestion extends InputQuestionOptions {
  type: 'maxlength-input'
  maxLength: number
  transformer: (input: string, answers: Answers) => string
  filter: (input: string, answers: Answers) => string
  validate: (input: string, answers: Answers) => boolean | string
}
export class MaxLengthInputPrompt extends InputPrompt<MaxLengthQuestion> {
  static VALIDATION_ERROR_MESSAGE = 'Input contains too many characters!'
  constructor(
    question: MaxLengthQuestion,
    readLine: ReadlineInterface,
    answers: Answers
  ) {
    super(question, readLine, answers)
    if (!this.opt.maxLength) {
      this.throwParamError('maxLength')
    }
    const currentValidator = this.opt.validate
    this.opt.validate = (input: string, answers: Answers) => {
      if (this.opt.transformer(input, answers).length > this.opt.maxLength) {
        return MaxLengthInputPrompt.VALIDATION_ERROR_MESSAGE
      }
      return currentValidator(input, answers)
    }
  }

  render(error?: string) {
    const { maxLength, transformer } = this.opt
    const answered = this.status === 'answered'
    let bottomContent = ''
    let message = this.getQuestion()
    const transformed = transformer(this.rl.line, this.answers)
    if (answered) {
      message += chalk.cyan(this.answer)
    } else {
      message += transformed
    }
    if (error) {
      bottomContent = chalk.red('>> ') + error
    } else if (!answered) {
      const percent = (transformed.length / maxLength) * 100
      const color =
        percent < 80 ? chalk.green : percent > 100 ? chalk.red : chalk.yellow
      bottomContent = `(${color(transformed.length)}/${
        this.opt.maxLength
      } characters)`
    }
    this.screen.render(message, bottomContent)
  }
}
