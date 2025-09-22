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
    base: Primitives['color']['grey']['grey120']
    muted: Primitives['color']['grey']['grey90']
    page: Primitives['color']['grey']['grey120']
    container: Primitives['color']['grey']['grey110']
    success: Primitives['color']['green']['green100']
    error: Primitives['color']['red']['red100']
    warning: Primitives['color']['orange']['orange100']
    info: Primitives['color']['blue']['blue100']
    aiTopGradient: Primitives['color']['violet']['violet100']
    aiBottomGradient: Primitives['color']['sea']['sea100']
    divider: {
      base: Primitives['color']['grey']['grey90']
      onColor: Primitives['color']['grey']['grey120']
    }
    interactive: {
      input: {
        base: Primitives['color']['grey']['grey120']
        hover: Primitives['color']['grey']['grey110']
        readonly: Primitives['color']['grey']['grey100']
        disabled: Primitives['color']['grey']['grey100']
      }
      primary: {
        base: Primitives['color']['blue']['blue40']
        hover: Primitives['color']['blue']['blue30']
        active: Primitives['color']['blue']['blue50']
      }
      secondary: {
        base: Primitives['color']['grey']['grey60']
        hover: Primitives['color']['grey']['grey50']
        active: Primitives['color']['grey']['grey70']
      }
      destructive: {
        base: Primitives['color']['red']['red40']
        hover: Primitives['color']['red']['red30']
        active: Primitives['color']['red']['red50']
      }
    }
    accent: {
      color1: Primitives['color']['sky']['sky100']
      color2: Primitives['color']['aurora']['aurora100']
      color3: Primitives['color']['plum']['plum100']
      color4: Primitives['color']['honey']['honey100']
      color5: Primitives['color']['stone']['stone110']
      color6: Primitives['color']['stone']['stone70']
    }
  }
  stroke: {
    base: Primitives['color']['grey']['grey60']
    muted: Primitives['color']['grey']['grey90']
    success: Primitives['color']['green']['green40']
    error: Primitives['color']['red']['red40']
    warning: Primitives['color']['orange']['orange40']
    info: Primitives['color']['blue']['blue40']
    container: Primitives['color']['grey']['grey30']
    aiTopGradient: Primitives['color']['violet']['violet40']
    aiBottomGradient: Primitives['color']['sea']['sea40']
    interactive: {
      focusRing: {
        base: Primitives['color']['blue']['blue40']
        onColor: Primitives['color']['white']
      }
      input: {
        base: Primitives['color']['grey']['grey60']
        hover: Primitives['color']['grey']['grey40']
        readonly: Primitives['color']['grey']['grey110']
        disabled: Primitives['color']['grey']['grey80']
      }
      primary: {
        base: Primitives['color']['blue']['blue40']
        hover: Primitives['color']['blue']['blue30']
        active: Primitives['color']['blue']['blue50']
      }
      secondary: {
        base: Primitives['color']['grey']['grey60']
        hover: Primitives['color']['grey']['grey50']
        active: Primitives['color']['grey']['grey70']
      }
      destructive: {
        base: Primitives['color']['red']['red40']
        hover: Primitives['color']['red']['red30']
        active: Primitives['color']['red']['red50']
      }
    }
  }
  text: {
    base: Primitives['color']['white']
    muted: Primitives['color']['grey']['grey40']
    success: Primitives['color']['green']['green40']
    error: Primitives['color']['red']['red40']
    warning: Primitives['color']['orange']['orange40']
    info: Primitives['color']['blue']['blue40']
    onColor: Primitives['color']['white']
    interactive: {
      disabled: {
        base: Primitives['color']['grey']['grey50']
        onColor: Primitives['color']['grey']['grey40']
      }
      input: {
        base: Primitives['color']['white']
        hover: Primitives['color']['grey']['grey30']
        readonly: Primitives['color']['white']
        placeholder: Primitives['color']['grey']['grey40']
        disabled: Primitives['color']['grey']['grey40']
      }
      primary: {
        base: Primitives['color']['blue']['blue30']
        hover: Primitives['color']['blue']['blue20']
        active: Primitives['color']['blue']['blue40']
      }
      primaryOnColor: {
        base: Primitives['color']['blue']['blue10']
        hover: Primitives['color']['white']
        active: Primitives['color']['blue']['blue10']
      }
      secondary: {
        base: Primitives['color']['grey']['grey30']
        hover: Primitives['color']['grey']['grey20']
        active: Primitives['color']['grey']['grey40']
      }
      destructive: {
        base: Primitives['color']['red']['red30']
        hover: Primitives['color']['red']['red20']
        active: Primitives['color']['red']['red40']
      }
    }
    accent: {
      color1: Primitives['color']['sky']['sky30']
      color2: Primitives['color']['aurora']['aurora30']
      color3: Primitives['color']['plum']['plum30']
      color4: Primitives['color']['honey']['honey30']
      color5: Primitives['color']['stone']['stone30']
      color6: Primitives['color']['stone']['stone10']
    }
  }
  icon: {
    base: Primitives['color']['white']
    muted: Primitives['color']['grey']['grey40']
    success: Primitives['color']['green']['green40']
    error: Primitives['color']['red']['red40']
    warning: Primitives['color']['orange']['orange40']
    info: Primitives['color']['blue']['blue40']
    onColor: Primitives['color']['white']
    interactive: {
      disabled: {
        base: Primitives['color']['grey']['grey50']
        onColor: Primitives['color']['grey']['grey40']
      }
      primary: {
        base: Primitives['color']['blue']['blue30']
        hover: Primitives['color']['blue']['blue20']
        active: Primitives['color']['blue']['blue40']
      }
      primaryOnColor: {
        base: Primitives['color']['blue']['blue10']
        hover: Primitives['color']['white']
        active: Primitives['color']['blue']['blue10']
      }
      secondary: {
        base: Primitives['color']['grey']['grey30']
        hover: Primitives['color']['grey']['grey20']
        active: Primitives['color']['grey']['grey40']
      }
      destructive: {
        base: Primitives['color']['red']['red30']
        hover: Primitives['color']['red']['red20']
        active: Primitives['color']['red']['red40']
      }
    }
    accent: {
      color1: Primitives['color']['sky']['sky30']
      color2: Primitives['color']['aurora']['aurora30']
      color3: Primitives['color']['plum']['plum30']
      color4: Primitives['color']['honey']['honey30']
      color5: Primitives['color']['stone']['stone30']
      color6: Primitives['color']['stone']['stone10']
    }
  }
  size: {
    interactive: {
      height: {
        sm: Primitives['size']['size28']
        md: Primitives['size']['size40']
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
    space2xs: Primitives['size']['size2']
    spaceXs: Primitives['size']['size4']
    spaceSm: Primitives['size']['size8']
    spaceMd: Primitives['size']['size16']
    spaceLg: Primitives['size']['size24']
    spaceXl: Primitives['size']['size32']
    space2xl: Primitives['size']['size40']
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
    xs: Primitives['size']['size2']
    sm: Primitives['size']['size4']
    md: Primitives['size']['size8']
    lg: Primitives['size']['size12']
    xl: Primitives['size']['size16']
    full: string
    container: {
      sm: Primitives['size']['size8']
      md: Primitives['size']['size12']
      lg: Primitives['size']['size16']
    }
    interactive: { base: Primitives['size']['size12'] }
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
    heading: Primitives['fontFamily']['inclusiveSans']
    base: Primitives['fontFamily']['Atkinson']
    code: Primitives['fontFamily']['inclusiveSans']
  }
  fontWeight: {
    body: {
      base: Primitives['fontWeight']['regular']
      strong: Primitives['fontWeight']['semiBold']
    }
    heading: {
      base: Primitives['fontWeight']['semiBold']
      strong: Primitives['fontWeight']['bold']
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
      fontFamily: Primitives['fontFamily']['Atkinson']
      fontWeight: Primitives['fontWeight']['regular']
      fontSize: Primitives['size']['size14']
      lineHeight: Primitives['size']['size14']
    }
    medium: {
      fontFamily: Primitives['fontFamily']['Atkinson']
      fontWeight: Primitives['fontWeight']['regular']
      fontSize: Primitives['size']['size16']
      lineHeight: Primitives['size']['size16']
    }
    large: {
      fontFamily: Primitives['fontFamily']['Atkinson']
      fontWeight: Primitives['fontWeight']['regular']
      fontSize: Primitives['size']['size20']
      lineHeight: Primitives['size']['size20']
    }
  }
}

const semantics: Semantics = {
  background: {
    base: primitives.color.grey.grey120,
    muted: primitives.color.grey.grey90,
    page: primitives.color.grey.grey120,
    container: primitives.color.grey.grey110,
    success: primitives.color.green.green100,
    error: primitives.color.red.red100,
    warning: primitives.color.orange.orange100,
    info: primitives.color.blue.blue100,
    aiTopGradient: primitives.color.violet.violet100,
    aiBottomGradient: primitives.color.sea.sea100,
    divider: {
      base: primitives.color.grey.grey90,
      onColor: primitives.color.grey.grey120
    },
    interactive: {
      input: {
        base: primitives.color.grey.grey120,
        hover: primitives.color.grey.grey110,
        readonly: primitives.color.grey.grey100,
        disabled: primitives.color.grey.grey100
      },
      primary: {
        base: primitives.color.blue.blue40,
        hover: primitives.color.blue.blue30,
        active: primitives.color.blue.blue50
      },
      secondary: {
        base: primitives.color.grey.grey60,
        hover: primitives.color.grey.grey50,
        active: primitives.color.grey.grey70
      },
      destructive: {
        base: primitives.color.red.red40,
        hover: primitives.color.red.red30,
        active: primitives.color.red.red50
      }
    },
    accent: {
      color1: primitives.color.sky.sky100,
      color2: primitives.color.aurora.aurora100,
      color3: primitives.color.plum.plum100,
      color4: primitives.color.honey.honey100,
      color5: primitives.color.stone.stone110,
      color6: primitives.color.stone.stone70
    }
  },
  stroke: {
    base: primitives.color.grey.grey60,
    muted: primitives.color.grey.grey90,
    success: primitives.color.green.green40,
    error: primitives.color.red.red40,
    warning: primitives.color.orange.orange40,
    info: primitives.color.blue.blue40,
    container: primitives.color.grey.grey30,
    aiTopGradient: primitives.color.violet.violet40,
    aiBottomGradient: primitives.color.sea.sea40,
    interactive: {
      focusRing: {
        base: primitives.color.blue.blue40,
        onColor: primitives.color.white
      },
      input: {
        base: primitives.color.grey.grey60,
        hover: primitives.color.grey.grey40,
        readonly: primitives.color.grey.grey110,
        disabled: primitives.color.grey.grey80
      },
      primary: {
        base: primitives.color.blue.blue40,
        hover: primitives.color.blue.blue30,
        active: primitives.color.blue.blue50
      },
      secondary: {
        base: primitives.color.grey.grey60,
        hover: primitives.color.grey.grey50,
        active: primitives.color.grey.grey70
      },
      destructive: {
        base: primitives.color.red.red40,
        hover: primitives.color.red.red30,
        active: primitives.color.red.red50
      }
    }
  },
  text: {
    base: primitives.color.white,
    muted: primitives.color.grey.grey40,
    success: primitives.color.green.green40,
    error: primitives.color.red.red40,
    warning: primitives.color.orange.orange40,
    info: primitives.color.blue.blue40,
    onColor: primitives.color.white,
    interactive: {
      disabled: {
        base: primitives.color.grey.grey50,
        onColor: primitives.color.grey.grey40
      },
      input: {
        base: primitives.color.white,
        hover: primitives.color.grey.grey30,
        readonly: primitives.color.white,
        placeholder: primitives.color.grey.grey40,
        disabled: primitives.color.grey.grey40
      },
      primary: {
        base: primitives.color.blue.blue30,
        hover: primitives.color.blue.blue20,
        active: primitives.color.blue.blue40
      },
      primaryOnColor: {
        base: primitives.color.blue.blue10,
        hover: primitives.color.white,
        active: primitives.color.blue.blue10
      },
      secondary: {
        base: primitives.color.grey.grey30,
        hover: primitives.color.grey.grey20,
        active: primitives.color.grey.grey40
      },
      destructive: {
        base: primitives.color.red.red30,
        hover: primitives.color.red.red20,
        active: primitives.color.red.red40
      }
    },
    accent: {
      color1: primitives.color.sky.sky30,
      color2: primitives.color.aurora.aurora30,
      color3: primitives.color.plum.plum30,
      color4: primitives.color.honey.honey30,
      color5: primitives.color.stone.stone30,
      color6: primitives.color.stone.stone10
    }
  },
  icon: {
    base: primitives.color.white,
    muted: primitives.color.grey.grey40,
    success: primitives.color.green.green40,
    error: primitives.color.red.red40,
    warning: primitives.color.orange.orange40,
    info: primitives.color.blue.blue40,
    onColor: primitives.color.white,
    interactive: {
      disabled: {
        base: primitives.color.grey.grey50,
        onColor: primitives.color.grey.grey40
      },
      primary: {
        base: primitives.color.blue.blue30,
        hover: primitives.color.blue.blue20,
        active: primitives.color.blue.blue40
      },
      primaryOnColor: {
        base: primitives.color.blue.blue10,
        hover: primitives.color.white,
        active: primitives.color.blue.blue10
      },
      secondary: {
        base: primitives.color.grey.grey30,
        hover: primitives.color.grey.grey20,
        active: primitives.color.grey.grey40
      },
      destructive: {
        base: primitives.color.red.red30,
        hover: primitives.color.red.red20,
        active: primitives.color.red.red40
      }
    },
    accent: {
      color1: primitives.color.sky.sky30,
      color2: primitives.color.aurora.aurora30,
      color3: primitives.color.plum.plum30,
      color4: primitives.color.honey.honey30,
      color5: primitives.color.stone.stone30,
      color6: primitives.color.stone.stone10
    }
  },
  size: {
    interactive: {
      height: {
        sm: primitives.size.size28,
        md: primitives.size.size40,
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
    space2xs: primitives.size.size2,
    spaceXs: primitives.size.size4,
    spaceSm: primitives.size.size8,
    spaceMd: primitives.size.size16,
    spaceLg: primitives.size.size24,
    spaceXl: primitives.size.size32,
    space2xl: primitives.size.size40,
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
    xs: primitives.size.size2,
    sm: primitives.size.size4,
    md: primitives.size.size8,
    lg: primitives.size.size12,
    xl: primitives.size.size16,
    full: '999px',
    container: {
      sm: primitives.size.size8,
      md: primitives.size.size12,
      lg: primitives.size.size16
    },
    interactive: { base: primitives.size.size12 }
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
    heading: primitives.fontFamily.inclusiveSans,
    base: primitives.fontFamily.Atkinson,
    code: primitives.fontFamily.inclusiveSans
  },
  fontWeight: {
    body: {
      base: primitives.fontWeight.regular,
      strong: primitives.fontWeight.semiBold
    },
    heading: {
      base: primitives.fontWeight.semiBold,
      strong: primitives.fontWeight.bold
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
  visibleInCanvas: 'false',
  visibleInRebrand: 'true',
  input: {
    small: {
      fontFamily: primitives.fontFamily.Atkinson,
      fontWeight: primitives.fontWeight.regular,
      fontSize: primitives.size.size14,
      lineHeight: primitives.size.size14
    },
    medium: {
      fontFamily: primitives.fontFamily.Atkinson,
      fontWeight: primitives.fontWeight.regular,
      fontSize: primitives.size.size16,
      lineHeight: primitives.size.size16
    },
    large: {
      fontFamily: primitives.fontFamily.Atkinson,
      fontWeight: primitives.fontWeight.regular,
      fontSize: primitives.size.size20,
      lineHeight: primitives.size.size20
    }
  }
}
export default semantics
