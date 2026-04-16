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
      base: Primitives['color']['grey']['grey180']
      muted: Primitives['color']['grey']['grey170']
      mutedHover: Primitives['color']['grey']['grey180']
      page: Primitives['color']['grey']['grey180']
      container: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey10']
      dark: Primitives['color']['grey']['grey170']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['navy']['navy10']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      aiText: Primitives['color']['violet']['violet140']
      opacity: Primitives['color']['whiteOpacity10']
      opacityOnColor: Primitives['color']['whiteOpacity10']
      divider: {
        base: Primitives['color']['grey']['grey140']
        onColor: Primitives['color']['grey']['grey180']
      }
      interactive: {
        input: {
          base: Primitives['color']['grey']['grey180']
          hover: Primitives['color']['grey']['grey170']
          readonly: Primitives['color']['grey']['grey100']
          disabled: Primitives['color']['grey']['grey150']
          selected: Primitives['color']['white']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['white']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey150']
          }
          secondary: {
            base: Primitives['color']['navy']['navy130']
            hover: Primitives['color']['navy']['navy120']
            active: Primitives['color']['navy']['navy140']
            disabled: Primitives['color']['grey']['grey150']
          }
          destructive: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red100']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey150']
            secondary: {
              hover: Primitives['color']['red']['red140']
              active: Primitives['color']['red']['red150']
            }
          }
          success: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green100']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey150']
            secondary: {
              hover: Primitives['color']['green']['green140']
              active: Primitives['color']['green']['green150']
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
            disabled: Primitives['color']['grey']['grey150']
          }
          aiSecondary: {
            base: Primitives['color']['grey']['grey180']
            disabled: Primitives['color']['grey']['grey180']
            hover: {
              topGradient: Primitives['color']['violet']['violet160']
              bottomGradient: Primitives['color']['sea']['sea160']
            }
            active: {
              topGradient: Primitives['color']['violet']['violet160']
              bottomGradient: Primitives['color']['sea']['sea160']
            }
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          tertiary: {
            hover: Primitives['color']['navy']['navy140']
            active: Primitives['color']['navy']['navy150']
          }
          disabled: Primitives['color']['grey']['grey160']
          ghost: { onColor: { hover: Primitives['color']['whiteOpacity10'] } }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue100']
        green: Primitives['color']['green']['green100']
        red: Primitives['color']['red']['red100']
        orange: Primitives['color']['orange']['orange100']
        grey: Primitives['color']['grey']['grey120']
        ash: Primitives['color']['grey']['grey180']
        plum: Primitives['color']['plum']['plum100']
        violet: Primitives['color']['violet']['violet100']
        stone: Primitives['color']['stone']['stone100']
        sky: Primitives['color']['sky']['sky100']
        honey: Primitives['color']['honey']['honey100']
        sea: Primitives['color']['sea']['sea100']
        aurora: Primitives['color']['aurora']['aurora100']
      }
      elevatedSurface: {
        base: Primitives['color']['grey']['grey170']
        inverse: Primitives['color']['grey']['grey10']
      }
      overlay: {
        base: Primitives['color']['greyOpacity75']
        dark: Primitives['color']['greyOpacity75']
      }
    }
    stroke: {
      base: Primitives['color']['grey']['grey100']
      muted: Primitives['color']['grey']['grey140']
      strong: Primitives['color']['grey']['grey60']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['navy']['navy10']
      aiTopGradient: Primitives['color']['violet']['violet70']
      aiBottomGradient: Primitives['color']['sea']['sea70']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey100']
      container: {
        base: Primitives['color']['grey']['grey150']
        dark: Primitives['color']['grey']['grey150']
      }
      interactive: {
        focusRing: {
          base: Primitives['color']['blue']['blue70']
          onColor: Primitives['color']['white']
        }
        input: {
          base: Primitives['color']['grey']['grey70']
          hover: Primitives['color']['grey']['grey60']
          readonly: Primitives['color']['grey']['grey70']
          disabled: Primitives['color']['grey']['grey130']
          selected: Primitives['color']['white']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['white']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey150']
          }
          secondary: {
            base: Primitives['color']['navy']['navy130']
            hover: Primitives['color']['navy']['navy120']
            active: Primitives['color']['navy']['navy140']
            disabled: Primitives['color']['grey']['grey150']
          }
          destructive: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red100']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['grey']['grey150']
            secondary: {
              base: Primitives['color']['red']['red70']
              hover: Primitives['color']['red']['red60']
              active: Primitives['color']['red']['red80']
              disabled: Primitives['color']['grey']['grey130']
            }
          }
          success: {
            base: Primitives['color']['green']['green110']
            hover: Primitives['color']['green']['green100']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['grey']['grey150']
            secondary: {
              base: Primitives['color']['green']['green70']
              hover: Primitives['color']['green']['green60']
              active: Primitives['color']['green']['green80']
              disabled: Primitives['color']['grey']['grey130']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet110']
              hover: Primitives['color']['violet']['violet100']
              active: Primitives['color']['violet']['violet120']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea110']
              hover: Primitives['color']['sea']['sea100']
              active: Primitives['color']['sea']['sea120']
            }
            disabled: Primitives['color']['grey']['grey150']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy70']
            hover: Primitives['color']['navy']['navy60']
            active: Primitives['color']['navy']['navy70']
            disabled: Primitives['color']['grey']['grey130']
          }
          disabled: Primitives['color']['grey']['grey160']
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['navy']['navy30']
            active: Primitives['color']['navy']['navy40']
            disabled: Primitives['color']['grey']['grey70']
          }
          aiSecondary: { disabled: Primitives['color']['grey']['grey120'] }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue50']
        green: Primitives['color']['green']['green50']
        red: Primitives['color']['red']['red50']
        orange: Primitives['color']['orange']['orange50']
        grey: Primitives['color']['grey']['grey10']
        ash: Primitives['color']['grey']['grey40']
        plum: Primitives['color']['plum']['plum50']
        violet: Primitives['color']['violet']['violet50']
        stone: Primitives['color']['stone']['stone50']
        sky: Primitives['color']['sky']['sky50']
        honey: Primitives['color']['honey']['honey50']
        sea: Primitives['color']['sea']['sea50']
        aurora: Primitives['color']['aurora']['aurora50']
      }
    }
    text: {
      base: Primitives['color']['white']
      muted: Primitives['color']['grey']['grey60']
      success: Primitives['color']['green']['green50']
      error: Primitives['color']['red']['red50']
      warning: Primitives['color']['orange']['orange50']
      info: Primitives['color']['blue']['blue50']
      aiColor: Primitives['color']['violet']['violet20']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey180']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey120']
          onColor: Primitives['color']['grey']['grey60']
        }
        input: {
          base: Primitives['color']['white']
          hover: Primitives['color']['grey']['grey40']
          readonly: Primitives['color']['white']
          placeholder: Primitives['color']['grey']['grey60']
          disabled: Primitives['color']['grey']['grey60']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue50']
            hover: Primitives['color']['blue']['blue40']
            active: Primitives['color']['blue']['blue70']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet50'] }
            bottomGradient: { base: Primitives['color']['sea']['sea50'] }
            disabled: Primitives['color']['grey']['grey100']
          }
          primary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey100']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          primaryOnColor: {
            base: Primitives['color']['navy']['navy160']
            hover: Primitives['color']['navy']['navy160']
            active: Primitives['color']['navy']['navy160']
            disabled: Primitives['color']['grey']['grey130']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['navy']['navy10']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey130']
          }
          successSecondary: {
            base: Primitives['color']['green']['green40']
            hover: Primitives['color']['green']['green30']
            active: Primitives['color']['green']['green40']
            disabled: Primitives['color']['grey']['grey130']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red40']
            hover: Primitives['color']['red']['red30']
            active: Primitives['color']['red']['red40']
            disabled: Primitives['color']['grey']['grey130']
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
        blue: Primitives['color']['blue']['blue50']
        green: Primitives['color']['green']['green50']
        red: Primitives['color']['red']['red50']
        orange: Primitives['color']['orange']['orange50']
        grey: Primitives['color']['grey']['grey10']
        ash: Primitives['color']['grey']['grey40']
        plum: Primitives['color']['plum']['plum50']
        violet: Primitives['color']['violet']['violet50']
        stone: Primitives['color']['stone']['stone50']
        sky: Primitives['color']['sky']['sky50']
        honey: Primitives['color']['honey']['honey50']
        sea: Primitives['color']['sea']['sea50']
        aurora: Primitives['color']['aurora']['aurora50']
      }
    }
    icon: {
      base: Primitives['color']['white']
      muted: Primitives['color']['grey']['grey60']
      success: Primitives['color']['green']['green50']
      error: Primitives['color']['red']['red50']
      warning: Primitives['color']['orange']['orange50']
      info: Primitives['color']['blue']['blue50']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey180']
      brand: Primitives['color']['navy']['navy10']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey120']
          onColor: Primitives['color']['grey']['grey60']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue50']
            hover: Primitives['color']['blue']['blue40']
            active: Primitives['color']['blue']['blue70']
          }
          primaryOnColor: {
            base: Primitives['color']['blue']['blue20']
            hover: Primitives['color']['white']
            active: Primitives['color']['blue']['blue20']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet50'] }
            bottomGradient: { base: Primitives['color']['sea']['sea50'] }
            disabled: Primitives['color']['grey']['grey100']
          }
          primary: {
            base: Primitives['color']['navy']['navy170']
            hover: Primitives['color']['navy']['navy170']
            active: Primitives['color']['navy']['navy170']
            disabled: Primitives['color']['grey']['grey100']
          }
          primaryOnColor: {
            base: Primitives['color']['navy']['navy160']
            hover: Primitives['color']['navy']['navy160']
            active: Primitives['color']['navy']['navy160']
            disabled: Primitives['color']['grey']['grey130']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey100']
          }
          tertiary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['navy']['navy10']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey130']
          }
          successSecondary: {
            base: Primitives['color']['green']['green40']
            hover: Primitives['color']['green']['green30']
            active: Primitives['color']['green']['green40']
            disabled: Primitives['color']['grey']['grey130']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red40']
            hover: Primitives['color']['red']['red30']
            active: Primitives['color']['red']['red40']
            disabled: Primitives['color']['grey']['grey130']
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
        blue: Primitives['color']['blue']['blue50']
        green: Primitives['color']['green']['green50']
        red: Primitives['color']['red']['red50']
        orange: Primitives['color']['orange']['orange50']
        grey: Primitives['color']['grey']['grey10']
        ash: Primitives['color']['grey']['grey40']
        plum: Primitives['color']['plum']['plum50']
        violet: Primitives['color']['violet']['violet50']
        stone: Primitives['color']['stone']['stone50']
        sky: Primitives['color']['sky']['sky50']
        honey: Primitives['color']['honey']['honey50']
        sea: Primitives['color']['sea']['sea50']
        aurora: Primitives['color']['aurora']['aurora50']
      }
    }
    dropShadow: { shadowColor1: string; shadowColor2: string }
    transparentColor: Primitives['color']['transparent']
    institutional: {
      brandPrimary: Primitives['color']['navy']['navy10']
      brandFontColorDark: Primitives['color']['white']
      linkColor: Primitives['color']['blue']['blue50']
      brandButtonPrimaryBgd: Primitives['color']['navy']['navy10']
      brandButtonPrimaryText: Primitives['color']['navy']['navy170']
      brandGlobalNavBgd: Primitives['color']['grey']['grey170']
      globalNavLinkHover: Primitives['color']['grey']['grey170']
      brandGlobalNavMenuItemTextColor: Primitives['color']['white']
      brandGlobalNavMenuItemTextColorActive: Primitives['color']['grey']['grey180']
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
      base: primitives.color.grey.grey180,
      muted: primitives.color.grey.grey170,
      mutedHover: primitives.color.grey.grey180,
      page: primitives.color.grey.grey180,
      container: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey10,
      dark: primitives.color.grey.grey170,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.navy.navy10,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      aiText: primitives.color.violet.violet140,
      opacity: primitives.color.whiteOpacity10,
      opacityOnColor: primitives.color.whiteOpacity10,
      divider: {
        base: primitives.color.grey.grey140,
        onColor: primitives.color.grey.grey180
      },
      interactive: {
        input: {
          base: primitives.color.grey.grey180,
          hover: primitives.color.grey.grey170,
          readonly: primitives.color.grey.grey100,
          disabled: primitives.color.grey.grey150,
          selected: primitives.color.white
        },
        action: {
          primary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.white,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey150
          },
          secondary: {
            base: primitives.color.navy.navy130,
            hover: primitives.color.navy.navy120,
            active: primitives.color.navy.navy140,
            disabled: primitives.color.grey.grey150
          },
          destructive: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red100,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey150,
            secondary: {
              hover: primitives.color.red.red140,
              active: primitives.color.red.red150
            }
          },
          success: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green100,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey150,
            secondary: {
              hover: primitives.color.green.green140,
              active: primitives.color.green.green150
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
            disabled: primitives.color.grey.grey150
          },
          aiSecondary: {
            base: primitives.color.grey.grey180,
            disabled: primitives.color.grey.grey180,
            hover: {
              topGradient: primitives.color.violet.violet160,
              bottomGradient: primitives.color.sea.sea160
            },
            active: {
              topGradient: primitives.color.violet.violet160,
              bottomGradient: primitives.color.sea.sea160
            }
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          tertiary: {
            hover: primitives.color.navy.navy140,
            active: primitives.color.navy.navy150
          },
          disabled: primitives.color.grey.grey160,
          ghost: { onColor: { hover: primitives.color.whiteOpacity10 } }
        }
      },
      accent: {
        blue: primitives.color.blue.blue100,
        green: primitives.color.green.green100,
        red: primitives.color.red.red100,
        orange: primitives.color.orange.orange100,
        grey: primitives.color.grey.grey120,
        ash: primitives.color.grey.grey180,
        plum: primitives.color.plum.plum100,
        violet: primitives.color.violet.violet100,
        stone: primitives.color.stone.stone100,
        sky: primitives.color.sky.sky100,
        honey: primitives.color.honey.honey100,
        sea: primitives.color.sea.sea100,
        aurora: primitives.color.aurora.aurora100
      },
      elevatedSurface: {
        base: primitives.color.grey.grey170,
        inverse: primitives.color.grey.grey10
      },
      overlay: {
        base: primitives.color.greyOpacity75,
        dark: primitives.color.greyOpacity75
      }
    },
    stroke: {
      base: primitives.color.grey.grey100,
      muted: primitives.color.grey.grey140,
      strong: primitives.color.grey.grey60,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.navy.navy10,
      aiTopGradient: primitives.color.violet.violet70,
      aiBottomGradient: primitives.color.sea.sea70,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey100,
      container: {
        base: primitives.color.grey.grey150,
        dark: primitives.color.grey.grey150
      },
      interactive: {
        focusRing: {
          base: primitives.color.blue.blue70,
          onColor: primitives.color.white
        },
        input: {
          base: primitives.color.grey.grey70,
          hover: primitives.color.grey.grey60,
          readonly: primitives.color.grey.grey70,
          disabled: primitives.color.grey.grey130,
          selected: primitives.color.white
        },
        action: {
          primary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.white,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey150
          },
          secondary: {
            base: primitives.color.navy.navy130,
            hover: primitives.color.navy.navy120,
            active: primitives.color.navy.navy140,
            disabled: primitives.color.grey.grey150
          },
          destructive: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red100,
            active: primitives.color.red.red130,
            disabled: primitives.color.grey.grey150,
            secondary: {
              base: primitives.color.red.red70,
              hover: primitives.color.red.red60,
              active: primitives.color.red.red80,
              disabled: primitives.color.grey.grey130
            }
          },
          success: {
            base: primitives.color.green.green110,
            hover: primitives.color.green.green100,
            active: primitives.color.green.green130,
            disabled: primitives.color.grey.grey150,
            secondary: {
              base: primitives.color.green.green70,
              hover: primitives.color.green.green60,
              active: primitives.color.green.green80,
              disabled: primitives.color.grey.grey130
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet110,
              hover: primitives.color.violet.violet100,
              active: primitives.color.violet.violet120
            },
            bottomGradient: {
              base: primitives.color.sea.sea110,
              hover: primitives.color.sea.sea100,
              active: primitives.color.sea.sea120
            },
            disabled: primitives.color.grey.grey150
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          tertiary: {
            base: primitives.color.navy.navy70,
            hover: primitives.color.navy.navy60,
            active: primitives.color.navy.navy70,
            disabled: primitives.color.grey.grey130
          },
          disabled: primitives.color.grey.grey160,
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.navy.navy30,
            active: primitives.color.navy.navy40,
            disabled: primitives.color.grey.grey70
          },
          aiSecondary: { disabled: primitives.color.grey.grey120 }
        }
      },
      accent: {
        blue: primitives.color.blue.blue50,
        green: primitives.color.green.green50,
        red: primitives.color.red.red50,
        orange: primitives.color.orange.orange50,
        grey: primitives.color.grey.grey10,
        ash: primitives.color.grey.grey40,
        plum: primitives.color.plum.plum50,
        violet: primitives.color.violet.violet50,
        stone: primitives.color.stone.stone50,
        sky: primitives.color.sky.sky50,
        honey: primitives.color.honey.honey50,
        sea: primitives.color.sea.sea50,
        aurora: primitives.color.aurora.aurora50
      }
    },
    text: {
      base: primitives.color.white,
      muted: primitives.color.grey.grey60,
      success: primitives.color.green.green50,
      error: primitives.color.red.red50,
      warning: primitives.color.orange.orange50,
      info: primitives.color.blue.blue50,
      aiColor: primitives.color.violet.violet20,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey180,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey120,
          onColor: primitives.color.grey.grey60
        },
        input: {
          base: primitives.color.white,
          hover: primitives.color.grey.grey40,
          readonly: primitives.color.white,
          placeholder: primitives.color.grey.grey60,
          disabled: primitives.color.grey.grey60
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue50,
            hover: primitives.color.blue.blue40,
            active: primitives.color.blue.blue70
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white
          }
        },
        action: {
          secondary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet50 },
            bottomGradient: { base: primitives.color.sea.sea50 },
            disabled: primitives.color.grey.grey100
          },
          primary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey100
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          primaryOnColor: {
            base: primitives.color.navy.navy160,
            hover: primitives.color.navy.navy160,
            active: primitives.color.navy.navy160,
            disabled: primitives.color.grey.grey130
          },
          tertiary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.navy.navy10,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey130
          },
          successSecondary: {
            base: primitives.color.green.green40,
            hover: primitives.color.green.green30,
            active: primitives.color.green.green40,
            disabled: primitives.color.grey.grey130
          },
          destructiveSecondary: {
            base: primitives.color.red.red40,
            hover: primitives.color.red.red30,
            active: primitives.color.red.red40,
            disabled: primitives.color.grey.grey130
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
        blue: primitives.color.blue.blue50,
        green: primitives.color.green.green50,
        red: primitives.color.red.red50,
        orange: primitives.color.orange.orange50,
        grey: primitives.color.grey.grey10,
        ash: primitives.color.grey.grey40,
        plum: primitives.color.plum.plum50,
        violet: primitives.color.violet.violet50,
        stone: primitives.color.stone.stone50,
        sky: primitives.color.sky.sky50,
        honey: primitives.color.honey.honey50,
        sea: primitives.color.sea.sea50,
        aurora: primitives.color.aurora.aurora50
      }
    },
    icon: {
      base: primitives.color.white,
      muted: primitives.color.grey.grey60,
      success: primitives.color.green.green50,
      error: primitives.color.red.red50,
      warning: primitives.color.orange.orange50,
      info: primitives.color.blue.blue50,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey180,
      brand: primitives.color.navy.navy10,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey120,
          onColor: primitives.color.grey.grey60
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue50,
            hover: primitives.color.blue.blue40,
            active: primitives.color.blue.blue70
          },
          primaryOnColor: {
            base: primitives.color.blue.blue20,
            hover: primitives.color.white,
            active: primitives.color.blue.blue20
          }
        },
        action: {
          secondary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet50 },
            bottomGradient: { base: primitives.color.sea.sea50 },
            disabled: primitives.color.grey.grey100
          },
          primary: {
            base: primitives.color.navy.navy170,
            hover: primitives.color.navy.navy170,
            active: primitives.color.navy.navy170,
            disabled: primitives.color.grey.grey100
          },
          primaryOnColor: {
            base: primitives.color.navy.navy160,
            hover: primitives.color.navy.navy160,
            active: primitives.color.navy.navy160,
            disabled: primitives.color.grey.grey130
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey100
          },
          tertiary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.navy.navy10,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey130
          },
          successSecondary: {
            base: primitives.color.green.green40,
            hover: primitives.color.green.green30,
            active: primitives.color.green.green40,
            disabled: primitives.color.grey.grey130
          },
          destructiveSecondary: {
            base: primitives.color.red.red40,
            hover: primitives.color.red.red30,
            active: primitives.color.red.red40,
            disabled: primitives.color.grey.grey130
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
        blue: primitives.color.blue.blue50,
        green: primitives.color.green.green50,
        red: primitives.color.red.red50,
        orange: primitives.color.orange.orange50,
        grey: primitives.color.grey.grey10,
        ash: primitives.color.grey.grey40,
        plum: primitives.color.plum.plum50,
        violet: primitives.color.violet.violet50,
        stone: primitives.color.stone.stone50,
        sky: primitives.color.sky.sky50,
        honey: primitives.color.honey.honey50,
        sea: primitives.color.sea.sea50,
        aurora: primitives.color.aurora.aurora50
      }
    },
    dropShadow: {
      shadowColor1: 'rgba(0,0,0,0.3)',
      shadowColor2: 'rgba(0,0,0,0.15)'
    },
    transparentColor: primitives.color.transparent,
    institutional: {
      brandPrimary: primitives.color.navy.navy10,
      brandFontColorDark: primitives.color.white,
      linkColor: primitives.color.blue.blue50,
      brandButtonPrimaryBgd: primitives.color.navy.navy10,
      brandButtonPrimaryText: primitives.color.navy.navy170,
      brandGlobalNavBgd: primitives.color.grey.grey170,
      globalNavLinkHover: primitives.color.grey.grey170,
      brandGlobalNavMenuItemTextColor: primitives.color.white,
      brandGlobalNavMenuItemTextColorActive: primitives.color.grey.grey180
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
      elevation1: { dropshadow1: '0px', dropshadow2: '2px' },
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
