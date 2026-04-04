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
    transparent: string
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
      green130: string
      green140: string
      green150: string
      green160: string
      green170: string
      green180: string
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
      grey130: string
      grey140: string
      grey150: string
      grey160: string
      grey170: string
      grey180: string
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
      blue130: string
      blue140: string
      blue150: string
      blue160: string
      blue170: string
      blue180: string
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
      red130: string
      red140: string
      red150: string
      red160: string
      red170: string
      red180: string
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
      orange130: string
      orange140: string
      orange150: string
      orange160: string
      orange170: string
      orange180: string
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
      plum130: string
      plum140: string
      plum150: string
      plum160: string
      plum170: string
      plum180: string
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
      violet130: string
      violet140: string
      violet150: string
      violet160: string
      violet170: string
      violet180: string
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
      stone130: string
      stone140: string
      stone150: string
      stone160: string
      stone170: string
      stone180: string
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
      sky130: string
      sky140: string
      sky150: string
      sky160: string
      sky170: string
      sky180: string
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
      honey130: string
      honey140: string
      honey150: string
      honey160: string
      honey170: string
      honey180: string
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
      sea130: string
      sea140: string
      sea150: string
      sea160: string
      sea170: string
      sea180: string
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
      aurora130: string
      aurora140: string
      aurora150: string
      aurora160: string
      aurora170: string
      aurora180: string
    }
    navy: {
      navy10: string
      navy20: string
      navy30: string
      navy40: string
      navy50: string
      navy60: string
      navy70: string
      navy80: string
      navy90: string
      navy100: string
      navy110: string
      navy120: string
      navy130: string
      navy140: string
      navy150: string
      navy160: string
      navy170: string
      navy180: string
    }
    whiteOpacity10: string
    whiteOpacity20: string
    whiteOpacity75: string
    greyOpacity75: string
    navyOpacity10: string
    greyOpacity10: string
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
  fontFamily: {
    lato: string
    inclusiveSans: string
    atkinson: string
    menlo: string
  }
  fontWeight: {
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
  opacity50: number
  opacity100: number
}

const primitives: Primitives = {
  color: {
    white: '#ffffff',
    transparent: '#00000000',
    green: {
      green10: '#DBFCDF',
      green20: '#CAF4D0',
      green30: '#B4EFBD',
      green40: '#7EDD92',
      green50: '#61C378',
      green60: '#54B86D',
      green70: '#3EA75B',
      green80: '#2D984E',
      green90: '#1E9045',
      green100: '#03893D',
      green110: '#037D37',
      green120: '#017533',
      green130: '#02672C',
      green140: '#015B26',
      green150: '#004D1F',
      green160: '#01451B',
      green170: '#033C18',
      green180: '#051F09'
    },
    grey: {
      grey10: '#F2F4F5',
      grey20: '#E8EAEC',
      grey30: '#DFE1E3',
      grey40: '#C7CACD',
      grey50: '#AAB0B5',
      grey60: '#9EA6AD',
      grey70: '#8D959F',
      grey80: '#7E8792',
      grey90: '#737F8A',
      grey100: '#6A7883',
      grey110: '#5F6E7A',
      grey120: '#576773',
      grey130: '#4A5B68',
      grey140: '#3F515E',
      grey150: '#334450',
      grey160: '#2D3D49',
      grey170: '#273540',
      grey180: '#1C222B'
    },
    blue: {
      blue10: '#EDF4FF',
      blue20: '#DEEBFF',
      blue30: '#D0E3FF',
      blue40: '#ACCDF7',
      blue50: '#7FB4F1',
      blue60: '#6CAAEE',
      blue70: '#4798E3',
      blue80: '#338CD7',
      blue90: '#2D83CB',
      blue100: '#2B7ABC',
      blue110: '#2871AF',
      blue120: '#2369A4',
      blue130: '#1E5C90',
      blue140: '#1A5281',
      blue150: '#14446D',
      blue160: '#123E62',
      blue170: '#103656',
      blue180: '#0A1C2D'
    },
    red: {
      red10: '#FBF1EF',
      red20: '#FFE3DE',
      red30: '#FFD8D0',
      red40: '#FFB7A9',
      red50: '#FA917F',
      red60: '#FE7D6A',
      red70: '#F56050',
      red80: '#F14139',
      red90: '#EC3532',
      red100: '#E62429',
      red110: '#CF1F24',
      red120: '#C51F22',
      red130: '#AE161B',
      red140: '#991418',
      red150: '#810F12',
      red160: '#750D0F',
      red170: '#670C0C',
      red180: '#311007'
    },
    orange: {
      orange10: '#FCF1ED',
      orange20: '#FFE4D7',
      orange30: '#FBDACA',
      orange40: '#FDB998',
      orange50: '#FF905A',
      orange60: '#FF7E40',
      orange70: '#F16824',
      orange80: '#E55300',
      orange90: '#DA4E00',
      orange100: '#CF4A00',
      orange110: '#BB4200',
      orange120: '#B23F01',
      orange130: '#9C3601',
      orange140: '#8A2F00',
      orange150: '#742700',
      orange160: '#682400',
      orange170: '#5A2002',
      orange180: '#2B1405'
    },
    plum: {
      plum10: '#FAF1F6',
      plum20: '#FAE3EF',
      plum30: '#F6D9E9',
      plum40: '#F0B9D7',
      plum50: '#EC93C6',
      plum60: '#E982BF',
      plum70: '#E665B4',
      plum80: '#DD4CA8',
      plum90: '#D0469F',
      plum100: '#C54396',
      plum110: '#B43D89',
      plum120: '#A83780',
      plum130: '#953171',
      plum140: '#852A64',
      plum150: '#702254',
      plum160: '#651E4C',
      plum170: '#591B42',
      plum180: '#2F0E23'
    },
    violet: {
      violet10: '#F7F2F8',
      violet20: '#F3E5F7',
      violet30: '#EEDBF4',
      violet40: '#DBC0E5',
      violet50: '#CAA1D9',
      violet60: '#C295D4',
      violet70: '#B680CC',
      violet80: '#AB6EC5',
      violet90: '#A464C0',
      violet100: '#9E58BD',
      violet110: '#944FB3',
      violet120: '#8A49A7',
      violet130: '#793F93',
      violet140: '#6D3984',
      violet150: '#5B2E6F',
      violet160: '#522965',
      violet170: '#482458',
      violet180: '#26132E'
    },
    stone: {
      stone10: '#F4F4F4',
      stone20: '#E9E9E9',
      stone30: '#E1E1E1',
      stone40: '#C9C9C9',
      stone50: '#AFAFAF',
      stone60: '#A5A5A5',
      stone70: '#949494',
      stone80: '#858585',
      stone90: '#7D7D7D',
      stone100: '#767676',
      stone110: '#6C6C6C',
      stone120: '#646464',
      stone130: '#585858',
      stone140: '#4E4E4E',
      stone150: '#414141',
      stone160: '#3A3A3A',
      stone170: '#333333',
      stone180: '#1A1A1A'
    },
    sky: {
      sky10: '#E9F6FF',
      sky20: '#D6EDFE',
      sky30: '#C7E6FC',
      sky40: '#97D1F8',
      sky50: '#63B9EB',
      sky60: '#50B0E3',
      sky70: '#349ED2',
      sky80: '#1E90C3',
      sky90: '#1A87B8',
      sky100: '#197EAB',
      sky110: '#17759F',
      sky120: '#116D94',
      sky130: '#0F5F82',
      sky140: '#0E5575',
      sky150: '#094762',
      sky160: '#084059',
      sky170: '#08384E',
      sky180: '#071D29'
    },
    honey: {
      honey10: '#FCF2E4',
      honey20: '#F7E7CF',
      honey30: '#F8DDB2',
      honey40: '#F0C16C',
      honey50: '#E0A300',
      honey60: '#D39901',
      honey70: '#BE8A01',
      honey80: '#AC7C00',
      honey90: '#A37600',
      honey100: '#996E00',
      honey110: '#8C6400',
      honey120: '#855F02',
      honey130: '#735200',
      honey140: '#664800',
      honey150: '#563D00',
      honey160: '#4D3600',
      honey170: '#432F01',
      honey180: '#221905'
    },
    sea: {
      sea10: '#E0F9FD',
      sea20: '#CFF0F6',
      sea30: '#BDE9F1',
      sea40: '#77D8E9',
      sea50: '#3CC0D4',
      sea60: '#07B7CB',
      sea70: '#04A4B7',
      sea80: '#0394A5',
      sea90: '#008C9C',
      sea100: '#00828E',
      sea110: '#027887',
      sea120: '#02717E',
      sea130: '#01626E',
      sea140: '#015862',
      sea150: '#014A53',
      sea160: '#00424A',
      sea170: '#023941',
      sea180: '#051E22'
    },
    aurora: {
      aurora10: '#D8FCEB',
      aurora20: '#C8F3DF',
      aurora30: '#B2EED3',
      aurora40: '#58E1AD',
      aurora50: '#2BC692',
      aurora60: '#0ABC88',
      aurora70: '#03A879',
      aurora80: '#06986E',
      aurora90: '#019067',
      aurora100: '#048660',
      aurora110: '#057C58',
      aurora120: '#007352',
      aurora130: '#026648',
      aurora140: '#035A40',
      aurora150: '#014B34',
      aurora160: '#01442F',
      aurora170: '#033B29',
      aurora180: '#051F15'
    },
    navy: {
      navy10: '#EEF4FD',
      navy20: '#E2EAF7',
      navy30: '#D5E2F6',
      navy40: '#B6CCEA',
      navy50: '#96B2D8',
      navy60: '#86A8D5',
      navy70: '#7097C7',
      navy80: '#5F89BB',
      navy90: '#5581B3',
      navy100: '#4C79AA',
      navy110: '#44709F',
      navy120: '#3E6895',
      navy130: '#345B84',
      navy140: '#2E5177',
      navy150: '#234465',
      navy160: '#213D5B',
      navy170: '#1D354F',
      navy180: '#061C30'
    },
    whiteOpacity10: 'rgba(255,255,255,0.1)',
    whiteOpacity20: 'rgba(255,255,255,0.2)',
    whiteOpacity75: 'rgba(255,255,255,0.75)',
    greyOpacity75: 'rgba(28,34,43,0.75)',
    navyOpacity10: 'rgba(35,68,101,0.1)',
    greyOpacity10: 'rgba(28,34,43,0.1)'
  },
  size: {
    size1: '0.0625rem',
    size2: '0.125rem',
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
  fontFamily: {
    lato: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
    inclusiveSans:
      'Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif',
    atkinson:
      'Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif',
    menlo: 'Menlo, Consolas, Monaco, "Andale Mono", monospace'
  },
  fontWeight: {
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
  },
  opacity50: 0.5,
  opacity100: 1
}
export default primitives
