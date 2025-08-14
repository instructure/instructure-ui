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

import primitives from './primitives.js'
import type { Primitives } from './primitives.js'

export type Semantics = {
  background: {
    base: Primitives['color']['white']
    muted: Primitives['color']['grey']['grey10']
    success: Primitives['color']['green']['green100']
    warning: Primitives['color']['orange']['orange100']
    error: Primitives['color']['red']['red100']
    info: Primitives['color']['blue']['blue100']
    aiTopGradient: Primitives['color']['violet']['violet100']
    aiBottomGradient: Primitives['color']['sea']['sea100']
    divider: {
      base: Primitives['color']['grey']['grey30']
      onColor: Primitives['color']['white']
    }
    page: Primitives['color']['grey']['grey10']
    container: Primitives['color']['white']
    interactive: {
      primary: {
        base: Primitives['color']['blue']['blue100']
        hover: Primitives['color']['blue']['blue90']
        active: Primitives['color']['blue']['blue110']
      }
      secondary: {
        base: Primitives['color']['grey']['grey100']
        hover: Primitives['color']['grey']['grey90']
        active: Primitives['color']['grey']['grey110']
      }
      destructive: {
        base: Primitives['color']['red']['red100']
        hover: Primitives['color']['red']['red90']
        active: Primitives['color']['red']['red110']
      }
    }
  }
  stroke: {
    base: Primitives['color']['grey']['grey90']
    muted: Primitives['color']['grey']['grey20']
    success: Primitives['color']['green']['green100']
    warning: Primitives['color']['orange']['orange100']
    error: Primitives['color']['red']['red100']
    info: Primitives['color']['blue']['blue100']
    container: Primitives['color']['grey']['grey30']
    aiTopGradient: Primitives['color']['violet']['violet100']
    aiBottomGradient: Primitives['color']['sea']['sea100']
    interactive: {
      primary: {
        base: Primitives['color']['blue']['blue100']
        hover: Primitives['color']['blue']['blue90']
        active: Primitives['color']['blue']['blue110']
      }
      secondary: {
        base: Primitives['color']['grey']['grey100']
        hover: Primitives['color']['grey']['grey90']
        active: Primitives['color']['grey']['grey110']
      }
      destructive: {
        base: Primitives['color']['red']['red100']
        hover: Primitives['color']['red']['red90']
        active: Primitives['color']['red']['red110']
      }
    }
    focusRing: Primitives['color']['blue']['blue90']
  }
  text: {
    base: Primitives['color']['grey']['grey120']
    muted: Primitives['color']['grey']['grey90']
    placeholder: Primitives['color']['grey']['grey70']
    disabled: Primitives['color']['grey']['grey60']
    success: Primitives['color']['green']['green100']
    warning: Primitives['color']['orange']['orange100']
    error: Primitives['color']['red']['red100']
    info: Primitives['color']['blue']['blue100']
    onColor: Primitives['color']['white']
    interactive: {
      primary: {
        base: Primitives['color']['blue']['blue100']
        hover: Primitives['color']['blue']['blue90']
        active: Primitives['color']['blue']['blue110']
      }
      secondary: {
        base: Primitives['color']['grey']['grey120']
        hover: Primitives['color']['grey']['grey120']
        active: Primitives['color']['grey']['grey120']
      }
      destructive: {
        base: Primitives['color']['red']['red100']
        hover: Primitives['color']['red']['red90']
        active: Primitives['color']['red']['red110']
      }
    }
  }
  icon: {
    base: Primitives['color']['grey']['grey120']
    muted: Primitives['color']['grey']['grey100']
    disabled: Primitives['color']['grey']['grey60']
    success: Primitives['color']['green']['green100']
    warning: Primitives['color']['orange']['orange100']
    error: Primitives['color']['red']['red100']
    info: Primitives['color']['blue']['blue100']
    onColor: Primitives['color']['white']
    interactive: {
      primary: {
        base: Primitives['color']['blue']['blue100']
        hover: Primitives['color']['blue']['blue90']
        active: Primitives['color']['blue']['blue110']
      }
      secondary: {
        base: Primitives['color']['grey']['grey100']
        hover: Primitives['color']['grey']['grey100']
        active: Primitives['color']['grey']['grey100']
      }
      destructive: {
        base: Primitives['color']['red']['red100']
        hover: Primitives['color']['red']['red90']
        active: Primitives['color']['red']['red110']
      }
    }
  }
  size: {
    interactive: {
      height: {
        sm: Primitives['size']['size32']
        md: Primitives['size']['size40']
        lg: Primitives['size']['size48']
      }
    }
    icon: {
      xs: Primitives['size']['size8']
      sm: Primitives['size']['size12']
      md: Primitives['size']['size16']
      lg: Primitives['size']['size24']
    }
  }
  space: {
    xs: Primitives['size']['size4']
    sm: Primitives['size']['size8']
    md: Primitives['size']['size16']
    lg: Primitives['size']['size24']
    xl: Primitives['size']['size32']
    xxl: Primitives['size']['size40']
    layout: {
      betweenSections: Primitives['size']['size48']
      betweenCards: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
      }
      betweenInputs: {
        horizontal: Primitives['size']['size12']
        vertical: Primitives['size']['size16']
      }
    }
    padding: {
      container: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size32']
      }
      interactive: { horizontal: Primitives['size']['size16'] }
    }
  }
  borderRadius: {
    xs: Primitives['size']['size4']
    sm: Primitives['size']['size4']
    md: Primitives['size']['size4']
    lg: Primitives['size']['size4']
    xl: Primitives['size']['size4']
    full: string
    container: {
      sm: Primitives['size']['size4']
      md: Primitives['size']['size4']
      lg: Primitives['size']['size4']
    }
    interactive: { default: Primitives['size']['size4'] }
  }
  borderWidth: {
    sm: Primitives['size']['size1']
    md: Primitives['size']['size2']
    lg: Primitives['size']['size4']
  }
  fontFamily: {
    heading: Primitives['fontFamilies']['lato']
    base: Primitives['fontFamilies']['lato']
    code: Primitives['fontFamilies']['lato']
  }
  fontWeight: {
    body: {
      base: Primitives['fontWeights']['regular']
      strong: Primitives['fontWeights']['bold']
    }
    heading: {
      base: Primitives['fontWeights']['semiBold']
      strong: Primitives['fontWeights']['bold']
    }
  }
  lineHeight: {
    paragraph: {
      textXs: Primitives['size']['size20']
      textSm: Primitives['size']['size20']
      textBase: Primitives['size']['size24']
    }
    standalone: {
      textXs: Primitives['size']['size12']
      textSm: string
      textBase: Primitives['size']['size16']
      textLg: Primitives['size']['size20']
      textXl: Primitives['size']['size24']
      text2xl: Primitives['size']['size28']
      text3xl: Primitives['size']['size32']
      text4xl: Primitives['size']['size36']
    }
    heading: {
      textLg: Primitives['size']['size28']
      textXl: Primitives['size']['size32']
      text2xl: Primitives['size']['size36']
      text3xl: Primitives['size']['size40']
    }
  }
  fontSize: {
    textXs: Primitives['size']['size12']
    textSm: string
    textBase: Primitives['size']['size16']
    textLg: Primitives['size']['size20']
    textXl: Primitives['size']['size24']
    text2xl: Primitives['size']['size28']
    text3xl: Primitives['size']['size32']
    text4xl: Primitives['size']['size36']
  }
  visibleInCanvas: string
  visibleInRebrand: string
}

const semantics: Semantics = {
  background: {
    base: primitives.color.white,
    muted: primitives.color.grey.grey10,
    success: primitives.color.green.green100,
    warning: primitives.color.orange.orange100,
    error: primitives.color.red.red100,
    info: primitives.color.blue.blue100,
    aiTopGradient: primitives.color.violet.violet100,
    aiBottomGradient: primitives.color.sea.sea100,
    divider: {
      base: primitives.color.grey.grey30,
      onColor: primitives.color.white
    },
    page: primitives.color.grey.grey10,
    container: primitives.color.white,
    interactive: {
      primary: {
        base: primitives.color.blue.blue100,
        hover: primitives.color.blue.blue90,
        active: primitives.color.blue.blue110
      },
      secondary: {
        base: primitives.color.grey.grey100,
        hover: primitives.color.grey.grey90,
        active: primitives.color.grey.grey110
      },
      destructive: {
        base: primitives.color.red.red100,
        hover: primitives.color.red.red90,
        active: primitives.color.red.red110
      }
    }
  },
  stroke: {
    base: primitives.color.grey.grey90,
    muted: primitives.color.grey.grey20,
    success: primitives.color.green.green100,
    warning: primitives.color.orange.orange100,
    error: primitives.color.red.red100,
    info: primitives.color.blue.blue100,
    container: primitives.color.grey.grey30,
    aiTopGradient: primitives.color.violet.violet100,
    aiBottomGradient: primitives.color.sea.sea100,
    interactive: {
      primary: {
        base: primitives.color.blue.blue100,
        hover: primitives.color.blue.blue90,
        active: primitives.color.blue.blue110
      },
      secondary: {
        base: primitives.color.grey.grey100,
        hover: primitives.color.grey.grey90,
        active: primitives.color.grey.grey110
      },
      destructive: {
        base: primitives.color.red.red100,
        hover: primitives.color.red.red90,
        active: primitives.color.red.red110
      }
    },
    focusRing: primitives.color.blue.blue90
  },
  text: {
    base: primitives.color.grey.grey120,
    muted: primitives.color.grey.grey90,
    placeholder: primitives.color.grey.grey70,
    disabled: primitives.color.grey.grey60,
    success: primitives.color.green.green100,
    warning: primitives.color.orange.orange100,
    error: primitives.color.red.red100,
    info: primitives.color.blue.blue100,
    onColor: primitives.color.white,
    interactive: {
      primary: {
        base: primitives.color.blue.blue100,
        hover: primitives.color.blue.blue90,
        active: primitives.color.blue.blue110
      },
      secondary: {
        base: primitives.color.grey.grey120,
        hover: primitives.color.grey.grey120,
        active: primitives.color.grey.grey120
      },
      destructive: {
        base: primitives.color.red.red100,
        hover: primitives.color.red.red90,
        active: primitives.color.red.red110
      }
    }
  },
  icon: {
    base: primitives.color.grey.grey120,
    muted: primitives.color.grey.grey100,
    disabled: primitives.color.grey.grey60,
    success: primitives.color.green.green100,
    warning: primitives.color.orange.orange100,
    error: primitives.color.red.red100,
    info: primitives.color.blue.blue100,
    onColor: primitives.color.white,
    interactive: {
      primary: {
        base: primitives.color.blue.blue100,
        hover: primitives.color.blue.blue90,
        active: primitives.color.blue.blue110
      },
      secondary: {
        base: primitives.color.grey.grey100,
        hover: primitives.color.grey.grey100,
        active: primitives.color.grey.grey100
      },
      destructive: {
        base: primitives.color.red.red100,
        hover: primitives.color.red.red90,
        active: primitives.color.red.red110
      }
    }
  },
  size: {
    interactive: {
      height: {
        sm: primitives.size.size32,
        md: primitives.size.size40,
        lg: primitives.size.size48
      }
    },
    icon: {
      xs: primitives.size.size8,
      sm: primitives.size.size12,
      md: primitives.size.size16,
      lg: primitives.size.size24
    }
  },
  space: {
    xs: primitives.size.size4,
    sm: primitives.size.size8,
    md: primitives.size.size16,
    lg: primitives.size.size24,
    xl: primitives.size.size32,
    xxl: primitives.size.size40,
    layout: {
      betweenSections: primitives.size.size48,
      betweenCards: { sm: primitives.size.size16, md: primitives.size.size24 },
      betweenInputs: {
        horizontal: primitives.size.size12,
        vertical: primitives.size.size16
      }
    },
    padding: {
      container: {
        sm: primitives.size.size16,
        md: primitives.size.size24,
        lg: primitives.size.size32
      },
      interactive: { horizontal: primitives.size.size16 }
    }
  },
  borderRadius: {
    xs: primitives.size.size4,
    sm: primitives.size.size4,
    md: primitives.size.size4,
    lg: primitives.size.size4,
    xl: primitives.size.size4,
    full: '999px',
    container: {
      sm: primitives.size.size4,
      md: primitives.size.size4,
      lg: primitives.size.size4
    },
    interactive: { default: primitives.size.size4 }
  },
  borderWidth: {
    sm: primitives.size.size1,
    md: primitives.size.size2,
    lg: primitives.size.size4
  },
  fontFamily: {
    heading: primitives.fontFamilies.lato,
    base: primitives.fontFamilies.lato,
    code: primitives.fontFamilies.lato
  },
  fontWeight: {
    body: {
      base: primitives.fontWeights.regular,
      strong: primitives.fontWeights.bold
    },
    heading: {
      base: primitives.fontWeights.semiBold,
      strong: primitives.fontWeights.bold
    }
  },
  lineHeight: {
    paragraph: {
      textXs: primitives.size.size20,
      textSm: primitives.size.size20,
      textBase: primitives.size.size24
    },
    standalone: {
      textXs: primitives.size.size12,
      textSm: '14px',
      textBase: primitives.size.size16,
      textLg: primitives.size.size20,
      textXl: primitives.size.size24,
      text2xl: primitives.size.size28,
      text3xl: primitives.size.size32,
      text4xl: primitives.size.size36
    },
    heading: {
      textLg: primitives.size.size28,
      textXl: primitives.size.size32,
      text2xl: primitives.size.size36,
      text3xl: primitives.size.size40
    }
  },
  fontSize: {
    textXs: primitives.size.size12,
    textSm: '14px',
    textBase: primitives.size.size16,
    textLg: primitives.size.size20,
    textXl: primitives.size.size24,
    text2xl: primitives.size.size28,
    text3xl: primitives.size.size32,
    text4xl: primitives.size.size36
  },
  visibleInCanvas: 'true',
  visibleInRebrand: 'false'
}
export default semantics
