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
import { expect, spy, stub } from '@instructure/ui-test-utils'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'

import generateExamples from '../generateExamples'
import generatePropCombinations from '../generatePropCombinations'
import TestComponent, { testComponentProps } from './__testfixtures__/TestComponent'

const displayName = 'TestComponent'

const children = 'The children to render'
const baseComponentProps = {
  children
}
const baseConfig = {
  permutations: [
    'variant',
    'show',
    { message: [null, { value: 'hello' }]}
  ],
  renderProps: (props) => {
    return {
      componentProps: baseComponentProps
    }
  }
}
const component = TestComponent

const baseModule = {
  displayName,
  component,
  props: testComponentProps,
  config: baseConfig
}

const executeExampleGenerator = (module, options) => {
  return generateExamples([module], options)[0]
}

/* eslint-disable mocha/no-synchronous-tests */

describe('generateExamples', () => {
  describe('sections', () => {
    const verifySections = (examples, expectedSections) => {
      let result = true
      const sections = examples.map(example => example.name)
      expectedSections.forEach((expectedSection) => {
        if (!sections.includes(expectedSection)) {
          result = false
        }
      })
      return result
    }

    it('should create sections based on the enumerated values', () => {
      const { sections } = executeExampleGenerator({
        ...baseModule,
        config: {
          ...baseConfig,
          sections: 'variant'
        }
      })

      expect(sections.length).to.equal(2)
      expect(verifySections(sections, ['circle', 'rectangle'])).to.equal(true)
    })

    it('should provide a default section when no sections are designated', () => {
      const { sections } = executeExampleGenerator(baseModule)

      expect(sections.length).to.equal(1)
      expect(verifySections(sections, ['Examples'])).to.equal(true)
    })

    it('should override default section name via options', () => {
      const defaultSectionName = 'FooBarBaz'
      const { sections } = executeExampleGenerator(baseModule, { defaultSectionName })
      expect(verifySections(sections, [defaultSectionName])).to.equal(true)
    })

    it('should override default section name via config', () => {
      const defaultConfigSectionName = 'Qux'
      const defaultSectionName = 'FooBarBaz'
      const { sections } = executeExampleGenerator(
        {...baseModule, config: {...baseConfig, defaultSectionName: defaultConfigSectionName }},
        { defaultSectionName }
      )
      expect(verifySections(sections, [defaultConfigSectionName])).to.equal(true)
    })
  })

  describe('render functions', () => {
    const permutations = {
      variant: ['circle', 'rectangle'],
      show: [true, false],
      message: [null, { value: 'hello' }]
    }

    const permutationsArray = Object.entries(permutations).map(([key, value]) => {
      return { [key]: value }
    })

    const generateTestCombinations = (options, filter = () => true) => {
      return generatePropCombinations(permutations)
        .filter(filter)
        .map((combination) => {
          return {
            ...combination,
            ...options(combination)
          }
        })
    }

    const compareCombinations = (testCombinations, resultCombinations) => {
      return deepEqual({ combinations: testCombinations }, { combinations: resultCombinations })
    }

    const renderExample = (Component, componentProps, exampleProps) => {
      return {
        componentProps,
        exampleProps
      }
    }

    const renderLayout = (examples, section) => {
      return {
        examples,
        section
      }
    }

    describe('render props', () => {
      it('generates components for every combination of props', () => {
        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            ...baseConfig,
            permutations: permutationsArray
          }
        })

        const testCombinations = generateTestCombinations(() => {
          return { children }
        })

        const { components } = sections[0]
        const resultCombinations = components.map(component => component.props)

        expect(compareCombinations(testCombinations, resultCombinations)).to.equal(true)
      })

      it('passes correct component props depending on the current combination', () => {
        const circleChild = 'I am a circle child'
        const rectangleChild = 'I am a rectangle child'

        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            permutations: permutationsArray,
            renderProps: (props) => {
              return {
                componentProps: {
                  children: props.variant === 'circle' ? circleChild : rectangleChild
                }
              }
            }
          }
        })

        const testCombinations = generateTestCombinations((combination) => {
          return { children: combination.variant === 'circle' ? circleChild : rectangleChild }
        })

        const { components } = sections[0]
        const resultCombinations = components.map(component => component.props)

        expect(compareCombinations(testCombinations, resultCombinations)).to.equal(true)
      })

      it('filters components as designated in the config', () => {
        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            permutations: permutationsArray,
            renderProps: (props) => {
              return {
                componentProps: baseComponentProps,
                filter: !props.show
              }
            }
          }
        })

        const testCombinations = generateTestCombinations(
          () => { return { children } },
          combination => combination.show
        )

        const { components } = sections[0]
        const resultCombinations = components.map(component => component.props)

        expect(compareCombinations(testCombinations, resultCombinations)).to.equal(true)
      })
    })

    describe('render example', () => {
      it('should call the render example function when passed via options', () => {
        const size = '30rem'
        const margin = 'small'

        const { sections } = executeExampleGenerator(baseModule, {
          exampleProps: { size, margin },
          renderExample,
          renderLayout
        })

        sections[0].examples.forEach(({ exampleProps, componentProps }) => {
          expect(componentProps.children).to.equal(baseComponentProps.children)
          expect(exampleProps.size).to.equal(size)
          expect(exampleProps.margin).to.equal(margin)
        })
      })

      it('should call the render example function when passed via config', () => {
        const size = '20rem'
        const rectangleBackground = 'default'
        const circleBackground = 'inverse'
        const display = 'block'

        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            permutations: permutationsArray,
            renderProps: (props) => {
              return {
                componentProps: {
                  ...baseComponentProps,
                  display
                },
                exampleProps: {
                  size,
                  background: props.variant === 'rectangle' ? rectangleBackground : circleBackground
                }
              }
            },
            renderExample,
            renderLayout
          }
        })

        sections[0].examples.forEach(({ exampleProps, componentProps }) => {
          expect(componentProps.children).to.equal(baseComponentProps.children)
          expect(componentProps.display).to.equal(display)

          expect(exampleProps.size).to.equal('20rem')

          const { variant } = componentProps
          const { background } = exampleProps
          expect(variant === 'rectangle' || variant === 'circle').to.equal(true)
          expect(variant === 'rectangle'
            ? (background === rectangleBackground)
            : (background === circleBackground)
          ).to.equal(true)
        })
      })

      it('example props from the config should override example props from the options when passed to render example function', () => {
        const size = '20rem'
        const rectangleBackground = 'default'
        const circleBackground = 'inverse'

        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            permutations: permutationsArray,
            renderProps: (props) => {
              return {
                componentProps: baseComponentProps,
                exampleProps: {
                  size,
                  background: props.variant === 'rectangle' ? rectangleBackground : circleBackground
                }
              }
            },
            renderExample,
            renderLayout
          }
        }, {
          exampleProps: {
            size: '30rem',
            margin: 'small',
            background: 'transparent'
          }
        })

        sections[0].examples.forEach(({ exampleProps, componentProps }) => {
          expect(exampleProps.size).to.equal('20rem')
          expect(exampleProps.margin).to.equal('small')

          const { variant } = componentProps
          const { background } = exampleProps
          expect(variant === 'rectangle' || variant === 'circle').to.equal(true)
          expect(variant === 'rectangle'
            ? (background === rectangleBackground)
            : (background === circleBackground)
          ).to.equal(true)
        })
      })

      it('render example function passed via config should override render example function passed via options', () => {
        const configRenderExample = spy()
        const optionsRenderExample = spy()

        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            ...baseConfig,
            renderExample: configRenderExample
          }
        }, {
          renderExample: optionsRenderExample
        })

        expect(optionsRenderExample).to.not.have.been.called()
        expect(configRenderExample.callCount).to.equal(sections[0].examples.length)
      })
    })

    describe('render layout', () => {
      it('should call the render layout function when passed via options', () => {
        const { sections } = executeExampleGenerator({
          ...baseModule,
          sections: 'variant'
        }, {
          renderExample,
          renderLayout
        })

        sections.forEach((section) => {
          expect(deepEqual(section.pages[0].examples, section.examples)).to.equal(true)
          expect(section.pages[0].section).to.equal(section.name)
        })
      })

      it('should call the render layout function when passed via config', () => {
        const { sections } = executeExampleGenerator({
          ...baseModule,
          sections: 'variant',
          config: {
            ...baseConfig,
            renderExample,
            renderLayout
          }
        })
        sections.forEach((section) => {
          expect(deepEqual(section.pages[0].examples, section.examples)).to.equal(true)
          expect(section.pages[0].section).to.equal(section.name)
        })
      })

      it('render layout function passed via config should override render layout function passed via options', () => {
        const configRenderLayout = spy()
        const configRenderExample = spy()

        const optionsRenderLayout = spy()
        const optionsRenderExample = spy()

        const { sections } = executeExampleGenerator({
          ...baseModule,
          config: {
            ...baseConfig,
            renderExample: configRenderExample,
            renderLayout: configRenderLayout
          }
        }, {
          renderExample: optionsRenderExample,
          renderLayout: optionsRenderLayout
        })

        expect(optionsRenderExample).to.not.have.been.called()
        expect(optionsRenderLayout).to.not.have.been.called()
        expect(configRenderExample.callCount).to.equal(sections[0].examples.length)
        expect(configRenderLayout).to.have.been.calledOnce()
      })
    })
  })

  describe('pages', () => {
    const verifyMaxExamplesPerPage = (pages, max) => {
      let result = true
      pages.forEach((page) => {
        if (page.props.children.length > max) {
          result = false
        }
      })
      return result
    }

    it('should include all examples in a single page by default',  () => {
      const { sections } = executeExampleGenerator(baseModule)
      const { pages } = sections[0]
      expect(pages.length).to.equal(1)
      expect(pages[0].props.children.length).to.equal(sections[0].examples.length)
    })

    it('examples in a page should not exceed the max limit when set', () => {
      const maxExamplesPerPage = 2
      const { sections } = executeExampleGenerator(baseModule, {
        maxExamplesPerPage
      })
      const { pages } = sections[0]
      expect(verifyMaxExamplesPerPage(pages, maxExamplesPerPage)).to.equal(true)
    })

    it('examples in a page should not exceed the max limit set for their section', () => {
      const { sections } = executeExampleGenerator({
        ...baseModule,
        config: {
          ...baseConfig,
          sections: 'variant',
          maxExamplesPerPage: (section) => section === 'rectangle' ? 2 : 3
        }
      }, {
        maxExamplesPerPage: 4
      })

      sections.forEach((section) => {
        const sectionName = section.name
        expect(sectionName === 'rectangle' || sectionName === 'circle').to.equal(true)

        const maxExamplesPerPage = sectionName === 'rectangle' ? 2 : 3
        expect(verifyMaxExamplesPerPage(section.pages, maxExamplesPerPage)).to.equal(true)
        expect(section.pages[0].props.children.length).to.equal(maxExamplesPerPage)
      })
    })
  })

  describe('errors and warnings', () => {
    const testRequiredProperty = (property) => {
      it(`should fail to initialize if the ${property} property is not supplied`, () => {
        const consoleError = stub(console, 'error')
        const errorMessage = 'Warning: [generateExamples] Error: Could not initialize the examples generator for'

        executeExampleGenerator({
          ...baseModule,
          [property]: null
        })

        expect(consoleError)
          .to.have.been.calledWithMatch(
            property === 'displayName' ? `${errorMessage} component` : `${errorMessage} TestComponent`
          )
      })
    }

    testRequiredProperty('displayName')
    testRequiredProperty('component')

    it('should warn if component does not have prop specified in the config', () => {
      const fakeProp = 'foo'
      const consoleError = stub(console, 'error')
      executeExampleGenerator({
        ...baseModule,
        config: {
          permutations: [
            fakeProp
          ]
        }
      })
      expect(consoleError)
        .to.have.been.calledWithExactly(
          `Warning: [ExampleGenerator] TestComponent does not have the following prop: '${fakeProp}'.`
        )
    })
  })
})

/* eslint-enable mocha/no-synchronous-tests */
