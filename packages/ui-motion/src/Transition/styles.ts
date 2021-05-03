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
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { type } = props

  /**
   * After emotion migration the only way to keep
   * the old BaseTransition functionality with adding and removing
   * classes was to add the `Global` helper of `emotion`
   *
   * Todo: refactor or replace Transition/BaseTransition component in v9.0.0. so that it is not class based
   */

  const baseTransition = `opacity ${componentTheme.duration} ${componentTheme.timing}, transform ${componentTheme.duration} ${componentTheme.timing}`

  /* Animation type: fade */
  const fadeAnimation = {
    [`.transition--fade-transitioning`]: {
      transition: baseTransition
    },
    [`.transition--fade-exiting,
      .transition--fade-exited`]: {
      opacity: 0.01
    },
    [`.transition--fade-entering,
      .transition--fade-entered`]: {
      opacity: 1
    }
  }

  /* Animation type: scale */
  const scaleAnimation = {
    [`.transition--scale-transitioning`]: {
      transition: baseTransition
    },
    [`.transition--scale-exiting,
      .transition--scale-exited`]: {
      transform: 'scale(0.01) translate3d(0, 0, 0)',
      opacity: 0.01
    },
    [`.transition--scale-entering,
      .transition--scale-entered`]: {
      transform: 'scale(1) translate3d(0, 0, 0)',
      opacity: 1
    }
  }

  /* Animation type: slide */

  /*
    Note: the transitions for slide are:
    from EXITED to ENTERING and from ENTERED to EXITING.

    ENTERED and EXITED will be set directly
    when enter or exit transitions are disabled and they reset
    the 'stage' for the next transition.

    The base transition class enables/disables transitions
    from one state to another, so transitions should be set there.
  */
  const slideAnimation = {
    [`.transition--slide-right-transitioning,
      .transition--slide-left-transitioning,
      .transition--slide-up-transitioning,
      .transition--slide-down-transitioning`]: {
      transition: baseTransition
    },
    [`.transition--slide-right-exited,
      .transition--slide-left-exited,
      .transition--slide-up-exited,
      .transition--slide-down-exited`]: {
      opacity: 0.01
    },
    [`.transition--slide-right-exiting,
      .transition--slide-right-exited`]: {
      transform: 'translate3d(100%, 0, 0)'
    },
    [`.transition--slide-left-exiting,
      .transition--slide-left-exited`]: {
      transform: 'translate3d(-100%, 0, 0)'
    },
    [`.transition--slide-up-exiting,
      .transition--slide-up-exited`]: {
      transform: 'translate3d(0, -100%, 0)'
    },
    [`.transition--slide-down-exiting,
      .transition--slide-down-exited`]: {
      transform: 'translate3d(0, 100%, 0)'
    },
    [`.transition--slide-left-entering,
      .transition--slide-right-entering,
      .transition--slide-up-entering,
      .transition--slide-down-entering,
      .transition--slide-left-entered,
      .transition--slide-right-entered,
      .transition--slide-up-entered,
      .transition--slide-down-entered`]: {
      transform: 'translate3d(0, 0, 0)',
      opacity: 1
    }
  }

  return {
    duration: componentTheme.duration,
    classNames: type
      ? {
          transitioning: `transition--${type}-transitioning`,
          exited: `transition--${type}-exited`,
          exiting: `transition--${type}-exiting`,
          entered: `transition--${type}-entered`,
          entering: `transition--${type}-entering`
        }
      : {},
    globalStyles: {
      ...fadeAnimation,
      ...scaleAnimation,
      ...slideAnimation
    }
  }
}

export default generateStyle
