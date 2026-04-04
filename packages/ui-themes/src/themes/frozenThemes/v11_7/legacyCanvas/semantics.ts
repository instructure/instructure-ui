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
      page: Primitives['color']['white']
      container: Primitives['color']['white']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey150']
      dark: Primitives['color']['grey']['grey150']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['blue']['blue100']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      aiText: Primitives['color']['violet']['violet20']
      opacity: Primitives['color']['greyOpacity10']
      opacityOnColor: Primitives['color']['whiteOpacity10']
      divider: {
        base: Primitives['color']['grey']['grey40']
        onColor: Primitives['color']['white']
      }
      interactive: {
        input: {
          base: Primitives['color']['white']
          hover: Primitives['color']['white']
          readonly: Primitives['color']['white']
          disabled: Primitives['color']['grey']['grey10']
          selected: Primitives['color']['grey']['grey170']
        }
        action: {
          primary: {
            base: Primitives['color']['blue']['blue100']
            hover: Primitives['color']['blue']['blue120']
            active: Primitives['color']['blue']['blue120']
            disabled: Primitives['color']['blue']['blue100']
          }
          secondary: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey20']
            active: Primitives['color']['grey']['grey20']
            disabled: Primitives['color']['grey']['grey10']
          }
          destructive: {
            base: Primitives['color']['red']['red100']
            hover: Primitives['color']['red']['red110']
            active: Primitives['color']['red']['red110']
            disabled: Primitives['color']['red']['red100']
            secondary: {
              hover: Primitives['color']['red']['red20']
              active: Primitives['color']['red']['red20']
            }
          }
          success: {
            base: Primitives['color']['green']['green100']
            hover: Primitives['color']['green']['green120']
            active: Primitives['color']['green']['green120']
            disabled: Primitives['color']['green']['green100']
            secondary: {
              hover: Primitives['color']['green']['green20']
              active: Primitives['color']['green']['green20']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet100']
              hover: Primitives['color']['violet']['violet130']
              active: Primitives['color']['violet']['violet130']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea100']
              hover: Primitives['color']['sea']['sea130']
              active: Primitives['color']['sea']['sea130']
            }
            disabled: Primitives['color']['grey']['grey30']
          }
          primaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
            disabled: Primitives['color']['white']
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
          tertiary: {
            hover: Primitives['color']['blue']['blue20']
            active: Primitives['color']['blue']['blue20']
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
        grey: Primitives['color']['grey']['grey120']
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
      muted: Primitives['color']['grey']['grey30']
      strong: Primitives['color']['grey']['grey110']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['blue']['blue100']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      container: {
        base: Primitives['color']['grey']['grey70']
        dark: Primitives['color']['grey']['grey170']
      }
      interactive: {
        focusRing: {
          base: Primitives['color']['blue']['blue100']
          onColor: Primitives['color']['white']
        }
        input: {
          base: Primitives['color']['grey']['grey70']
          hover: Primitives['color']['grey']['grey70']
          readonly: Primitives['color']['grey']['grey70']
          disabled: Primitives['color']['grey']['grey40']
          selected: Primitives['color']['grey']['grey170']
        }
        action: {
          primary: {
            base: Primitives['color']['blue']['blue120']
            hover: Primitives['color']['blue']['blue120']
            active: Primitives['color']['blue']['blue120']
            disabled: Primitives['color']['blue']['blue120']
          }
          secondary: {
            base: Primitives['color']['grey']['grey40']
            hover: Primitives['color']['grey']['grey40']
            active: Primitives['color']['grey']['grey40']
            disabled: Primitives['color']['grey']['grey40']
          }
          destructive: {
            base: Primitives['color']['red']['red120']
            hover: Primitives['color']['red']['red90']
            active: Primitives['color']['red']['red110']
            disabled: Primitives['color']['red']['red120']
            secondary: {
              base: Primitives['color']['red']['red110']
              hover: Primitives['color']['red']['red110']
              active: Primitives['color']['red']['red110']
              disabled: Primitives['color']['red']['red110']
            }
          }
          success: {
            base: Primitives['color']['green']['green120']
            hover: Primitives['color']['green']['green120']
            active: Primitives['color']['green']['green120']
            disabled: Primitives['color']['green']['green120']
            secondary: {
              base: Primitives['color']['green']['green100']
              hover: Primitives['color']['green']['green120']
              active: Primitives['color']['green']['green120']
              disabled: Primitives['color']['green']['green100']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet120']
              hover: Primitives['color']['violet']['violet100']
              active: Primitives['color']['violet']['violet120']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea120']
              hover: Primitives['color']['sea']['sea100']
              active: Primitives['color']['sea']['sea120']
            }
            disabled: Primitives['color']['grey']['grey30']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey20']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
            disabled: Primitives['color']['white']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue130']
            active: Primitives['color']['blue']['blue130']
            disabled: Primitives['color']['blue']['blue130']
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
        blue: Primitives['color']['blue']['blue100']
        green: Primitives['color']['green']['green100']
        red: Primitives['color']['red']['red100']
        orange: Primitives['color']['orange']['orange100']
        grey: Primitives['color']['grey']['grey120']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum100']
        violet: Primitives['color']['violet']['violet100']
        stone: Primitives['color']['stone']['stone100']
        sky: Primitives['color']['sky']['sky100']
        honey: Primitives['color']['honey']['honey100']
        sea: Primitives['color']['sea']['sea100']
        aurora: Primitives['color']['aurora']['aurora100']
      }
    }
    text: {
      base: Primitives['color']['grey']['grey170']
      muted: Primitives['color']['grey']['grey120']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red120']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      aiColor: Primitives['color']['violet']['violet120']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey70']
          onColor: Primitives['color']['grey']['grey40']
        }
        input: {
          base: Primitives['color']['grey']['grey170']
          hover: Primitives['color']['grey']['grey170']
          readonly: Primitives['color']['grey']['grey170']
          placeholder: Primitives['color']['grey']['grey100']
          disabled: Primitives['color']['grey']['grey70']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue100']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue110']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['grey']['grey150']
            hover: Primitives['color']['grey']['grey150']
            active: Primitives['color']['grey']['grey150']
            disabled: Primitives['color']['grey']['grey150']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet100'] }
            bottomGradient: { base: Primitives['color']['sea']['sea100'] }
            disabled: Primitives['color']['grey']['grey50']
          }
          primary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey150']
            hover: Primitives['color']['grey']['grey150']
            active: Primitives['color']['grey']['grey150']
            disabled: Primitives['color']['grey']['grey150']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue130']
            active: Primitives['color']['blue']['blue130']
            disabled: Primitives['color']['blue']['blue130']
          }
          successSecondary: {
            base: Primitives['color']['green']['green100']
            hover: Primitives['color']['green']['green120']
            active: Primitives['color']['green']['green120']
            disabled: Primitives['color']['green']['green100']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red120']
            active: Primitives['color']['red']['red110']
            disabled: Primitives['color']['red']['red110']
          }
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue100']
        green: Primitives['color']['green']['green100']
        red: Primitives['color']['red']['red100']
        orange: Primitives['color']['orange']['orange100']
        grey: Primitives['color']['grey']['grey120']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum100']
        violet: Primitives['color']['violet']['violet100']
        stone: Primitives['color']['stone']['stone100']
        sky: Primitives['color']['sky']['sky100']
        honey: Primitives['color']['honey']['honey100']
        sea: Primitives['color']['sea']['sea100']
        aurora: Primitives['color']['aurora']['aurora100']
      }
      dark: Primitives['color']['grey']['grey180']
    }
    icon: {
      base: Primitives['color']['grey']['grey170']
      muted: Primitives['color']['grey']['grey120']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red120']
      warning: Primitives['color']['orange']['orange100']
      info: Primitives['color']['blue']['blue100']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      brand: Primitives['color']['blue']['blue100']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey70']
          onColor: Primitives['color']['grey']['grey40']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue100']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue110']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['grey']['grey150']
            hover: Primitives['color']['grey']['grey150']
            active: Primitives['color']['grey']['grey150']
            disabled: Primitives['color']['grey']['grey150']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet100'] }
            bottomGradient: { base: Primitives['color']['sea']['sea100'] }
            disabled: Primitives['color']['grey']['grey50']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          primary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey150']
            hover: Primitives['color']['grey']['grey150']
            active: Primitives['color']['grey']['grey150']
            disabled: Primitives['color']['grey']['grey150']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue130']
            active: Primitives['color']['blue']['blue130']
            disabled: Primitives['color']['blue']['blue130']
          }
          successSecondary: {
            base: Primitives['color']['green']['green100']
            hover: Primitives['color']['green']['green120']
            active: Primitives['color']['green']['green120']
            disabled: Primitives['color']['green']['green100']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red110']
            hover: Primitives['color']['red']['red120']
            active: Primitives['color']['red']['red110']
            disabled: Primitives['color']['red']['red110']
          }
          secondaryOnColor: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue100']
        green: Primitives['color']['green']['green100']
        red: Primitives['color']['red']['red100']
        orange: Primitives['color']['orange']['orange100']
        grey: Primitives['color']['grey']['grey120']
        ash: Primitives['color']['grey']['grey170']
        plum: Primitives['color']['plum']['plum100']
        violet: Primitives['color']['violet']['violet100']
        stone: Primitives['color']['stone']['stone100']
        sky: Primitives['color']['sky']['sky100']
        honey: Primitives['color']['honey']['honey100']
        sea: Primitives['color']['sea']['sea100']
        aurora: Primitives['color']['aurora']['aurora100']
      }
    }
    dropShadow: { shadowColor1: string; shadowColor2: string }
    transparentColor: Primitives['color']['transparent']
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
        sm: Primitives['size']['size28']
        md: string
        lg: Primitives['size']['size48']
      }
    }
    choiceControl: {
      height: {
        sm: Primitives['size']['size16']
        md: Primitives['size']['size20']
        lg: Primitives['size']['size28']
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
        sm: Primitives['size']['size12']
        md: Primitives['size']['size24']
        lg: Primitives['size']['size24']
      }
      inputs: {
        horizontal: Primitives['size']['size12']
        vertical: Primitives['size']['size16']
      }
      inputElements: Primitives['size']['size12']
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
    xs: Primitives['size']['size4']
    sm: Primitives['size']['size4']
    md: Primitives['size']['size4']
    lg: Primitives['size']['size4']
    xl: Primitives['size']['size4']
    xxl: Primitives['size']['size4']
    full: string
    container: {
      sm: Primitives['size']['size4']
      md: Primitives['size']['size4']
      lg: Primitives['size']['size4']
      xl: Primitives['size']['size4']
    }
    interactive: { base: Primitives['size']['size4'] }
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
    heading: Primitives['fontFamily']['lato']
    base: Primitives['fontFamily']['lato']
    code: Primitives['fontFamily']['menlo']
  }
  fontWeight: {
    body: {
      base: Primitives['fontWeight']['regular']
      strong: Primitives['fontWeight']['bold']
    }
    heading: {
      base: Primitives['fontWeight']['regular']
      strong: Primitives['fontWeight']['bold']
    }
    interactive: Primitives['fontWeight']['regular']
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
    textLg: string
    textXl: Primitives['size']['size28']
    text2xl: string
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
      page: primitives.color.white,
      container: primitives.color.white,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey150,
      dark: primitives.color.grey.grey150,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.blue.blue100,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      aiText: primitives.color.violet.violet20,
      opacity: primitives.color.greyOpacity10,
      opacityOnColor: primitives.color.whiteOpacity10,
      divider: {
        base: primitives.color.grey.grey40,
        onColor: primitives.color.white
      },
      interactive: {
        input: {
          base: primitives.color.white,
          hover: primitives.color.white,
          readonly: primitives.color.white,
          disabled: primitives.color.grey.grey10,
          selected: primitives.color.grey.grey170
        },
        action: {
          primary: {
            base: primitives.color.blue.blue100,
            hover: primitives.color.blue.blue120,
            active: primitives.color.blue.blue120,
            disabled: primitives.color.blue.blue100
          },
          secondary: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey20,
            active: primitives.color.grey.grey20,
            disabled: primitives.color.grey.grey10
          },
          destructive: {
            base: primitives.color.red.red100,
            hover: primitives.color.red.red110,
            active: primitives.color.red.red110,
            disabled: primitives.color.red.red100,
            secondary: {
              hover: primitives.color.red.red20,
              active: primitives.color.red.red20
            }
          },
          success: {
            base: primitives.color.green.green100,
            hover: primitives.color.green.green120,
            active: primitives.color.green.green120,
            disabled: primitives.color.green.green100,
            secondary: {
              hover: primitives.color.green.green20,
              active: primitives.color.green.green20
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet100,
              hover: primitives.color.violet.violet130,
              active: primitives.color.violet.violet130
            },
            bottomGradient: {
              base: primitives.color.sea.sea100,
              hover: primitives.color.sea.sea130,
              active: primitives.color.sea.sea130
            },
            disabled: primitives.color.grey.grey30
          },
          primaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10,
            disabled: primitives.color.white
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
          tertiary: {
            hover: primitives.color.blue.blue20,
            active: primitives.color.blue.blue20
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
        grey: primitives.color.grey.grey120,
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
      muted: primitives.color.grey.grey30,
      strong: primitives.color.grey.grey110,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      brand: primitives.color.blue.blue100,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      container: {
        base: primitives.color.grey.grey70,
        dark: primitives.color.grey.grey170
      },
      interactive: {
        focusRing: {
          base: primitives.color.blue.blue100,
          onColor: primitives.color.white
        },
        input: {
          base: primitives.color.grey.grey70,
          hover: primitives.color.grey.grey70,
          readonly: primitives.color.grey.grey70,
          disabled: primitives.color.grey.grey40,
          selected: primitives.color.grey.grey170
        },
        action: {
          primary: {
            base: primitives.color.blue.blue120,
            hover: primitives.color.blue.blue120,
            active: primitives.color.blue.blue120,
            disabled: primitives.color.blue.blue120
          },
          secondary: {
            base: primitives.color.grey.grey40,
            hover: primitives.color.grey.grey40,
            active: primitives.color.grey.grey40,
            disabled: primitives.color.grey.grey40
          },
          destructive: {
            base: primitives.color.red.red120,
            hover: primitives.color.red.red90,
            active: primitives.color.red.red110,
            disabled: primitives.color.red.red120,
            secondary: {
              base: primitives.color.red.red110,
              hover: primitives.color.red.red110,
              active: primitives.color.red.red110,
              disabled: primitives.color.red.red110
            }
          },
          success: {
            base: primitives.color.green.green120,
            hover: primitives.color.green.green120,
            active: primitives.color.green.green120,
            disabled: primitives.color.green.green120,
            secondary: {
              base: primitives.color.green.green100,
              hover: primitives.color.green.green120,
              active: primitives.color.green.green120,
              disabled: primitives.color.green.green100
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet120,
              hover: primitives.color.violet.violet100,
              active: primitives.color.violet.violet120
            },
            bottomGradient: {
              base: primitives.color.sea.sea120,
              hover: primitives.color.sea.sea100,
              active: primitives.color.sea.sea120
            },
            disabled: primitives.color.grey.grey30
          },
          primaryOnColor: {
            base: primitives.color.grey.grey20,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10,
            disabled: primitives.color.white
          },
          tertiary: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue130,
            active: primitives.color.blue.blue130,
            disabled: primitives.color.blue.blue130
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
        blue: primitives.color.blue.blue100,
        green: primitives.color.green.green100,
        red: primitives.color.red.red100,
        orange: primitives.color.orange.orange100,
        grey: primitives.color.grey.grey120,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum100,
        violet: primitives.color.violet.violet100,
        stone: primitives.color.stone.stone100,
        sky: primitives.color.sky.sky100,
        honey: primitives.color.honey.honey100,
        sea: primitives.color.sea.sea100,
        aurora: primitives.color.aurora.aurora100
      }
    },
    text: {
      base: primitives.color.grey.grey170,
      muted: primitives.color.grey.grey120,
      success: primitives.color.green.green100,
      error: primitives.color.red.red120,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      aiColor: primitives.color.violet.violet120,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey70,
          onColor: primitives.color.grey.grey40
        },
        input: {
          base: primitives.color.grey.grey170,
          hover: primitives.color.grey.grey170,
          readonly: primitives.color.grey.grey170,
          placeholder: primitives.color.grey.grey100,
          disabled: primitives.color.grey.grey70
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue100,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue110
          },
          primaryOnColor: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10
          }
        },
        action: {
          secondary: {
            base: primitives.color.grey.grey150,
            hover: primitives.color.grey.grey150,
            active: primitives.color.grey.grey150,
            disabled: primitives.color.grey.grey150
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet100 },
            bottomGradient: { base: primitives.color.sea.sea100 },
            disabled: primitives.color.grey.grey50
          },
          primary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          primaryOnColor: {
            base: primitives.color.grey.grey150,
            hover: primitives.color.grey.grey150,
            active: primitives.color.grey.grey150,
            disabled: primitives.color.grey.grey150
          },
          tertiary: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue130,
            active: primitives.color.blue.blue130,
            disabled: primitives.color.blue.blue130
          },
          successSecondary: {
            base: primitives.color.green.green100,
            hover: primitives.color.green.green120,
            active: primitives.color.green.green120,
            disabled: primitives.color.green.green100
          },
          destructiveSecondary: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red120,
            active: primitives.color.red.red110,
            disabled: primitives.color.red.red110
          },
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          }
        }
      },
      accent: {
        blue: primitives.color.blue.blue100,
        green: primitives.color.green.green100,
        red: primitives.color.red.red100,
        orange: primitives.color.orange.orange100,
        grey: primitives.color.grey.grey120,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum100,
        violet: primitives.color.violet.violet100,
        stone: primitives.color.stone.stone100,
        sky: primitives.color.sky.sky100,
        honey: primitives.color.honey.honey100,
        sea: primitives.color.sea.sea100,
        aurora: primitives.color.aurora.aurora100
      },
      dark: primitives.color.grey.grey180
    },
    icon: {
      base: primitives.color.grey.grey170,
      muted: primitives.color.grey.grey120,
      success: primitives.color.green.green100,
      error: primitives.color.red.red120,
      warning: primitives.color.orange.orange100,
      info: primitives.color.blue.blue100,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      brand: primitives.color.blue.blue100,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey70,
          onColor: primitives.color.grey.grey40
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue100,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue110
          },
          primaryOnColor: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10
          }
        },
        action: {
          secondary: {
            base: primitives.color.grey.grey150,
            hover: primitives.color.grey.grey150,
            active: primitives.color.grey.grey150,
            disabled: primitives.color.grey.grey150
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet100 },
            bottomGradient: { base: primitives.color.sea.sea100 },
            disabled: primitives.color.grey.grey50
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          primary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          primaryOnColor: {
            base: primitives.color.grey.grey150,
            hover: primitives.color.grey.grey150,
            active: primitives.color.grey.grey150,
            disabled: primitives.color.grey.grey150
          },
          tertiary: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue130,
            active: primitives.color.blue.blue130,
            disabled: primitives.color.blue.blue130
          },
          successSecondary: {
            base: primitives.color.green.green100,
            hover: primitives.color.green.green120,
            active: primitives.color.green.green120,
            disabled: primitives.color.green.green100
          },
          destructiveSecondary: {
            base: primitives.color.red.red110,
            hover: primitives.color.red.red120,
            active: primitives.color.red.red110,
            disabled: primitives.color.red.red110
          },
          secondaryOnColor: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          }
        }
      },
      accent: {
        blue: primitives.color.blue.blue100,
        green: primitives.color.green.green100,
        red: primitives.color.red.red100,
        orange: primitives.color.orange.orange100,
        grey: primitives.color.grey.grey120,
        ash: primitives.color.grey.grey170,
        plum: primitives.color.plum.plum100,
        violet: primitives.color.violet.violet100,
        stone: primitives.color.stone.stone100,
        sky: primitives.color.sky.sky100,
        honey: primitives.color.honey.honey100,
        sea: primitives.color.sea.sea100,
        aurora: primitives.color.aurora.aurora100
      }
    },
    dropShadow: {
      shadowColor1: 'rgba(0,0,0,0.1)',
      shadowColor2: 'rgba(0,0,0,0.2)'
    },
    transparentColor: primitives.color.transparent
  },
  dropShadow: {
    x: {
      elevation1: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation2: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation3: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation4: { dropshadow1: '0px', dropshadow2: '0px' }
    },
    y: {
      elevation1: { dropshadow1: '0.0625rem', dropshadow2: '0.0625rem' },
      elevation2: { dropshadow1: '0.1875rem', dropshadow2: '0.1875rem' },
      elevation3: { dropshadow1: '0.1875rem', dropshadow2: '0.1875rem' },
      elevation4: { dropshadow1: '0.375rem', dropshadow2: '0.625rem' }
    },
    blur: {
      elevation1: { dropshadow1: '0.125rem', dropshadow2: '0.1875rem' },
      elevation2: { dropshadow1: '0.375rem', dropshadow2: '0.375rem' },
      elevation3: { dropshadow1: '0.375rem', dropshadow2: '0.375rem' },
      elevation4: { dropshadow1: '0.4375rem', dropshadow2: '1.75rem' }
    },
    spread: {
      elevation1: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation2: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation3: { dropshadow1: '0px', dropshadow2: '0px' },
      elevation4: { dropshadow1: '0px', dropshadow2: '0px' }
    }
  },
  size: {
    interactive: {
      height: {
        xxs: primitives.size.size20,
        xs: primitives.size.size24,
        sm: primitives.size.size28,
        md: '2.375rem',
        lg: primitives.size.size48
      }
    },
    choiceControl: {
      height: {
        sm: primitives.size.size16,
        md: primitives.size.size20,
        lg: primitives.size.size28
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
        sm: primitives.size.size12,
        md: primitives.size.size24,
        lg: primitives.size.size24
      },
      inputs: {
        horizontal: primitives.size.size12,
        vertical: primitives.size.size16
      },
      inputElements: primitives.size.size12
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
    xs: primitives.size.size4,
    sm: primitives.size.size4,
    md: primitives.size.size4,
    lg: primitives.size.size4,
    xl: primitives.size.size4,
    xxl: primitives.size.size4,
    full: '999rem',
    container: {
      sm: primitives.size.size4,
      md: primitives.size.size4,
      lg: primitives.size.size4,
      xl: primitives.size.size4
    },
    interactive: { base: primitives.size.size4 }
  },
  borderWidth: {
    sm: primitives.size.size1,
    md: primitives.size.size2,
    lg: primitives.size.size4,
    interactive: { base: primitives.size.size1, focus: primitives.size.size2 }
  },
  fontFamily: {
    heading: primitives.fontFamily.lato,
    base: primitives.fontFamily.lato,
    code: primitives.fontFamily.menlo
  },
  fontWeight: {
    body: {
      base: primitives.fontWeight.regular,
      strong: primitives.fontWeight.bold
    },
    heading: {
      base: primitives.fontWeight.regular,
      strong: primitives.fontWeight.bold
    },
    interactive: primitives.fontWeight.regular
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
    textLg: '1.375rem',
    textXl: primitives.size.size28,
    text2xl: '2.375rem'
  },
  visibleInCanvas: 'true',
  visibleInRebrand: 'false',
  opacity: { base: primitives.opacity100, disabled: primitives.opacity50 }
})
export default semantics
