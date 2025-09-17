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

export type Primitives = {
  color: {
    white: string
    green: {
      green10: string
      green20: string
      green30: string
      green40: string
      green50: string
      green60: string
      green70: string
      green80: string
      green90: string
      green100: string
      green110: string
      green120: string
    }
    grey: {
      grey10: string
      grey20: string
      grey30: string
      grey40: string
      grey50: string
      grey60: string
      grey70: string
      grey80: string
      grey90: string
      grey100: string
      grey110: string
      grey120: string
    }
    blue: {
      blue10: string
      blue20: string
      blue30: string
      blue40: string
      blue50: string
      blue60: string
      blue70: string
      blue80: string
      blue90: string
      blue100: string
      blue110: string
      blue120: string
    }
    red: {
      red10: string
      red20: string
      red30: string
      red40: string
      red50: string
      red60: string
      red70: string
      red80: string
      red90: string
      red100: string
      red110: string
      red120: string
    }
    orange: {
      orange10: string
      orange20: string
      orange30: string
      orange40: string
      orange50: string
      orange60: string
      orange70: string
      orange80: string
      orange90: string
      orange100: string
      orange110: string
      orange120: string
    }
    plum: {
      plum10: string
      plum20: string
      plum30: string
      plum40: string
      plum50: string
      plum60: string
      plum70: string
      plum80: string
      plum90: string
      plum100: string
      plum110: string
      plum120: string
    }
    violet: {
      violet10: string
      violet20: string
      violet30: string
      violet40: string
      violet50: string
      violet60: string
      violet70: string
      violet80: string
      violet90: string
      violet100: string
      violet110: string
      violet120: string
    }
    stone: {
      stone10: string
      stone20: string
      stone30: string
      stone40: string
      stone50: string
      stone60: string
      stone70: string
      stone80: string
      stone90: string
      stone100: string
      stone110: string
      stone120: string
    }
    sky: {
      sky10: string
      sky20: string
      sky30: string
      sky40: string
      sky50: string
      sky60: string
      sky70: string
      sky80: string
      sky90: string
      sky100: string
      sky110: string
      sky120: string
    }
    honey: {
      honey10: string
      honey20: string
      honey30: string
      honey40: string
      honey50: string
      honey60: string
      honey70: string
      honey80: string
      honey90: string
      honey100: string
      honey110: string
      honey120: string
    }
    sea: {
      sea10: string
      sea20: string
      sea30: string
      sea40: string
      sea50: string
      sea60: string
      sea70: string
      sea80: string
      sea90: string
      sea100: string
      sea110: string
      sea120: string
    }
    aurora: {
      aurora10: string
      aurora20: string
      aurora30: string
      aurora40: string
      aurora50: string
      aurora60: string
      aurora70: string
      aurora80: string
      aurora90: string
      aurora100: string
      aurora110: string
      aurora120: string
    }
  }
  size: {
    size1: string
    size2: string
    size4: string
    size8: string
    size12: string
    size14: string
    size16: string
    size20: string
    size24: string
    size28: string
    size32: string
    size36: string
    size40: string
    size48: string
    size64: string
  }
  fontFamilies: { lato: string; inclusiveSans: string; Atkinson: string }
  fontWeights: {
    thin: number
    extraLight: number
    light: number
    regular: number
    medium: number
    semiBold: number
    bold: number
    extraBold: number
    black: number
  }
  additionalSize: {
    size1_25: string
    size1_5: string
    size2_5: string
    size3: string
  }
}

const primitives: Primitives = {
  color: {
    white: '#ffffff',
    green: {
      green10: '#DCEEE4',
      green20: '#A9D6BD',
      green30: '#76BE96',
      green40: '#42A76E',
      green50: '#2C995C',
      green60: '#18934E',
      green70: '#03893D',
      green80: '#038039',
      green90: '#027634',
      green100: '#02672D',
      green110: '#015B28',
      green120: '#144516'
    },
    grey: {
      grey10: '#F2F4F4',
      grey20: '#E8EAEC',
      grey30: '#D7DADE',
      grey40: '#9EA6AD',
      grey50: '#8D959F',
      grey60: '#6A7883',
      grey70: '#586874',
      grey80: '#4A5B68',
      grey90: '#3F515E',
      grey100: '#334451',
      grey110: '#273540',
      grey120: '#1C222B'
    },
    blue: {
      blue10: '#e0ebf5',
      blue20: '#B4D0E7',
      blue30: '#88B5D9',
      blue40: '#5C99CB',
      blue50: '#488CC5',
      blue60: '#3C85C1',
      blue70: '#2B7ABC',
      blue80: '#1D71B8',
      blue90: '#0E68B3',
      blue100: '#0A5A9E',
      blue110: '#09508C',
      blue120: '#133B72'
    },
    red: {
      red10: '#FCE4E5',
      red20: '#FCBDBE',
      red30: '#FC9091',
      red40: '#FB5D5D',
      red50: '#F54546',
      red60: '#F03133',
      red70: '#E62429',
      red80: '#D72226',
      red90: '#C71F23',
      red100: '#AE1B1F',
      red110: '#9B181C',
      red120: '#7F0000'
    },
    orange: {
      orange10: '#FCE5D9',
      orange20: '#F8C1A3',
      orange30: '#F49765',
      orange40: '#F06E26',
      orange50: '#E15F17',
      orange60: '#D65813',
      orange70: '#CF4A00',
      orange80: '#C14500',
      orange90: '#B34000',
      orange100: '#9C3800',
      orange110: '#8B3200',
      orange120: '#622D09'
    },
    plum: {
      plum10: '#f7e5f0',
      plum20: '#EBBFDB',
      plum30: '#DF99C6',
      plum40: '#D473B1',
      plum50: '#CE60A7',
      plum60: '#CA529F',
      plum70: '#C54396',
      plum80: '#C1368F',
      plum90: '#BA2083',
      plum100: '#A31C73',
      plum110: '#921966',
      plum120: '#70134F'
    },
    violet: {
      violet10: '#f1e6f5',
      violet20: '#DDC4E7',
      violet30: '#C9A2D9',
      violet40: '#B57FCC',
      violet50: '#AC6FC6',
      violet60: '#A564C2',
      violet70: '#9E58BD',
      violet80: '#994FB9',
      violet90: '#9242B4',
      violet100: '#7F399E',
      violet110: '#70338C',
      violet120: '#56276B'
    },
    stone: {
      stone10: '#eaeaea',
      stone20: '#CDCDCD',
      stone30: '#B0B0B0',
      stone40: '#939393',
      stone50: '#878787',
      stone60: '#7F7F7F',
      stone70: '#767676',
      stone80: '#6F6F6F',
      stone90: '#666666',
      stone100: '#585858',
      stone110: '#4E4E4E',
      stone120: '#3C3C3C'
    },
    sky: {
      sky10: '#ddecf3',
      sky20: '#ADD1E2',
      sky30: '#7DB6D1',
      sky40: '#4E9CC0',
      sky50: '#3890B8',
      sky60: '#2887B2',
      sky70: '#197EAB',
      sky80: '#1777A2',
      sky90: '#156D94',
      sky100: '#135F81',
      sky110: '#105472',
      sky120: '#0D4058'
    },
    honey: {
      honey10: '#f5e9ca',
      honey20: '#E3C987',
      honey30: '#D1A944',
      honey40: '#C08A00',
      honey50: '#B07E00',
      honey60: '#A57600',
      honey70: '#996E00',
      honey80: '#916800',
      honey90: '#856000',
      honey100: '#745300',
      honey110: '#664919',
      honey120: '#4E3800'
    },
    sea: {
      sea10: '#daeeef',
      sea20: '#A4D4D8',
      sea30: '#6EBAC1',
      sea40: '#37A1AA',
      sea50: '#1E95A0',
      sea60: '#0A8C97',
      sea70: '#00828E',
      sea80: '#007B86',
      sea90: '#00717B',
      sea100: '#00626B',
      sea110: '#00575F',
      sea120: '#004349'
    },
    aurora: {
      aurora10: '#daeee8',
      aurora20: '#A4D6C7',
      aurora30: '#6EBEA6',
      aurora40: '#38A585',
      aurora50: '#1E9975',
      aurora60: '#0B9069',
      aurora70: '#048660',
      aurora80: '#047F5B',
      aurora90: '#037453',
      aurora100: '#036549',
      aurora110: '#025A41',
      aurora120: '#024531'
    }
  },
  size: {
    size1: '0.0625 rem',
    size2: '0.125 rem',
    size4: '0.25rem',
    size8: '0.5rem',
    size12: '0.75rem',
    size14: '0.875rem',
    size16: '1rem',
    size20: '1.25rem',
    size24: '1.5rem',
    size28: '1.75rem',
    size32: '2rem',
    size36: '2.25rem',
    size40: '2.5rem',
    size48: '3rem',
    size64: '4rem'
  },
  fontFamilies: {
    lato: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
    inclusiveSans:
      'Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif',
    Atkinson:
      'Atkinson Hyperlegible Next VF, "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },
  additionalSize: {
    size1_25: '0.078125rem',
    size1_5: '0.09375rem',
    size2_5: '0.15625rem',
    size3: '0.1875rem'
  }
}
export default primitives
