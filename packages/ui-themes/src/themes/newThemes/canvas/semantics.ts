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
    page: Primitives['color']['grey']['grey10']
    container: Primitives['color']['white']
    success: Primitives['color']['green']['green70']
    error: Primitives['color']['red']['red70']
    warning: Primitives['color']['orange']['orange70']
    info: Primitives['color']['blue']['blue70']
    aiBottomGradient: Primitives['color']['sea']['sea70']
    aiTopGradient: Primitives['color']['violet']['violet70']
    divider: {
      base: Primitives['color']['grey']['grey30']
      onColor: Primitives['color']['white']
    }
    interactive: {
      input: {
        base: Primitives['color']['white']
        hover: Primitives['color']['white']
        readonly: Primitives['color']['white']
        disabled: Primitives['color']['white']
      }
      primary: {
        base: Primitives['color']['blue']['blue70']
        hover: Primitives['color']['blue']['blue60']
        active: Primitives['color']['blue']['blue80']
      }
      secondary: {
        base: Primitives['color']['grey']['grey70']
        hover: Primitives['color']['grey']['grey60']
        active: Primitives['color']['grey']['grey80']
      }
      destructive: {
        base: Primitives['color']['red']['red70']
        hover: Primitives['color']['red']['red60']
        active: Primitives['color']['red']['red80']
      }
    }
    accent: {
      color1: Primitives['color']['blue']['blue70']
      color2: Primitives['color']['green']['green70']
      color3: Primitives['color']['red']['red70']
      color4: Primitives['color']['orange']['orange70']
      color5: Primitives['color']['grey']['grey110']
      color6: Primitives['color']['grey']['grey70']
    }
  }
  stroke: {
    base: Primitives['color']['grey']['grey50']
    muted: Primitives['color']['grey']['grey20']
    success: Primitives['color']['green']['green70']
    error: Primitives['color']['red']['red70']
    warning: Primitives['color']['orange']['orange70']
    info: Primitives['color']['blue']['blue70']
    container: Primitives['color']['grey']['grey30']
    aiTopGradient: Primitives['color']['violet']['violet70']
    aiBottomGradient: Primitives['color']['sea']['sea70']
    interactive: {
      focusRing: {
        base: Primitives['color']['blue']['blue70']
        onColor: Primitives['color']['white']
      }
      input: {
        base: Primitives['color']['grey']['grey50']
        hover: Primitives['color']['grey']['grey50']
        readonly: Primitives['color']['grey']['grey50']
        disabled: Primitives['color']['grey']['grey30']
      }
      primary: {
        base: Primitives['color']['blue']['blue70']
        hover: Primitives['color']['blue']['blue60']
        active: Primitives['color']['blue']['blue80']
      }
      secondary: {
        base: Primitives['color']['grey']['grey70']
        hover: Primitives['color']['grey']['grey60']
        active: Primitives['color']['grey']['grey80']
      }
      destructive: {
        base: Primitives['color']['red']['red70']
        hover: Primitives['color']['red']['red60']
        active: Primitives['color']['red']['red80']
      }
    }
  }
  text: {
    base: Primitives['color']['grey']['grey120']
    muted: Primitives['color']['grey']['grey80']
    success: Primitives['color']['green']['green70']
    error: Primitives['color']['red']['red70']
    warning: Primitives['color']['orange']['orange70']
    info: Primitives['color']['blue']['blue70']
    onColor: Primitives['color']['white']
    interactive: {
      disabled: {
        base: Primitives['color']['grey']['grey50']
        onColor: Primitives['color']['grey']['grey30']
      }
      input: {
        base: Primitives['color']['grey']['grey120']
        hover: Primitives['color']['grey']['grey120']
        readonly: Primitives['color']['grey']['grey120']
        placeholder: Primitives['color']['grey']['grey60']
        disabled: Primitives['color']['grey']['grey50']
      }
      primary: {
        base: Primitives['color']['blue']['blue70']
        hover: Primitives['color']['blue']['blue60']
        active: Primitives['color']['blue']['blue80']
      }
      primaryOnColor: {
        base: Primitives['color']['white']
        hover: Primitives['color']['blue']['blue10']
        active: Primitives['color']['blue']['blue10']
      }
      secondary: {
        base: Primitives['color']['grey']['grey100']
        hover: Primitives['color']['grey']['grey100']
        active: Primitives['color']['grey']['grey100']
      }
      destructive: {
        base: Primitives['color']['red']['red70']
        hover: Primitives['color']['red']['red60']
        active: Primitives['color']['red']['red80']
      }
    }
    accent: {
      color1: Primitives['color']['blue']['blue70']
      color2: Primitives['color']['green']['green70']
      color3: Primitives['color']['red']['red70']
      color4: Primitives['color']['orange']['orange70']
      color5: Primitives['color']['grey']['grey110']
      color6: Primitives['color']['grey']['grey70']
    }
  }
  icon: {
    base: Primitives['color']['grey']['grey110']
    muted: Primitives['color']['grey']['grey70']
    success: Primitives['color']['green']['green70']
    error: Primitives['color']['red']['red70']
    warning: Primitives['color']['orange']['orange70']
    info: Primitives['color']['blue']['blue70']
    onColor: Primitives['color']['white']
    interactive: {
      disabled: {
        base: Primitives['color']['grey']['grey50']
        onColor: Primitives['color']['grey']['grey30']
      }
      primary: {
        base: Primitives['color']['blue']['blue70']
        hover: Primitives['color']['blue']['blue60']
        active: Primitives['color']['blue']['blue80']
      }
      primaryOnColor: {
        base: Primitives['color']['white']
        hover: Primitives['color']['blue']['blue10']
        active: Primitives['color']['blue']['blue10']
      }
      secondary: {
        base: Primitives['color']['grey']['grey100']
        hover: Primitives['color']['grey']['grey100']
        active: Primitives['color']['grey']['grey100']
      }
      destructive: {
        base: Primitives['color']['red']['red70']
        hover: Primitives['color']['red']['red60']
        active: Primitives['color']['red']['red80']
      }
    }
    accent: {
      color1: Primitives['color']['blue']['blue70']
      color2: Primitives['color']['green']['green70']
      color3: Primitives['color']['red']['red70']
      color4: Primitives['color']['orange']['orange70']
      color5: Primitives['color']['grey']['grey110']
      color6: Primitives['color']['grey']['grey70']
    }
  }
  size: {
    interactive: {
      height: {
        sm: Primitives['size']['size28']
        md: string
        lg: Primitives['size']['size48']
      }
    }
    icon: {
      xs: Primitives['size']['size12']
      sm: Primitives['size']['size16']
      md: Primitives['size']['size20']
      lg: Primitives['size']['size24']
      xl: Primitives['size']['size32']
      xxl: Primitives['size']['size36']
    }
  }
  spacing: {
    xs: Primitives['size']['size4']
    sm: Primitives['size']['size8']
    md: Primitives['size']['size16']
    lg: Primitives['size']['size24']
    xl: Primitives['size']['size32']
    xxl: Primitives['size']['size40']
    between: {
      sections: Primitives['size']['size48']
      cards: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
      }
      inputs: {
        horizontal: Primitives['size']['size12']
        vertical: Primitives['size']['size16']
      }
      inputElements: Primitives['size']['size12']
    }
    padding: {
      container: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size32']
      }
      interactive: { horizontal: Primitives['size']['size12'] }
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
    interactive: { base: Primitives['size']['size4'] }
  }
  borderWidth: {
    sm: Primitives['size']['size1']
    md: Primitives['size']['size2']
    lg: Primitives['size']['size4']
    icon: {
      xs: Primitives['size']['size1']
      sm: Primitives['additionalSize']['size1_25']
      md: Primitives['additionalSize']['size1_5']
      lg: Primitives['size']['size2']
      xl: Primitives['additionalSize']['size2_5']
      xxl: Primitives['additionalSize']['size3']
    }
    interactive: {
      base: Primitives['size']['size1']
      focus: Primitives['size']['size2']
    }
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
      textSm: Primitives['size']['size14']
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
    textSm: Primitives['size']['size14']
    textBase: Primitives['size']['size16']
    textLg: Primitives['size']['size20']
    textXl: Primitives['size']['size24']
    text2xl: Primitives['size']['size28']
    text3xl: Primitives['size']['size32']
    text4xl: Primitives['size']['size36']
  }
  visibleInCanvas: string
  visibleInRebrand: string
  input: {
    small: {
      fontFamily: Primitives['fontFamilies']['lato']
      fontWeight: Primitives['fontWeights']['regular']
      fontSize: Primitives['size']['size14']
      lineHeight: Primitives['size']['size14']
    }
    medium: {
      fontFamily: Primitives['fontFamilies']['lato']
      fontWeight: Primitives['fontWeights']['regular']
      fontSize: Primitives['size']['size16']
      lineHeight: Primitives['size']['size16']
    }
    large: {
      fontFamily: Primitives['fontFamilies']['lato']
      fontWeight: Primitives['fontWeights']['regular']
      fontSize: Primitives['size']['size20']
      lineHeight: Primitives['size']['size20']
    }
  }
}

const semantics: Semantics = {
  background: {
    base: primitives.color.white,
    muted: primitives.color.grey.grey10,
    page: primitives.color.grey.grey10,
    container: primitives.color.white,
    success: primitives.color.green.green70,
    error: primitives.color.red.red70,
    warning: primitives.color.orange.orange70,
    info: primitives.color.blue.blue70,
    aiBottomGradient: primitives.color.sea.sea70,
    aiTopGradient: primitives.color.violet.violet70,
    divider: {
      base: primitives.color.grey.grey30,
      onColor: primitives.color.white
    },
    interactive: {
      input: {
        base: primitives.color.white,
        hover: primitives.color.white,
        readonly: primitives.color.white,
        disabled: primitives.color.white
      },
      primary: {
        base: primitives.color.blue.blue70,
        hover: primitives.color.blue.blue60,
        active: primitives.color.blue.blue80
      },
      secondary: {
        base: primitives.color.grey.grey70,
        hover: primitives.color.grey.grey60,
        active: primitives.color.grey.grey80
      },
      destructive: {
        base: primitives.color.red.red70,
        hover: primitives.color.red.red60,
        active: primitives.color.red.red80
      }
    },
    accent: {
      color1: primitives.color.blue.blue70,
      color2: primitives.color.green.green70,
      color3: primitives.color.red.red70,
      color4: primitives.color.orange.orange70,
      color5: primitives.color.grey.grey110,
      color6: primitives.color.grey.grey70
    }
  },
  stroke: {
    base: primitives.color.grey.grey50,
    muted: primitives.color.grey.grey20,
    success: primitives.color.green.green70,
    error: primitives.color.red.red70,
    warning: primitives.color.orange.orange70,
    info: primitives.color.blue.blue70,
    container: primitives.color.grey.grey30,
    aiTopGradient: primitives.color.violet.violet70,
    aiBottomGradient: primitives.color.sea.sea70,
    interactive: {
      focusRing: {
        base: primitives.color.blue.blue70,
        onColor: primitives.color.white
      },
      input: {
        base: primitives.color.grey.grey50,
        hover: primitives.color.grey.grey50,
        readonly: primitives.color.grey.grey50,
        disabled: primitives.color.grey.grey30
      },
      primary: {
        base: primitives.color.blue.blue70,
        hover: primitives.color.blue.blue60,
        active: primitives.color.blue.blue80
      },
      secondary: {
        base: primitives.color.grey.grey70,
        hover: primitives.color.grey.grey60,
        active: primitives.color.grey.grey80
      },
      destructive: {
        base: primitives.color.red.red70,
        hover: primitives.color.red.red60,
        active: primitives.color.red.red80
      }
    }
  },
  text: {
    base: primitives.color.grey.grey120,
    muted: primitives.color.grey.grey80,
    success: primitives.color.green.green70,
    error: primitives.color.red.red70,
    warning: primitives.color.orange.orange70,
    info: primitives.color.blue.blue70,
    onColor: primitives.color.white,
    interactive: {
      disabled: {
        base: primitives.color.grey.grey50,
        onColor: primitives.color.grey.grey30
      },
      input: {
        base: primitives.color.grey.grey120,
        hover: primitives.color.grey.grey120,
        readonly: primitives.color.grey.grey120,
        placeholder: primitives.color.grey.grey60,
        disabled: primitives.color.grey.grey50
      },
      primary: {
        base: primitives.color.blue.blue70,
        hover: primitives.color.blue.blue60,
        active: primitives.color.blue.blue80
      },
      primaryOnColor: {
        base: primitives.color.white,
        hover: primitives.color.blue.blue10,
        active: primitives.color.blue.blue10
      },
      secondary: {
        base: primitives.color.grey.grey100,
        hover: primitives.color.grey.grey100,
        active: primitives.color.grey.grey100
      },
      destructive: {
        base: primitives.color.red.red70,
        hover: primitives.color.red.red60,
        active: primitives.color.red.red80
      }
    },
    accent: {
      color1: primitives.color.blue.blue70,
      color2: primitives.color.green.green70,
      color3: primitives.color.red.red70,
      color4: primitives.color.orange.orange70,
      color5: primitives.color.grey.grey110,
      color6: primitives.color.grey.grey70
    }
  },
  icon: {
    base: primitives.color.grey.grey110,
    muted: primitives.color.grey.grey70,
    success: primitives.color.green.green70,
    error: primitives.color.red.red70,
    warning: primitives.color.orange.orange70,
    info: primitives.color.blue.blue70,
    onColor: primitives.color.white,
    interactive: {
      disabled: {
        base: primitives.color.grey.grey50,
        onColor: primitives.color.grey.grey30
      },
      primary: {
        base: primitives.color.blue.blue70,
        hover: primitives.color.blue.blue60,
        active: primitives.color.blue.blue80
      },
      primaryOnColor: {
        base: primitives.color.white,
        hover: primitives.color.blue.blue10,
        active: primitives.color.blue.blue10
      },
      secondary: {
        base: primitives.color.grey.grey100,
        hover: primitives.color.grey.grey100,
        active: primitives.color.grey.grey100
      },
      destructive: {
        base: primitives.color.red.red70,
        hover: primitives.color.red.red60,
        active: primitives.color.red.red80
      }
    },
    accent: {
      color1: primitives.color.blue.blue70,
      color2: primitives.color.green.green70,
      color3: primitives.color.red.red70,
      color4: primitives.color.orange.orange70,
      color5: primitives.color.grey.grey110,
      color6: primitives.color.grey.grey70
    }
  },
  size: {
    interactive: {
      height: {
        sm: primitives.size.size28,
        md: '2.375 rem',
        lg: primitives.size.size48
      }
    },
    icon: {
      xs: primitives.size.size12,
      sm: primitives.size.size16,
      md: primitives.size.size20,
      lg: primitives.size.size24,
      xl: primitives.size.size32,
      xxl: primitives.size.size36
    }
  },
  spacing: {
    xs: primitives.size.size4,
    sm: primitives.size.size8,
    md: primitives.size.size16,
    lg: primitives.size.size24,
    xl: primitives.size.size32,
    xxl: primitives.size.size40,
    between: {
      sections: primitives.size.size48,
      cards: { sm: primitives.size.size16, md: primitives.size.size24 },
      inputs: {
        horizontal: primitives.size.size12,
        vertical: primitives.size.size16
      },
      inputElements: primitives.size.size12
    },
    padding: {
      container: {
        sm: primitives.size.size16,
        md: primitives.size.size24,
        lg: primitives.size.size32
      },
      interactive: { horizontal: primitives.size.size12 }
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
    interactive: { base: primitives.size.size4 }
  },
  borderWidth: {
    sm: primitives.size.size1,
    md: primitives.size.size2,
    lg: primitives.size.size4,
    icon: {
      xs: primitives.size.size1,
      sm: primitives.additionalSize.size1_25,
      md: primitives.additionalSize.size1_5,
      lg: primitives.size.size2,
      xl: primitives.additionalSize.size2_5,
      xxl: primitives.additionalSize.size3
    },
    interactive: { base: primitives.size.size1, focus: primitives.size.size2 }
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
      textSm: primitives.size.size14,
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
    textSm: primitives.size.size14,
    textBase: primitives.size.size16,
    textLg: primitives.size.size20,
    textXl: primitives.size.size24,
    text2xl: primitives.size.size28,
    text3xl: primitives.size.size32,
    text4xl: primitives.size.size36
  },
  visibleInCanvas: 'true',
  visibleInRebrand: 'false',
  input: {
    small: {
      fontFamily: primitives.fontFamilies.lato,
      fontWeight: primitives.fontWeights.regular,
      fontSize: primitives.size.size14,
      lineHeight: primitives.size.size14
    },
    medium: {
      fontFamily: primitives.fontFamilies.lato,
      fontWeight: primitives.fontWeights.regular,
      fontSize: primitives.size.size16,
      lineHeight: primitives.size.size16
    },
    large: {
      fontFamily: primitives.fontFamilies.lato,
      fontWeight: primitives.fontWeights.regular,
      fontSize: primitives.size.size20,
      lineHeight: primitives.size.size20
    }
  }
}
export default semantics
