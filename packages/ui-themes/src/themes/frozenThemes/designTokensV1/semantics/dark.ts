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

import type { PrimitivesDark as Primitives } from '../primitives'

export type Semantics = {
  color: {
    background: {
      base: Primitives['color']['grey']['grey200']
      muted: Primitives['color']['grey']['grey170']
      mutedHover: Primitives['color']['grey']['grey180']
      page: Primitives['color']['grey']['grey200']
      container: Primitives['color']['grey']['grey180']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['grey']['grey10']
      dark: Primitives['color']['grey']['grey180']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['honey']['honey110']
      info: Primitives['color']['blue']['blue100']
      brand: Primitives['color']['navy']['navy10']
      aiTopGradient: Primitives['color']['violet']['violet100']
      aiBottomGradient: Primitives['color']['sea']['sea100']
      aiText: Primitives['color']['violet']['violet140']
      opacity: Primitives['color']['whiteOpacity10']
      opacityOnColor: Primitives['color']['whiteOpacity10']
      mobileNav: Primitives['color']['grey']['grey190']
      divider: {
        base: Primitives['color']['grey']['grey140']
        onColor: Primitives['color']['grey']['grey180']
      }
      interactive: {
        input: {
          base: Primitives['color']['grey']['grey190']
          hover: Primitives['color']['grey']['grey190']
          readonly: Primitives['color']['grey']['grey100']
          disabled: Primitives['color']['grey']['grey150']
          selected: Primitives['color']['white']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['white']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey130']
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
            hover: Primitives['color']['navy']['navy10']
            active: Primitives['color']['navy']['navy20']
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
        base: Primitives['color']['grey']['grey190']
        inverse: Primitives['color']['grey']['grey10']
      }
      overlay: {
        base: Primitives['color']['greyOpacity75']
        dark: Primitives['color']['greyOpacity75']
      }
      chart: {
        categorical: {
          color10: Primitives['color']['blue']['blue80']
          color11: Primitives['color']['violet']['violet50']
          color00: Primitives['color']['sky']['sky50']
          color01: Primitives['color']['violet']['violet80']
          color02: Primitives['color']['orange']['orange50']
          color03: Primitives['color']['aurora']['aurora80']
          color04: Primitives['color']['plum']['plum50']
          color05: Primitives['color']['sky']['sky80']
          color06: Primitives['color']['sea']['sea50']
          color07: Primitives['color']['plum']['plum80']
          color08: Primitives['color']['honey']['honey50']
          color09: Primitives['color']['red']['red50']
        }
        categoricalGroup5: {
          color00: Primitives['color']['aurora']['aurora80']
          color01: Primitives['color']['orange']['orange50']
          color02: Primitives['color']['violet']['violet80']
          color03: Primitives['color']['sea']['sea50']
          color04: Primitives['color']['plum']['plum80']
        }
        categoricalGroup4: {
          color00: Primitives['color']['sky']['sky80']
          color01: Primitives['color']['honey']['honey50']
          color02: Primitives['color']['violet']['violet80']
          color03: Primitives['color']['red']['red50']
        }
        categoricalGroup3: {
          color00: Primitives['color']['violet']['violet50']
          color01: Primitives['color']['sky']['sky80']
          color02: Primitives['color']['orange']['orange50']
        }
        categoricalGroup2: {
          color00: Primitives['color']['violet']['violet80']
          color01: Primitives['color']['sea']['sea50']
        }
        sequential: {
          violet: {
            color0: Primitives['color']['violet']['violet10']
            color1: Primitives['color']['violet']['violet20']
            color2: Primitives['color']['violet']['violet30']
            color3: Primitives['color']['violet']['violet40']
            color4: Primitives['color']['violet']['violet50']
            color5: Primitives['color']['violet']['violet60']
            color6: Primitives['color']['violet']['violet70']
            color7: Primitives['color']['violet']['violet80']
            color8: Primitives['color']['violet']['violet90']
            color9: Primitives['color']['violet']['violet100']
          }
          plum: {
            color0: Primitives['color']['plum']['plum10']
            color1: Primitives['color']['plum']['plum20']
            color2: Primitives['color']['plum']['plum30']
            color3: Primitives['color']['plum']['plum40']
            color4: Primitives['color']['plum']['plum50']
            color5: Primitives['color']['plum']['plum60']
            color6: Primitives['color']['plum']['plum70']
            color7: Primitives['color']['plum']['plum80']
            color8: Primitives['color']['plum']['plum90']
            color9: Primitives['color']['plum']['plum100']
          }
          red: {
            color0: Primitives['color']['red']['red10']
            color1: Primitives['color']['red']['red20']
            color2: Primitives['color']['red']['red30']
            color3: Primitives['color']['red']['red40']
            color4: Primitives['color']['red']['red50']
            color5: Primitives['color']['red']['red60']
            color6: Primitives['color']['red']['red70']
            color7: Primitives['color']['red']['red80']
            color8: Primitives['color']['red']['red90']
            color9: Primitives['color']['red']['red100']
          }
          orange: {
            color0: Primitives['color']['orange']['orange10']
            color1: Primitives['color']['orange']['orange20']
            color2: Primitives['color']['orange']['orange30']
            color3: Primitives['color']['orange']['orange40']
            color4: Primitives['color']['orange']['orange50']
            color5: Primitives['color']['orange']['orange60']
            color6: Primitives['color']['orange']['orange70']
            color7: Primitives['color']['orange']['orange80']
            color8: Primitives['color']['orange']['orange90']
            color9: Primitives['color']['orange']['orange100']
          }
          honey: {
            color0: Primitives['color']['honey']['honey10']
            color1: Primitives['color']['honey']['honey20']
            color2: Primitives['color']['honey']['honey30']
            color3: Primitives['color']['honey']['honey40']
            color4: Primitives['color']['honey']['honey50']
            color5: Primitives['color']['honey']['honey60']
            color6: Primitives['color']['honey']['honey70']
            color7: Primitives['color']['honey']['honey80']
            color8: Primitives['color']['honey']['honey90']
            color9: Primitives['color']['honey']['honey100']
          }
          green: {
            color0: Primitives['color']['green']['green10']
            color1: Primitives['color']['green']['green20']
            color2: Primitives['color']['green']['green30']
            color3: Primitives['color']['green']['green40']
            color4: Primitives['color']['green']['green50']
            color5: Primitives['color']['green']['green60']
            color6: Primitives['color']['green']['green70']
            color7: Primitives['color']['green']['green80']
            color8: Primitives['color']['green']['green90']
            color9: Primitives['color']['green']['green100']
          }
          aurora: {
            color0: Primitives['color']['aurora']['aurora10']
            color1: Primitives['color']['aurora']['aurora20']
            color2: Primitives['color']['aurora']['aurora30']
            color3: Primitives['color']['aurora']['aurora40']
            color4: Primitives['color']['aurora']['aurora50']
            color5: Primitives['color']['aurora']['aurora50']
            color6: Primitives['color']['aurora']['aurora70']
            color7: Primitives['color']['aurora']['aurora80']
            color8: Primitives['color']['aurora']['aurora90']
            color9: Primitives['color']['aurora']['aurora100']
          }
          sea: {
            color0: Primitives['color']['sea']['sea10']
            color1: Primitives['color']['sea']['sea20']
            color2: Primitives['color']['sea']['sea30']
            color3: Primitives['color']['sea']['sea40']
            color4: Primitives['color']['sea']['sea50']
            color5: Primitives['color']['sea']['sea60']
            color6: Primitives['color']['sea']['sea70']
            color7: Primitives['color']['sea']['sea80']
            color8: Primitives['color']['sea']['sea90']
            color9: Primitives['color']['sea']['sea100']
          }
          sky: {
            color0: Primitives['color']['sky']['sky10']
            color1: Primitives['color']['sky']['sky20']
            color2: Primitives['color']['sky']['sky30']
            color3: Primitives['color']['sky']['sky40']
            color4: Primitives['color']['sky']['sky50']
            color5: Primitives['color']['sky']['sky60']
            color6: Primitives['color']['sky']['sky70']
            color7: Primitives['color']['sky']['sky80']
            color8: Primitives['color']['sky']['sky90']
            color9: Primitives['color']['sky']['sky100']
          }
          blue: {
            color0: Primitives['color']['blue']['blue10']
            color1: Primitives['color']['blue']['blue20']
            color2: Primitives['color']['blue']['blue30']
            color3: Primitives['color']['blue']['blue40']
            color4: Primitives['color']['blue']['blue50']
            color5: Primitives['color']['blue']['blue60']
            color6: Primitives['color']['blue']['blue70']
            color7: Primitives['color']['blue']['blue80']
            color8: Primitives['color']['blue']['blue90']
            color9: Primitives['color']['blue']['blue100']
          }
        }
        diverging: {
          redSea: {
            red5: Primitives['color']['red']['red80']
            red4: Primitives['color']['red']['red70']
            red3: Primitives['color']['red']['red50']
            red2: Primitives['color']['red']['red40']
            red1: Primitives['color']['red']['red30']
            grey0: Primitives['color']['grey']['grey20']
            sea1: Primitives['color']['sea']['sea30']
            sea2: Primitives['color']['sea']['sea40']
            sea3: Primitives['color']['sea']['sea50']
            sea4: Primitives['color']['sea']['sea70']
            sea5: Primitives['color']['sea']['sea80']
          }
          violetSea: {
            purple5: Primitives['color']['violet']['violet80']
            purple4: Primitives['color']['violet']['violet70']
            purple3: Primitives['color']['violet']['violet50']
            purple2: Primitives['color']['violet']['violet40']
            purple1: Primitives['color']['violet']['violet30']
            grey0: Primitives['color']['grey']['grey20']
            sea1: Primitives['color']['sea']['sea30']
            sea2: Primitives['color']['sea']['sea40']
            sea3: Primitives['color']['sea']['sea50']
            sea4: Primitives['color']['sea']['sea70']
            sky5: Primitives['color']['sea']['sea80']
          }
        }
        alert: {
          critical: Primitives['color']['red']['red100']
          danger: Primitives['color']['red']['red80']
          warningMedium: Primitives['color']['orange']['orange50']
          warningLow: Primitives['color']['honey']['honey50']
          success: Primitives['color']['green']['green60']
          info: Primitives['color']['blue']['blue70']
          neutral: Primitives['color']['grey']['grey60']
        }
      }
      pastel: {
        violet: Primitives['color']['violet']['violet160']
        sea: Primitives['color']['sea']['sea160']
        plum: Primitives['color']['plum']['plum160']
        sky: Primitives['color']['sky']['sky160']
        stone: Primitives['color']['stone']['stone160']
        aurora: Primitives['color']['aurora']['aurora160']
        orange: Primitives['color']['orange']['orange160']
        info: Primitives['color']['blue']['blue160']
        success: Primitives['color']['green']['green160']
        warning: Primitives['color']['honey']['honey160']
        error: Primitives['color']['red']['red160']
        neutral: Primitives['color']['grey']['grey160']
      }
      skeleton: {
        backgroundColor: Primitives['color']['grey']['grey110']
        shimmerColor: Primitives['color']['grey']['grey90']
      }
    }
    stroke: {
      base: Primitives['color']['grey']['grey100']
      muted: Primitives['color']['grey']['grey160']
      strong: Primitives['color']['grey']['grey60']
      success: Primitives['color']['green']['green100']
      error: Primitives['color']['red']['red100']
      warning: Primitives['color']['honey']['honey110']
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
          base: Primitives['color']['grey']['grey110']
          hover: Primitives['color']['grey']['grey80']
          readonly: Primitives['color']['grey']['grey70']
          disabled: Primitives['color']['grey']['grey130']
          selected: Primitives['color']['white']
        }
        action: {
          primary: {
            base: Primitives['color']['navy']['navy10']
            hover: Primitives['color']['white']
            active: Primitives['color']['navy']['navy30']
            disabled: Primitives['color']['grey']['grey130']
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
      base: Primitives['color']['grey']['grey10']
      muted: Primitives['color']['grey']['grey50']
      success: Primitives['color']['green']['green50']
      error: Primitives['color']['red']['red50']
      warning: Primitives['color']['honey']['honey50']
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
          hover: Primitives['color']['grey']['grey60']
          readonly: Primitives['color']['white']
          placeholder: Primitives['color']['grey']['grey80']
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
            disabled: Primitives['color']['grey']['grey170']
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
      warning: Primitives['color']['honey']['honey50']
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
            disabled: Primitives['color']['grey']['grey170']
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
    institutional: {
      brandPrimary: Primitives['color']['navy']['navy10']
      brandFontColorDark: Primitives['color']['white']
      linkColor: Primitives['color']['blue']['blue50']
      brandButtonPrimaryBgd: Primitives['color']['navy']['navy10']
      brandButtonPrimaryText: Primitives['color']['navy']['navy170']
      brandButtonSecondaryBgd: {
        value: Primitives['color']['navy']['navy60']
        modify: { type: string; value: number; space: string }
      }
      brandButtonSecondaryText: Primitives['color']['white']
      brandGlobalNavBgd: Primitives['color']['grey']['grey180']
      globalNavLinkHover: Primitives['color']['grey']['grey170']
      brandGlobalNavMenuItemTextColor: Primitives['color']['white']
      brandGlobalNavMenuItemTextColorActive: Primitives['color']['grey']['grey180']
    }
    transparentColor: Primitives['color']['transparent']
    mobileCourse: Primitives['color']['plum']['plum50']
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
  }
  breakpoints: { sm: string; md: string; lg: string; xl: string }
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
        md: Primitives['size']['size16']
        lg: Primitives['size']['size24']
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
    text2xl: Primitives['size']['size36']
  }
  opacity: { base: Primitives['opacity100']; disabled: Primitives['opacity50'] }
}

const semantics = (primitives: Primitives): Semantics => ({
  color: {
    background: {
      base: primitives.color.grey.grey200,
      muted: primitives.color.grey.grey170,
      mutedHover: primitives.color.grey.grey180,
      page: primitives.color.grey.grey200,
      container: primitives.color.grey.grey180,
      onColor: primitives.color.white,
      inverse: primitives.color.grey.grey10,
      dark: primitives.color.grey.grey180,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.honey.honey110,
      info: primitives.color.blue.blue100,
      brand: primitives.color.navy.navy10,
      aiTopGradient: primitives.color.violet.violet100,
      aiBottomGradient: primitives.color.sea.sea100,
      aiText: primitives.color.violet.violet140,
      opacity: primitives.color.whiteOpacity10,
      opacityOnColor: primitives.color.whiteOpacity10,
      mobileNav: primitives.color.grey.grey190,
      divider: {
        base: primitives.color.grey.grey140,
        onColor: primitives.color.grey.grey180
      },
      interactive: {
        input: {
          base: primitives.color.grey.grey190,
          hover: primitives.color.grey.grey190,
          readonly: primitives.color.grey.grey100,
          disabled: primitives.color.grey.grey150,
          selected: primitives.color.white
        },
        action: {
          primary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.white,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey130
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
            hover: primitives.color.navy.navy10,
            active: primitives.color.navy.navy20,
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
        base: primitives.color.grey.grey190,
        inverse: primitives.color.grey.grey10
      },
      overlay: {
        base: primitives.color.greyOpacity75,
        dark: primitives.color.greyOpacity75
      },
      chart: {
        categorical: {
          color10: primitives.color.blue.blue80,
          color11: primitives.color.violet.violet50,
          color00: primitives.color.sky.sky50,
          color01: primitives.color.violet.violet80,
          color02: primitives.color.orange.orange50,
          color03: primitives.color.aurora.aurora80,
          color04: primitives.color.plum.plum50,
          color05: primitives.color.sky.sky80,
          color06: primitives.color.sea.sea50,
          color07: primitives.color.plum.plum80,
          color08: primitives.color.honey.honey50,
          color09: primitives.color.red.red50
        },
        categoricalGroup5: {
          color00: primitives.color.aurora.aurora80,
          color01: primitives.color.orange.orange50,
          color02: primitives.color.violet.violet80,
          color03: primitives.color.sea.sea50,
          color04: primitives.color.plum.plum80
        },
        categoricalGroup4: {
          color00: primitives.color.sky.sky80,
          color01: primitives.color.honey.honey50,
          color02: primitives.color.violet.violet80,
          color03: primitives.color.red.red50
        },
        categoricalGroup3: {
          color00: primitives.color.violet.violet50,
          color01: primitives.color.sky.sky80,
          color02: primitives.color.orange.orange50
        },
        categoricalGroup2: {
          color00: primitives.color.violet.violet80,
          color01: primitives.color.sea.sea50
        },
        sequential: {
          violet: {
            color0: primitives.color.violet.violet10,
            color1: primitives.color.violet.violet20,
            color2: primitives.color.violet.violet30,
            color3: primitives.color.violet.violet40,
            color4: primitives.color.violet.violet50,
            color5: primitives.color.violet.violet60,
            color6: primitives.color.violet.violet70,
            color7: primitives.color.violet.violet80,
            color8: primitives.color.violet.violet90,
            color9: primitives.color.violet.violet100
          },
          plum: {
            color0: primitives.color.plum.plum10,
            color1: primitives.color.plum.plum20,
            color2: primitives.color.plum.plum30,
            color3: primitives.color.plum.plum40,
            color4: primitives.color.plum.plum50,
            color5: primitives.color.plum.plum60,
            color6: primitives.color.plum.plum70,
            color7: primitives.color.plum.plum80,
            color8: primitives.color.plum.plum90,
            color9: primitives.color.plum.plum100
          },
          red: {
            color0: primitives.color.red.red10,
            color1: primitives.color.red.red20,
            color2: primitives.color.red.red30,
            color3: primitives.color.red.red40,
            color4: primitives.color.red.red50,
            color5: primitives.color.red.red60,
            color6: primitives.color.red.red70,
            color7: primitives.color.red.red80,
            color8: primitives.color.red.red90,
            color9: primitives.color.red.red100
          },
          orange: {
            color0: primitives.color.orange.orange10,
            color1: primitives.color.orange.orange20,
            color2: primitives.color.orange.orange30,
            color3: primitives.color.orange.orange40,
            color4: primitives.color.orange.orange50,
            color5: primitives.color.orange.orange60,
            color6: primitives.color.orange.orange70,
            color7: primitives.color.orange.orange80,
            color8: primitives.color.orange.orange90,
            color9: primitives.color.orange.orange100
          },
          honey: {
            color0: primitives.color.honey.honey10,
            color1: primitives.color.honey.honey20,
            color2: primitives.color.honey.honey30,
            color3: primitives.color.honey.honey40,
            color4: primitives.color.honey.honey50,
            color5: primitives.color.honey.honey60,
            color6: primitives.color.honey.honey70,
            color7: primitives.color.honey.honey80,
            color8: primitives.color.honey.honey90,
            color9: primitives.color.honey.honey100
          },
          green: {
            color0: primitives.color.green.green10,
            color1: primitives.color.green.green20,
            color2: primitives.color.green.green30,
            color3: primitives.color.green.green40,
            color4: primitives.color.green.green50,
            color5: primitives.color.green.green60,
            color6: primitives.color.green.green70,
            color7: primitives.color.green.green80,
            color8: primitives.color.green.green90,
            color9: primitives.color.green.green100
          },
          aurora: {
            color0: primitives.color.aurora.aurora10,
            color1: primitives.color.aurora.aurora20,
            color2: primitives.color.aurora.aurora30,
            color3: primitives.color.aurora.aurora40,
            color4: primitives.color.aurora.aurora50,
            color5: primitives.color.aurora.aurora50,
            color6: primitives.color.aurora.aurora70,
            color7: primitives.color.aurora.aurora80,
            color8: primitives.color.aurora.aurora90,
            color9: primitives.color.aurora.aurora100
          },
          sea: {
            color0: primitives.color.sea.sea10,
            color1: primitives.color.sea.sea20,
            color2: primitives.color.sea.sea30,
            color3: primitives.color.sea.sea40,
            color4: primitives.color.sea.sea50,
            color5: primitives.color.sea.sea60,
            color6: primitives.color.sea.sea70,
            color7: primitives.color.sea.sea80,
            color8: primitives.color.sea.sea90,
            color9: primitives.color.sea.sea100
          },
          sky: {
            color0: primitives.color.sky.sky10,
            color1: primitives.color.sky.sky20,
            color2: primitives.color.sky.sky30,
            color3: primitives.color.sky.sky40,
            color4: primitives.color.sky.sky50,
            color5: primitives.color.sky.sky60,
            color6: primitives.color.sky.sky70,
            color7: primitives.color.sky.sky80,
            color8: primitives.color.sky.sky90,
            color9: primitives.color.sky.sky100
          },
          blue: {
            color0: primitives.color.blue.blue10,
            color1: primitives.color.blue.blue20,
            color2: primitives.color.blue.blue30,
            color3: primitives.color.blue.blue40,
            color4: primitives.color.blue.blue50,
            color5: primitives.color.blue.blue60,
            color6: primitives.color.blue.blue70,
            color7: primitives.color.blue.blue80,
            color8: primitives.color.blue.blue90,
            color9: primitives.color.blue.blue100
          }
        },
        diverging: {
          redSea: {
            red5: primitives.color.red.red80,
            red4: primitives.color.red.red70,
            red3: primitives.color.red.red50,
            red2: primitives.color.red.red40,
            red1: primitives.color.red.red30,
            grey0: primitives.color.grey.grey20,
            sea1: primitives.color.sea.sea30,
            sea2: primitives.color.sea.sea40,
            sea3: primitives.color.sea.sea50,
            sea4: primitives.color.sea.sea70,
            sea5: primitives.color.sea.sea80
          },
          violetSea: {
            purple5: primitives.color.violet.violet80,
            purple4: primitives.color.violet.violet70,
            purple3: primitives.color.violet.violet50,
            purple2: primitives.color.violet.violet40,
            purple1: primitives.color.violet.violet30,
            grey0: primitives.color.grey.grey20,
            sea1: primitives.color.sea.sea30,
            sea2: primitives.color.sea.sea40,
            sea3: primitives.color.sea.sea50,
            sea4: primitives.color.sea.sea70,
            sky5: primitives.color.sea.sea80
          }
        },
        alert: {
          critical: primitives.color.red.red100,
          danger: primitives.color.red.red80,
          warningMedium: primitives.color.orange.orange50,
          warningLow: primitives.color.honey.honey50,
          success: primitives.color.green.green60,
          info: primitives.color.blue.blue70,
          neutral: primitives.color.grey.grey60
        }
      },
      pastel: {
        violet: primitives.color.violet.violet160,
        sea: primitives.color.sea.sea160,
        plum: primitives.color.plum.plum160,
        sky: primitives.color.sky.sky160,
        stone: primitives.color.stone.stone160,
        aurora: primitives.color.aurora.aurora160,
        orange: primitives.color.orange.orange160,
        info: primitives.color.blue.blue160,
        success: primitives.color.green.green160,
        warning: primitives.color.honey.honey160,
        error: primitives.color.red.red160,
        neutral: primitives.color.grey.grey160
      },
      skeleton: {
        backgroundColor: primitives.color.grey.grey110,
        shimmerColor: primitives.color.grey.grey90
      }
    },
    stroke: {
      base: primitives.color.grey.grey100,
      muted: primitives.color.grey.grey160,
      strong: primitives.color.grey.grey60,
      success: primitives.color.green.green100,
      error: primitives.color.red.red100,
      warning: primitives.color.honey.honey110,
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
          base: primitives.color.grey.grey110,
          hover: primitives.color.grey.grey80,
          readonly: primitives.color.grey.grey70,
          disabled: primitives.color.grey.grey130,
          selected: primitives.color.white
        },
        action: {
          primary: {
            base: primitives.color.navy.navy10,
            hover: primitives.color.white,
            active: primitives.color.navy.navy30,
            disabled: primitives.color.grey.grey130
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
      base: primitives.color.grey.grey10,
      muted: primitives.color.grey.grey50,
      success: primitives.color.green.green50,
      error: primitives.color.red.red50,
      warning: primitives.color.honey.honey50,
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
          hover: primitives.color.grey.grey60,
          readonly: primitives.color.white,
          placeholder: primitives.color.grey.grey80,
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
            disabled: primitives.color.grey.grey170
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
      warning: primitives.color.honey.honey50,
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
            disabled: primitives.color.grey.grey170
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
    institutional: {
      brandPrimary: primitives.color.navy.navy10,
      brandFontColorDark: primitives.color.white,
      linkColor: primitives.color.blue.blue50,
      brandButtonPrimaryBgd: primitives.color.navy.navy10,
      brandButtonPrimaryText: primitives.color.navy.navy170,
      brandButtonSecondaryBgd: {
        value: primitives.color.navy.navy60,
        modify: { type: 'alpha', value: 0.3, space: 'hsl' }
      },
      brandButtonSecondaryText: primitives.color.white,
      brandGlobalNavBgd: primitives.color.grey.grey180,
      globalNavLinkHover: primitives.color.grey.grey170,
      brandGlobalNavMenuItemTextColor: primitives.color.white,
      brandGlobalNavMenuItemTextColorActive: primitives.color.grey.grey180
    },
    transparentColor: primitives.color.transparent,
    mobileCourse: primitives.color.plum.plum50
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
    }
  },
  breakpoints: { sm: '30em', md: '48em', lg: '64em', xl: '80em' },
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
        md: primitives.size.size16,
        lg: primitives.size.size24
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
    text2xl: primitives.size.size36
  },
  opacity: { base: primitives.opacity100, disabled: primitives.opacity50 }
})
export default semantics
