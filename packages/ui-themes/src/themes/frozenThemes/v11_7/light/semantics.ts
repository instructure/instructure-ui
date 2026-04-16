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

import type { Primitives } from './primitives'

export type Semantics = {
  color: {
    background: {
      base: Primitives['color']['white']
      muted: Primitives['color']['grey']['grey10']
      mutedHover: Primitives['color']['grey']['grey20']
      page: Primitives['color']['grey']['grey10']
      container: Primitives['color']['white']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey150']
      dark: Primitives['color']['grey']['grey170']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['navy']['navy170']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      aiText: Primitives['color']['violet']['violet20']
      opacity: Primitives['color']['navyOpacity10']
      opacityOnColor: Primitives['color']['whiteOpacity10']
      divider: {
        base: Primitives['color']['grey']['grey40']
        onColor: Primitives['color']['white']
      }
      interactive: {
        input: {
          base: Primitives['color']['white']
          hover: Primitives['color']['grey']['grey10']
          readonly: Primitives['color']['grey']['grey40']
          disabled: Primitives['color']['grey']['grey20']
          selected: Primitives['color']['grey']['grey180']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy150']
            active: Primitives['color']['navy']['navy180']
            disabled: Primitives['color']['grey']['grey30']
          }
          secondary: {
            base: Primitives['color']['navy']['navy30']
            hover: Primitives['color']['navy']['navy20']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey30']
          }
          destructive: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red100']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey30']
            secondary: {
              hover: Primitives['color']['red']['red10']
              active: Primitives['color']['red']['red20']
            }
          }
          success: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green100']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey30']
            secondary: {
              hover: Primitives['color']['aurora']['aurora10']
              active: Primitives['color']['aurora']['aurora20']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet110']
              hover: Primitives['color']['violet']['violet100']
              active: Primitives['color']['violet']['violet130']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea110']
              hover: Primitives['color']['sea']['sea100']
              active: Primitives['color']['sea']['sea130']
            }
            disabled: Primitives['color']['grey']['grey30']
          }
          aiSecondary: {
            base: Primitives['color']['white']
            disabled: Primitives['color']['white']
            hover: {
              topGradient: Primitives['color']['violet']['violet20']
              bottomGradient: Primitives['color']['sea']['sea20']
            }
            active: {
              topGradient: Primitives['color']['violet']['violet20']
              bottomGradient: Primitives['color']['sea']['sea20']
            }
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          tertiary: {
            hover: Primitives['color']['navy']['navy10']
            active: Primitives['color']['navy']['navy20']
          }
          disabled: Primitives['color']['grey']['grey30']
          ghost: { onColor: { hover: Primitives['color']['whiteOpacity10'] } }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue100']
        green: Primitives['color']['green']['green100']
        red: Primitives['color']['red']['red100']
        orange: Primitives['color']['orange']['orange100']
        grey: Primitives['color']['grey']['grey130']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum100']
        violet: Primitives['color']['violet']['violet100']
        stone: Primitives['color']['stone']['stone100']
        sky: Primitives['color']['sky']['sky100']
        honey: Primitives['color']['honey']['honey100']
        sea: Primitives['color']['sea']['sea100']
        aurora: Primitives['color']['aurora']['aurora100']
      }
      elevatedSurface: {
        base: Primitives['color']['white']
        inverse: Primitives['color']['grey']['grey150']
      }
      overlay: {
        base: Primitives['color']['whiteOpacity75']
        dark: Primitives['color']['greyOpacity75']
      }
    }
    stroke: {
      base: Primitives['color']['grey']['grey70']
      muted: Primitives['color']['grey']['grey20']
      strong: Primitives['color']['grey']['grey110']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['navy']['navy170']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      container: {
        base: Primitives['color']['grey']['grey20']
        dark: Primitives['color']['grey']['grey150']
      }
      interactive: {
        focusRing: {
          base: Primitives['color']['blue']['blue100']
          onColor: Primitives['color']['white']
        }
        input: {
          base: Primitives['color']['grey']['grey100']
          hover: Primitives['color']['grey']['grey120']
          readonly: Primitives['color']['grey']['grey70']
          disabled: Primitives['color']['grey']['grey40']
          selected: Primitives['color']['grey']['grey180']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy150']
            active: Primitives['color']['navy']['navy180']
            disabled: Primitives['color']['grey']['grey30']
          }
          secondary: {
            base: Primitives['color']['navy']['navy30']
            hover: Primitives['color']['navy']['navy20']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey30']
          }
          destructive: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red100']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey30']
            secondary: {
              base: Primitives['color']['red']['red110']
              hover: Primitives['color']['red']['red110']
              active: Primitives['color']['red']['red130']
              disabled: Primitives['color']['grey']['grey40']
            }
          }
          success: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green100']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey30']
            secondary: {
              base: Primitives['color']['green']['green110']
              hover: Primitives['color']['green']['green110']
              active: Primitives['color']['green']['green130']
              disabled: Primitives['color']['grey']['grey40']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet110']
              hover: Primitives['color']['violet']['violet100']
              active: Primitives['color']['violet']['violet130']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea110']
              hover: Primitives['color']['sea']['sea100']
              active: Primitives['color']['sea']['sea130']
            }
            disabled: Primitives['color']['grey']['grey30']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy60']
            hover: Primitives['color']['navy']['navy60']
            active: Primitives['color']['navy']['navy70']
            disabled: Primitives['color']['grey']['grey40']
          }
          disabled: Primitives['color']['grey']['grey30']
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          aiSecondary: { disabled: Primitives['color']['grey']['grey50'] }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue110']
        green: Primitives['color']['green']['green110']
        red: Primitives['color']['red']['red110']
        orange: Primitives['color']['orange']['orange110']
        grey: Primitives['color']['grey']['grey130']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum110']
        violet: Primitives['color']['violet']['violet110']
        stone: Primitives['color']['stone']['stone110']
        sky: Primitives['color']['sky']['sky110']
        honey: Primitives['color']['honey']['honey110']
        sea: Primitives['color']['sea']['sea110']
        aurora: Primitives['color']['aurora']['aurora110']
      }
    }
    text: {
      base: Primitives['color']['grey']['grey170']
      muted: Primitives['color']['grey']['grey120']
      success: Primitives['color']['green']['green110']
      error: Primitives['color']['red']['red110']
      warning: Primitives['color']['orange']['orange110']
      info: Primitives['color']['blue']['blue110']
      aiColor: Primitives['color']['violet']['violet120']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey70']
          onColor: Primitives['color']['grey']['grey40']
        }
        input: {
          base: Primitives['color']['grey']['grey150']
          hover: Primitives['color']['grey']['grey120']
          readonly: Primitives['color']['grey']['grey150']
          placeholder: Primitives['color']['grey']['grey120']
          disabled: Primitives['color']['grey']['grey70']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue120']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue130']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['blue']['blue20']
            active: Primitives['color']['blue']['blue20']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey60']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet110'] }
            bottomGradient: { base: Primitives['color']['sea']['sea110'] }
            disabled: Primitives['color']['grey']['grey50']
          }
          primary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          primaryOnColor: {
            base: Primitives['color']['navy']['navy160']
            hover: Primitives['color']['navy']['navy160']
            active: Primitives['color']['navy']['navy160']
            disabled: Primitives['color']['grey']['grey130']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey50']
          }
          successSecondary: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green110']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey50']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red110']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey60']
          }
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue110']
        green: Primitives['color']['green']['green110']
        red: Primitives['color']['red']['red110']
        orange: Primitives['color']['orange']['orange110']
        grey: Primitives['color']['grey']['grey130']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum110']
        violet: Primitives['color']['violet']['violet110']
        stone: Primitives['color']['stone']['stone110']
        sky: Primitives['color']['sky']['sky110']
        honey: Primitives['color']['honey']['honey110']
        sea: Primitives['color']['sea']['sea110']
        aurora: Primitives['color']['aurora']['aurora110']
      }
    }
    icon: {
      base: Primitives['color']['grey']['grey170']
      muted: Primitives['color']['grey']['grey120']
      success: Primitives['color']['green']['green110']
      error: Primitives['color']['red']['red110']
      warning: Primitives['color']['orange']['orange110']
      info: Primitives['color']['blue']['blue110']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      brand: Primitives['color']['navy']['navy170']
      interactive: {
        action: {
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet110'] }
            bottomGradient: { base: Primitives['color']['sea']['sea110'] }
            disabled: Primitives['color']['grey']['grey50']
          }
          secondary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey60']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          primary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          primaryOnColor: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey130']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey60']
          }
          successSecondary: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green110']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey60']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red110']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey60']
          }
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
        }
        disabled: {
          base: Primitives['color']['grey']['grey70']
          onColor: Primitives['color']['grey']['grey40']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue110']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue110']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['blue']['blue20']
            active: Primitives['color']['blue']['blue20']
          }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue110']
        green: Primitives['color']['green']['green110']
        red: Primitives['color']['red']['red110']
        orange: Primitives['color']['orange']['orange110']
        grey: Primitives['color']['grey']['grey130']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum110']
        violet: Primitives['color']['violet']['violet110']
        stone: Primitives['color']['stone']['stone110']
        sky: Primitives['color']['sky']['sky110']
        honey: Primitives['color']['honey']['honey110']
        sea: Primitives['color']['sea']['sea110']
        aurora: Primitives['color']['aurora']['aurora110']
      }
    }
    dropShadow: { shadowColor1: string; shadowColor2: string }
    transparentColor: Primitives['color']['transparent']
    institutional: {
      brandPrimary: Primitives['color']['navy']['navy170']
      brandFontColorDark: Primitives['color']['grey']['grey170']
      linkColor: Primitives['color']['blue']['blue120']
      brandButtonPrimaryBgd: Primitives['color']['navy']['navy170']
      brandButtonPrimaryText: Primitives['color']['white']
      brandGlobalNavBgd: Primitives['color']['white']
      globalNavLinkHover: Primitives['color']['grey']['grey170']
      brandGlobalNavMenuItemTextColor: Primitives['color']['grey']['grey170']
      brandGlobalNavMenuItemTextColorActive: Primitives['color']['white']
    }
  }
  dropShadow: {
    x: {
      elevation1: { dropshadow1: string; dropshadow2: string }
      elevation2: { dropshadow1: string; dropshadow2: string }
      elevation3: { dropshadow1: string; dropshadow2: string }
      elevation4: { dropshadow1: string; dropshadow2: string }
    }
    y: {
      elevation1: { dropshadow1: string; dropshadow2: string }
      elevation2: { dropshadow1: string; dropshadow2: string }
      elevation3: { dropshadow1: string; dropshadow2: string }
      elevation4: { dropshadow1: string; dropshadow2: string }
    }
    blur: {
      elevation1: { dropshadow1: string; dropshadow2: string }
      elevation2: { dropshadow1: string; dropshadow2: string }
      elevation3: { dropshadow1: string; dropshadow2: string }
      elevation4: { dropshadow1: string; dropshadow2: string }
    }
    spread: {
      elevation1: { dropshadow1: string; dropshadow2: string }
      elevation2: { dropshadow1: string; dropshadow2: string }
      elevation3: { dropshadow1: string; dropshadow2: string }
      elevation4: { dropshadow1: string; dropshadow2: string }
    }
  }
  size: {
    interactive: {
      height: {
        xxs: Primitives['size']['size20']
        xs: Primitives['size']['size24']
        sm: Primitives['size']['size32']
        md: Primitives['size']['size40']
        lg: Primitives['size']['size48']
      }
    }
    choiceControl: {
      height: {
        sm: Primitives['size']['size24']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size24']
      }
    }
    breakpoints: {
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      desktop: string
      xl: string
    }
    media: { mediumMin: string; largeMin: string; xLargeMin: string }
  }
  spacing: {
    space2xs: Primitives['size']['size2']
    spaceXs: Primitives['size']['size4']
    spaceSm: Primitives['size']['size8']
    spaceMd: Primitives['size']['size12']
    spaceLg: Primitives['size']['size16']
    spaceXl: Primitives['size']['size24']
    space2xl: Primitives['size']['size32']
    gap: {
      sections: Primitives['size']['size48']
      cards: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size32']
      }
      inputs: {
        horizontal: Primitives['size']['size12']
        vertical: Primitives['size']['size16']
      }
      inputElements: Primitives['size']['size8']
    }
    padding: {
      container: {
        xxs: Primitives['size']['size8']
        xs: Primitives['size']['size12']
        sm: Primitives['size']['size16']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size32']
      }
      interactive: {
        horizontal: {
          sm: Primitives['size']['size8']
          md: Primitives['size']['size12']
          lg: Primitives['size']['size16']
          xl: Primitives['size']['size20']
        }
      }
    }
  }
  borderRadius: {
    xs: Primitives['size']['size2']
    sm: Primitives['size']['size4']
    md: Primitives['size']['size8']
    lg: Primitives['size']['size12']
    xl: Primitives['size']['size16']
    xxl: Primitives['size']['size24']
    full: string
    container: {
      sm: Primitives['size']['size8']
      md: Primitives['size']['size16']
      lg: Primitives['size']['size24']
      xl: Primitives['size']['size32']
    }
    interactive: { base: Primitives['size']['size12'] }
  }
  borderWidth: {
    sm: Primitives['size']['size1']
    md: Primitives['size']['size2']
    lg: Primitives['size']['size4']
    interactive: {
      base: Primitives['size']['size1']
      focus: Primitives['size']['size2']
    }
  }
  fontFamily: {
    heading: Primitives['fontFamily']['inclusiveSans']
    base: Primitives['fontFamily']['atkinson']
    code: Primitives['fontFamily']['menlo']
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
    interactive: Primitives['fontWeight']['medium']
  }
  lineHeight: {
    paragraph: {
      textXs: Primitives['size']['size20']
      textSm: Primitives['size']['size20']
      textBase: Primitives['size']['size24']
      base: string
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
      base: string
    }
    heading: {
      textLg: Primitives['size']['size28']
      textXl: Primitives['size']['size32']
      text2xl: Primitives['size']['size36']
      text3xl: Primitives['size']['size40']
      base: string
      loose: string
    }
    label: { base: string }
  }
  fontSize: {
    textXs: Primitives['size']['size12']
    textSm: Primitives['size']['size14']
    textBase: Primitives['size']['size16']
    textLg: Primitives['size']['size20']
    textXl: Primitives['size']['size28']
    text2xl: Primitives['size']['size40']
  }
  visibleInCanvas: string
  visibleInRebrand: string
  opacity: { base: Primitives['opacity100']; disabled: Primitives['opacity50'] }
}

const semantics = (primitives: Primitives): Semantics => ({
  color: {
    background: {
      base: primitives.color.white,
      muted: primitives.color.grey.grey10,
      mutedHover: primitives.color.grey.grey20,
      page: primitives.color.grey.grey10,
      container: primitives.color.white,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey150,
      dark: primitives.color.grey.grey170,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.navy.navy170,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      aiText: primitives.color.violet.violet20,
      opacity: primitives.color.navyOpacity10,
      opacityOnColor: primitives.color.whiteOpacity10,
      divider: {
        base: primitives.color.grey.grey40,
        onColor: primitives.color.white
      },
      interactive: {
        input: {
          base: primitives.color.white,
          hover: primitives.color.grey.grey10,
          readonly: primitives.color.grey.grey40,
          disabled: primitives.color.grey.grey20,
          selected: primitives.color.grey.grey180
        },
        action: {
          primary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy150,
            active: primitives.color.navy.navy180,
            disabled: primitives.color.grey.grey30
          },
          secondary: {
            base: primitives.color.navy.navy30,
            hover: primitives.color.navy.navy20,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey30
          },
          destructive: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red100,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey30,
            secondary: {
              hover: primitives.color.red.red10,
              active: primitives.color.red.red20
            }
          },
          success: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green100,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey30,
            secondary: {
              hover: primitives.color.aurora.aurora10,
              active: primitives.color.aurora.aurora20
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet110,
              hover: primitives.color.violet.violet100,
              active: primitives.color.violet.violet130
            },
            bottomGradient: {
              base: primitives.color.sea.sea110,
              hover: primitives.color.sea.sea100,
              active: primitives.color.sea.sea130
            },
            disabled: primitives.color.grey.grey30
          },
          aiSecondary: {
            base: primitives.color.white,
            disabled: primitives.color.white,
            hover: {
              topGradient: primitives.color.violet.violet20,
              bottomGradient: primitives.color.sea.sea20
            },
            active: {
              topGradient: primitives.color.violet.violet20,
              bottomGradient: primitives.color.sea.sea20
            }
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          tertiary: {
            hover: primitives.color.navy.navy10,
            active: primitives.color.navy.navy20
          },
          disabled: primitives.color.grey.grey30,
          ghost: { onColor: { hover: primitives.color.whiteOpacity10 } }
        }
      },
      accent: {
        blue: primitives.color.blue.blue100,
        green: primitives.color.green.green100,
        red: primitives.color.red.red100,
        orange: primitives.color.orange.orange100,
        grey: primitives.color.grey.grey130,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum100,
        violet: primitives.color.violet.violet100,
        stone: primitives.color.stone.stone100,
        sky: primitives.color.sky.sky100,
        honey: primitives.color.honey.honey100,
        sea: primitives.color.sea.sea100,
        aurora: primitives.color.aurora.aurora100
      },
      elevatedSurface: {
        base: primitives.color.white,
        inverse: primitives.color.grey.grey150
      },
      overlay: {
        base: primitives.color.whiteOpacity75,
        dark: primitives.color.greyOpacity75
      }
    },
    stroke: {
      base: primitives.color.grey.grey70,
      muted: primitives.color.grey.grey20,
      strong: primitives.color.grey.grey110,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.navy.navy170,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      container: {
        base: primitives.color.grey.grey20,
        dark: primitives.color.grey.grey150
      },
      interactive: {
        focusRing: {
          base: primitives.color.blue.blue100,
          onColor: primitives.color.white
        },
        input: {
          base: primitives.color.grey.grey100,
          hover: primitives.color.grey.grey120,
          readonly: primitives.color.grey.grey70,
          disabled: primitives.color.grey.grey40,
          selected: primitives.color.grey.grey180
        },
        action: {
          primary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy150,
            active: primitives.color.navy.navy180,
            disabled: primitives.color.grey.grey30
          },
          secondary: {
            base: primitives.color.navy.navy30,
            hover: primitives.color.navy.navy20,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey30
          },
          destructive: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red100,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey30,
            secondary: {
              base: primitives.color.red.red110,
              hover: primitives.color.red.red110,
              active: primitives.color.red.red130,
              disabled: primitives.color.grey.grey40
            }
          },
          success: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green100,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey30,
            secondary: {
              base: primitives.color.green.green110,
              hover: primitives.color.green.green110,
              active: primitives.color.green.green130,
              disabled: primitives.color.grey.grey40
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet110,
              hover: primitives.color.violet.violet100,
              active: primitives.color.violet.violet130
            },
            bottomGradient: {
              base: primitives.color.sea.sea110,
              hover: primitives.color.sea.sea100,
              active: primitives.color.sea.sea130
            },
            disabled: primitives.color.grey.grey30
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          tertiary: {
            base: primitives.color.navy.navy60,
            hover: primitives.color.navy.navy60,
            active: primitives.color.navy.navy70,
            disabled: primitives.color.grey.grey40
          },
          disabled: primitives.color.grey.grey30,
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          aiSecondary: { disabled: primitives.color.grey.grey50 }
        }
      },
      accent: {
        blue: primitives.color.blue.blue110,
        green: primitives.color.green.green110,
        red: primitives.color.red.red110,
        orange: primitives.color.orange.orange110,
        grey: primitives.color.grey.grey130,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum110,
        violet: primitives.color.violet.violet110,
        stone: primitives.color.stone.stone110,
        sky: primitives.color.sky.sky110,
        honey: primitives.color.honey.honey110,
        sea: primitives.color.sea.sea110,
        aurora: primitives.color.aurora.aurora110
      }
    },
    text: {
      base: primitives.color.grey.grey170,
      muted: primitives.color.grey.grey120,
      success: primitives.color.green.green110,
      error: primitives.color.red.red110,
      warning: primitives.color.orange.orange110,
      info: primitives.color.blue.blue110,
      aiColor: primitives.color.violet.violet120,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey70,
          onColor: primitives.color.grey.grey40
        },
        input: {
          base: primitives.color.grey.grey150,
          hover: primitives.color.grey.grey120,
          readonly: primitives.color.grey.grey150,
          placeholder: primitives.color.grey.grey120,
          disabled: primitives.color.grey.grey70
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue120,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue130
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.blue.blue20,
            active: primitives.color.blue.blue20
          }
        },
        action: {
          secondary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey60
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet110 },
            bottomGradient: { base: primitives.color.sea.sea110 },
            disabled: primitives.color.grey.grey50
          },
          primary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          primaryOnColor: {
            base: primitives.color.navy.navy160,
            hover: primitives.color.navy.navy160,
            active: primitives.color.navy.navy160,
            disabled: primitives.color.grey.grey130
          },
          tertiary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey50
          },
          successSecondary: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green110,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey50
          },
          destructiveSecondary: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red110,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey60
          },
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          }
        }
      },
      accent: {
        blue: primitives.color.blue.blue110,
        green: primitives.color.green.green110,
        red: primitives.color.red.red110,
        orange: primitives.color.orange.orange110,
        grey: primitives.color.grey.grey130,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum110,
        violet: primitives.color.violet.violet110,
        stone: primitives.color.stone.stone110,
        sky: primitives.color.sky.sky110,
        honey: primitives.color.honey.honey110,
        sea: primitives.color.sea.sea110,
        aurora: primitives.color.aurora.aurora110
      }
    },
    icon: {
      base: primitives.color.grey.grey170,
      muted: primitives.color.grey.grey120,
      success: primitives.color.green.green110,
      error: primitives.color.red.red110,
      warning: primitives.color.orange.orange110,
      info: primitives.color.blue.blue110,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      brand: primitives.color.navy.navy170,
      interactive: {
        action: {
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet110 },
            bottomGradient: { base: primitives.color.sea.sea110 },
            disabled: primitives.color.grey.grey50
          },
          secondary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey60
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          primary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          primaryOnColor: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey130
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          tertiary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey60
          },
          successSecondary: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green110,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey60
          },
          destructiveSecondary: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red110,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey60
          },
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          }
        },
        disabled: {
          base: primitives.color.grey.grey70,
          onColor: primitives.color.grey.grey40
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue110,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue110
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.blue.blue20,
            active: primitives.color.blue.blue20
          }
        }
      },
      accent: {
        blue: primitives.color.blue.blue110,
        green: primitives.color.green.green110,
        red: primitives.color.red.red110,
        orange: primitives.color.orange.orange110,
        grey: primitives.color.grey.grey130,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum110,
        violet: primitives.color.violet.violet110,
        stone: primitives.color.stone.stone110,
        sky: primitives.color.sky.sky110,
        honey: primitives.color.honey.honey110,
        sea: primitives.color.sea.sea110,
        aurora: primitives.color.aurora.aurora110
      }
    },
    dropShadow: {
      shadowColor1: 'rgba(35,68,101,0.15)',
      shadowColor2: 'rgba(35,68,101,0.1)'
    },
    transparentColor: primitives.color.transparent,
    institutional: {
      brandPrimary: primitives.color.navy.navy170,
      brandFontColorDark: primitives.color.grey.grey170,
      linkColor: primitives.color.blue.blue120,
      brandButtonPrimaryBgd: primitives.color.navy.navy170,
      brandButtonPrimaryText: primitives.color.white,
      brandGlobalNavBgd: primitives.color.white,
      globalNavLinkHover: primitives.color.grey.grey170,
      brandGlobalNavMenuItemTextColor: primitives.color.grey.grey170,
      brandGlobalNavMenuItemTextColorActive: primitives.color.white
    }
  },
  dropShadow: {
    x: {
      elevation1: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation2: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation3: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation4: { dropshadow1: '0px', dropshadow2: '0px' }
    },
    y: {
      elevation1: { dropshadow1: '1px', dropshadow2: '2px' },
      elevation2: { dropshadow1: '4px', dropshadow2: '1px' },
      elevation3: { dropshadow1: '6px', dropshadow2: '2px' },
      elevation4: { dropshadow1: '8px', dropshadow2: '4px' }
    },
    blur: {
      elevation1: { dropshadow1: '2px', dropshadow2: '4px' },
      elevation2: { dropshadow1: '8px', dropshadow2: '3px' },
      elevation3: { dropshadow1: '10px', dropshadow2: '3px' },
      elevation4: { dropshadow1: '12px', dropshadow2: '4px' }
    },
    spread: {
      elevation1: { dropshadow1: '0px', dropshadow2: '1px' },
      elevation2: { dropshadow1: '3px', dropshadow2: '0px' },
      elevation3: { dropshadow1: '4px', dropshadow2: '0px' },
      elevation4: { dropshadow1: '6px', dropshadow2: '0px' }
    }
  },
  size: {
    interactive: {
      height: {
        xxs: primitives.size.size20,
        xs: primitives.size.size24,
        sm: primitives.size.size32,
        md: primitives.size.size40,
        lg: primitives.size.size48
      }
    },
    choiceControl: {
      height: {
        sm: primitives.size.size24,
        md: primitives.size.size24,
        lg: primitives.size.size24
      }
    },
    breakpoints: {
      xxs: '8em',
      xs: '16em',
      sm: '30em',
      md: '48em',
      lg: '62em',
      desktop: '64em',
      xl: '75em'
    },
    media: { mediumMin: '48em', largeMin: '62em', xLargeMin: '75em' }
  },
  spacing: {
    space2xs: primitives.size.size2,
    spaceXs: primitives.size.size4,
    spaceSm: primitives.size.size8,
    spaceMd: primitives.size.size12,
    spaceLg: primitives.size.size16,
    spaceXl: primitives.size.size24,
    space2xl: primitives.size.size32,
    gap: {
      sections: primitives.size.size48,
      cards: {
        sm: primitives.size.size16,
        md: primitives.size.size24,
        lg: primitives.size.size32
      },
      inputs: {
        horizontal: primitives.size.size12,
        vertical: primitives.size.size16
      },
      inputElements: primitives.size.size8
    },
    padding: {
      container: {
        xxs: primitives.size.size8,
        xs: primitives.size.size12,
        sm: primitives.size.size16,
        md: primitives.size.size24,
        lg: primitives.size.size32
      },
      interactive: {
        horizontal: {
          sm: primitives.size.size8,
          md: primitives.size.size12,
          lg: primitives.size.size16,
          xl: primitives.size.size20
        }
      }
    }
  },
  borderRadius: {
    xs: primitives.size.size2,
    sm: primitives.size.size4,
    md: primitives.size.size8,
    lg: primitives.size.size12,
    xl: primitives.size.size16,
    xxl: primitives.size.size24,
    full: '999rem',
    container: {
      sm: primitives.size.size8,
      md: primitives.size.size16,
      lg: primitives.size.size24,
      xl: primitives.size.size32
    },
    interactive: { base: primitives.size.size12 }
  },
  borderWidth: {
    sm: primitives.size.size1,
    md: primitives.size.size2,
    lg: primitives.size.size4,
    interactive: { base: primitives.size.size1, focus: primitives.size.size2 }
  },
  fontFamily: {
    heading: primitives.fontFamily.inclusiveSans,
    base: primitives.fontFamily.atkinson,
    code: primitives.fontFamily.menlo
  },
  fontWeight: {
    body: {
      base: primitives.fontWeight.regular,
      strong: primitives.fontWeight.semiBold
    },
    heading: {
      base: primitives.fontWeight.semiBold,
      strong: primitives.fontWeight.bold
    },
    interactive: primitives.fontWeight.medium
  },
  lineHeight: {
    paragraph: {
      textXs: primitives.size.size20,
      textSm: primitives.size.size20,
      textBase: primitives.size.size24,
      base: '150%'
    },
    standalone: {
      textXs: primitives.size.size12,
      textSm: primitives.size.size14,
      textBase: primitives.size.size16,
      textLg: primitives.size.size20,
      textXl: primitives.size.size24,
      text2xl: primitives.size.size28,
      text3xl: primitives.size.size32,
      text4xl: primitives.size.size36,
      base: '125%'
    },
    heading: {
      textLg: primitives.size.size28,
      textXl: primitives.size.size32,
      text2xl: primitives.size.size36,
      text3xl: primitives.size.size40,
      base: '125%',
      loose: '150%'
    },
    label: { base: '1.125rem' }
  },
  fontSize: {
    textXs: primitives.size.size12,
    textSm: primitives.size.size14,
    textBase: primitives.size.size16,
    textLg: primitives.size.size20,
    textXl: primitives.size.size28,
    text2xl: primitives.size.size40
  },
  visibleInCanvas: 'false',
  visibleInRebrand: 'true',
  opacity: { base: primitives.opacity100, disabled: primitives.opacity50 }
})
export default semantics
