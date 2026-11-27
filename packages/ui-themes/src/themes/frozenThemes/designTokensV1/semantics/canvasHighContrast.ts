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

import type { PrimitivesCanvasHighContrast as Primitives } from '../primitives'

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
      success: Primitives['color']['green']['green140']
      error: Primitives['color']['red']['red140']
      warning: Primitives['color']['orange']['orange140']
      info: Primitives['color']['blue']['blue140']
      brand: Primitives['color']['blue']['blue140']
      aiTopGradient: Primitives['color']['violet']['violet140']
      aiBottomGradient: Primitives['color']['sea']['sea140']
      aiText: Primitives['color']['violet']['violet20']
      opacity: Primitives['color']['greyOpacity10']
      opacityOnColor: Primitives['color']['whiteOpacity10']
      mobileNav: {
        value: Primitives['color']['grey']['grey10']
        modify: { type: string; value: number; space: string }
      }
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
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue140']
            disabled: Primitives['color']['blue']['blue130']
          }
          secondary: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey20']
            active: Primitives['color']['grey']['grey20']
            disabled: Primitives['color']['grey']['grey10']
          }
          destructive: {
            base: Primitives['color']['red']['red130']
            hover: Primitives['color']['red']['red140']
            active: Primitives['color']['red']['red140']
            disabled: Primitives['color']['red']['red130']
            secondary: {
              hover: Primitives['color']['red']['red20']
              active: Primitives['color']['red']['red20']
            }
          }
          success: {
            base: Primitives['color']['green']['green130']
            hover: Primitives['color']['green']['green140']
            active: Primitives['color']['green']['green140']
            disabled: Primitives['color']['green']['green130']
            secondary: {
              hover: Primitives['color']['green']['green20']
              active: Primitives['color']['green']['green20']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet130']
              hover: Primitives['color']['violet']['violet140']
              active: Primitives['color']['violet']['violet140']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea130']
              hover: Primitives['color']['sea']['sea140']
              active: Primitives['color']['sea']['sea140']
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
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
            disabled: Primitives['color']['white']
          }
          tertiary: {
            hover: Primitives['color']['blue']['blue20']
            active: Primitives['color']['transparent']
          }
          disabled: Primitives['color']['grey']['grey30']
          ghost: { onColor: { hover: Primitives['color']['whiteOpacity10'] } }
        }
      }
      accent: {
        blue: Primitives['color']['blue']['blue130']
        green: Primitives['color']['green']['green130']
        red: Primitives['color']['red']['red130']
        orange: Primitives['color']['orange']['orange130']
        grey: Primitives['color']['grey']['grey150']
        ash: Primitives['color']['grey']['grey180']
        plum: Primitives['color']['plum']['plum130']
        violet: Primitives['color']['violet']['violet130']
        stone: Primitives['color']['stone']['stone130']
        sky: Primitives['color']['sky']['sky130']
        honey: Primitives['color']['honey']['honey130']
        sea: Primitives['color']['sea']['sea130']
        aurora: Primitives['color']['aurora']['aurora130']
      }
      elevatedSurface: {
        base: Primitives['color']['white']
        inverse: Primitives['color']['grey']['grey150']
      }
      overlay: {
        base: Primitives['color']['whiteOpacity75']
        dark: Primitives['color']['greyOpacity75']
      }
      chart: {
        categorical: {
          color10: Primitives['color']['blue']['blue150']
          color11: Primitives['color']['violet']['violet130']
          color00: Primitives['color']['sky']['sky130']
          color01: Primitives['color']['violet']['violet150']
          color02: Primitives['color']['orange']['orange130']
          color03: Primitives['color']['aurora']['aurora150']
          color04: Primitives['color']['plum']['plum130']
          color05: Primitives['color']['sky']['sky150']
          color06: Primitives['color']['sea']['sea130']
          color07: Primitives['color']['plum']['plum150']
          color08: Primitives['color']['honey']['honey130']
          color09: Primitives['color']['red']['red130']
        }
        categoricalGroup5: {
          color00: Primitives['color']['aurora']['aurora150']
          color01: Primitives['color']['orange']['orange130']
          color02: Primitives['color']['violet']['violet150']
          color03: Primitives['color']['sea']['sea130']
          color04: Primitives['color']['plum']['plum150']
        }
        categoricalGroup4: {
          color00: Primitives['color']['sky']['sky150']
          color01: Primitives['color']['honey']['honey130']
          color02: Primitives['color']['violet']['violet150']
          color03: Primitives['color']['red']['red130']
        }
        categoricalGroup3: {
          color00: Primitives['color']['violet']['violet130']
          color01: Primitives['color']['sky']['sky150']
          color02: Primitives['color']['orange']['orange130']
        }
        categoricalGroup2: {
          color00: Primitives['color']['violet']['violet150']
          color01: Primitives['color']['sea']['sea130']
        }
        sequential: {
          violet: {
            color0: Primitives['color']['violet']['violet70']
            color1: Primitives['color']['violet']['violet80']
            color2: Primitives['color']['violet']['violet100']
            color3: Primitives['color']['violet']['violet120']
            color4: Primitives['color']['violet']['violet130']
            color5: Primitives['color']['violet']['violet140']
            color6: Primitives['color']['violet']['violet150']
            color7: Primitives['color']['violet']['violet160']
            color8: Primitives['color']['violet']['violet170']
            color9: Primitives['color']['violet']['violet180']
          }
          plum: {
            color0: Primitives['color']['plum']['plum70']
            color1: Primitives['color']['plum']['plum80']
            color2: Primitives['color']['plum']['plum100']
            color3: Primitives['color']['plum']['plum120']
            color4: Primitives['color']['plum']['plum130']
            color5: Primitives['color']['plum']['plum140']
            color6: Primitives['color']['plum']['plum150']
            color7: Primitives['color']['plum']['plum160']
            color8: Primitives['color']['plum']['plum170']
            color9: Primitives['color']['plum']['plum180']
          }
          red: {
            color0: Primitives['color']['red']['red70']
            color1: Primitives['color']['red']['red80']
            color2: Primitives['color']['red']['red100']
            color3: Primitives['color']['red']['red120']
            color4: Primitives['color']['red']['red130']
            color5: Primitives['color']['red']['red140']
            color6: Primitives['color']['red']['red150']
            color7: Primitives['color']['red']['red160']
            color8: Primitives['color']['red']['red170']
            color9: Primitives['color']['red']['red180']
          }
          orange: {
            color0: Primitives['color']['orange']['orange70']
            color1: Primitives['color']['orange']['orange80']
            color2: Primitives['color']['orange']['orange100']
            color3: Primitives['color']['orange']['orange120']
            color4: Primitives['color']['orange']['orange130']
            color5: Primitives['color']['orange']['orange140']
            color6: Primitives['color']['orange']['orange150']
            color7: Primitives['color']['orange']['orange160']
            color8: Primitives['color']['orange']['orange170']
            color9: Primitives['color']['orange']['orange180']
          }
          honey: {
            color0: Primitives['color']['honey']['honey70']
            color1: Primitives['color']['honey']['honey80']
            color2: Primitives['color']['honey']['honey100']
            color3: Primitives['color']['honey']['honey120']
            color4: Primitives['color']['honey']['honey130']
            color5: Primitives['color']['honey']['honey140']
            color6: Primitives['color']['honey']['honey150']
            color7: Primitives['color']['honey']['honey160']
            color8: Primitives['color']['honey']['honey170']
            color9: Primitives['color']['honey']['honey180']
          }
          green: {
            color0: Primitives['color']['green']['green70']
            color1: Primitives['color']['green']['green80']
            color2: Primitives['color']['green']['green100']
            color3: Primitives['color']['green']['green120']
            color4: Primitives['color']['green']['green130']
            color5: Primitives['color']['green']['green140']
            color6: Primitives['color']['green']['green150']
            color7: Primitives['color']['green']['green160']
            color8: Primitives['color']['green']['green170']
            color9: Primitives['color']['green']['green180']
          }
          aurora: {
            color0: Primitives['color']['aurora']['aurora70']
            color1: Primitives['color']['aurora']['aurora80']
            color2: Primitives['color']['aurora']['aurora100']
            color3: Primitives['color']['aurora']['aurora120']
            color4: Primitives['color']['aurora']['aurora130']
            color5: Primitives['color']['aurora']['aurora140']
            color6: Primitives['color']['aurora']['aurora150']
            color7: Primitives['color']['aurora']['aurora160']
            color8: Primitives['color']['aurora']['aurora170']
            color9: Primitives['color']['aurora']['aurora180']
          }
          sea: {
            color0: Primitives['color']['sea']['sea70']
            color1: Primitives['color']['sea']['sea80']
            color2: Primitives['color']['sea']['sea100']
            color3: Primitives['color']['sea']['sea120']
            color4: Primitives['color']['sea']['sea130']
            color5: Primitives['color']['sea']['sea140']
            color6: Primitives['color']['sea']['sea150']
            color7: Primitives['color']['sea']['sea160']
            color8: Primitives['color']['sea']['sea170']
            color9: Primitives['color']['sea']['sea180']
          }
          sky: {
            color0: Primitives['color']['sky']['sky70']
            color1: Primitives['color']['sky']['sky80']
            color2: Primitives['color']['sky']['sky100']
            color3: Primitives['color']['sky']['sky120']
            color4: Primitives['color']['sky']['sky130']
            color5: Primitives['color']['sky']['sky140']
            color6: Primitives['color']['sky']['sky150']
            color7: Primitives['color']['sky']['sky160']
            color8: Primitives['color']['sky']['sky170']
            color9: Primitives['color']['sky']['sky180']
          }
          blue: {
            color0: Primitives['color']['blue']['blue70']
            color1: Primitives['color']['blue']['blue80']
            color2: Primitives['color']['blue']['blue100']
            color3: Primitives['color']['blue']['blue120']
            color4: Primitives['color']['blue']['blue130']
            color5: Primitives['color']['blue']['blue140']
            color6: Primitives['color']['blue']['blue150']
            color7: Primitives['color']['blue']['blue160']
            color8: Primitives['color']['blue']['blue170']
            color9: Primitives['color']['blue']['blue180']
          }
        }
        diverging: {
          redSea: {
            red5: Primitives['color']['red']['red180']
            red4: Primitives['color']['red']['red160']
            red3: Primitives['color']['red']['red140']
            red2: Primitives['color']['red']['red120']
            red1: Primitives['color']['red']['red80']
            grey0: Primitives['color']['grey']['grey70']
            sea1: Primitives['color']['sea']['sea80']
            sea2: Primitives['color']['sea']['sea120']
            sea3: Primitives['color']['sea']['sea140']
            sea4: Primitives['color']['sea']['sea160']
            sea5: Primitives['color']['sea']['sea180']
          }
          violetSea: {
            purple5: Primitives['color']['violet']['violet180']
            purple4: Primitives['color']['violet']['violet160']
            purple3: Primitives['color']['violet']['violet140']
            purple2: Primitives['color']['violet']['violet120']
            purple1: Primitives['color']['violet']['violet80']
            grey0: Primitives['color']['grey']['grey70']
            sea1: Primitives['color']['sea']['sea80']
            sea2: Primitives['color']['sea']['sea120']
            sea3: Primitives['color']['sea']['sea140']
            sea4: Primitives['color']['sea']['sea160']
            sky5: Primitives['color']['sea']['sea180']
          }
        }
        alert: {
          critical: Primitives['color']['red']['red160']
          danger: Primitives['color']['red']['red130']
          warningMedium: Primitives['color']['orange']['orange130']
          warningLow: Primitives['color']['honey']['honey130']
          success: Primitives['color']['green']['green130']
          info: Primitives['color']['blue']['blue130']
          neutral: Primitives['color']['grey']['grey130']
        }
      }
      pastel: {
        violet: Primitives['color']['violet']['violet20']
        sea: Primitives['color']['sea']['sea20']
        plum: Primitives['color']['plum']['plum20']
        sky: Primitives['color']['sky']['sky20']
        orange: Primitives['color']['orange']['orange20']
        aurora: Primitives['color']['aurora']['aurora20']
        stone: Primitives['color']['stone']['stone20']
        info: Primitives['color']['blue']['blue20']
        success: Primitives['color']['green']['green20']
        warning: Primitives['color']['honey']['honey20']
        error: Primitives['color']['red']['red20']
        neutral: Primitives['color']['grey']['grey20']
      }
      skeleton: {
        backgroundColor: Primitives['color']['grey']['grey100']
        shimmerColor: Primitives['color']['grey']['grey80']
      }
    }
    stroke: {
      base: Primitives['color']['grey']['grey100']
      muted: Primitives['color']['grey']['grey60']
      strong: Primitives['color']['grey']['grey170']
      success: Primitives['color']['green']['green140']
      error: Primitives['color']['red']['red140']
      warning: Primitives['color']['honey']['honey140']
      info: Primitives['color']['blue']['blue140']
      brand: Primitives['color']['blue']['blue130']
      aiTopGradient: Primitives['color']['violet']['violet130']
      aiBottomGradient: Primitives['color']['sea']['sea130']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      container: {
        base: Primitives['color']['grey']['grey100']
        dark: Primitives['color']['grey']['grey170']
      }
      interactive: {
        focusRing: {
          base: Primitives['color']['blue']['blue120']
          onColor: Primitives['color']['white']
        }
        input: {
          base: Primitives['color']['grey']['grey140']
          hover: Primitives['color']['grey']['grey140']
          readonly: Primitives['color']['grey']['grey140']
          disabled: Primitives['color']['grey']['grey40']
          selected: Primitives['color']['grey']['grey170']
        }
        action: {
          primary: {
            base: Primitives['color']['blue']['blue140']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue140']
            disabled: Primitives['color']['blue']['blue140']
          }
          secondary: {
            base: Primitives['color']['grey']['grey140']
            hover: Primitives['color']['grey']['grey140']
            active: Primitives['color']['grey']['grey140']
            disabled: Primitives['color']['grey']['grey140']
          }
          destructive: {
            base: Primitives['color']['red']['red140']
            hover: Primitives['color']['red']['red140']
            active: Primitives['color']['red']['red140']
            disabled: Primitives['color']['red']['red140']
            secondary: {
              base: Primitives['color']['red']['red140']
              hover: Primitives['color']['red']['red140']
              active: Primitives['color']['red']['red140']
              disabled: Primitives['color']['red']['red140']
            }
          }
          success: {
            base: Primitives['color']['green']['green140']
            hover: Primitives['color']['green']['green140']
            active: Primitives['color']['green']['green140']
            disabled: Primitives['color']['green']['green140']
            secondary: {
              base: Primitives['color']['green']['green140']
              hover: Primitives['color']['green']['green140']
              active: Primitives['color']['green']['green140']
              disabled: Primitives['color']['green']['green140']
            }
          }
          ai: {
            topGradient: {
              base: Primitives['color']['violet']['violet140']
              hover: Primitives['color']['violet']['violet100']
              active: Primitives['color']['violet']['violet120']
            }
            bottomGradient: {
              base: Primitives['color']['sea']['sea140']
              hover: Primitives['color']['sea']['sea100']
              active: Primitives['color']['sea']['sea120']
            }
            disabled: Primitives['color']['grey']['grey30']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey70']
            hover: Primitives['color']['grey']['grey70']
            active: Primitives['color']['grey']['grey70']
            disabled: Primitives['color']['grey']['grey70']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue140']
            hover: Primitives['color']['blue']['blue140']
            active: Primitives['color']['blue']['blue140']
            disabled: Primitives['color']['blue']['blue140']
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
        blue: Primitives['color']['blue']['blue130']
        green: Primitives['color']['green']['green130']
        red: Primitives['color']['red']['red130']
        orange: Primitives['color']['orange']['orange130']
        grey: Primitives['color']['grey']['grey150']
        ash: Primitives['color']['grey']['grey180']
        plum: Primitives['color']['plum']['plum130']
        violet: Primitives['color']['violet']['violet130']
        stone: Primitives['color']['stone']['stone130']
        sky: Primitives['color']['sky']['sky130']
        honey: Primitives['color']['honey']['honey130']
        sea: Primitives['color']['sea']['sea130']
        aurora: Primitives['color']['aurora']['aurora130']
      }
    }
    text: {
      base: Primitives['color']['grey']['grey170']
      muted: Primitives['color']['grey']['grey140']
      success: Primitives['color']['green']['green130']
      error: Primitives['color']['red']['red140']
      warning: Primitives['color']['orange']['orange130']
      info: Primitives['color']['blue']['blue130']
      aiColor: Primitives['color']['violet']['violet160']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey100']
          onColor: Primitives['color']['grey']['grey60']
        }
        input: {
          base: Primitives['color']['grey']['grey170']
          hover: Primitives['color']['grey']['grey170']
          readonly: Primitives['color']['grey']['grey170']
          placeholder: Primitives['color']['grey']['grey120']
          disabled: Primitives['color']['grey']['grey100']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue160']
            active: Primitives['color']['blue']['blue140']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['grey']['grey180']
            hover: Primitives['color']['grey']['grey180']
            active: Primitives['color']['grey']['grey180']
            disabled: Primitives['color']['grey']['grey180']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet130'] }
            bottomGradient: { base: Primitives['color']['sea']['sea130'] }
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
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue130']
            active: Primitives['color']['blue']['blue130']
            disabled: Primitives['color']['blue']['blue130']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue150']
            hover: Primitives['color']['blue']['blue150']
            active: Primitives['color']['blue']['blue150']
            disabled: Primitives['color']['blue']['blue150']
          }
          successSecondary: {
            base: Primitives['color']['green']['green130']
            hover: Primitives['color']['green']['green130']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['green']['green130']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red130']
            hover: Primitives['color']['red']['red130']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['red']['red130']
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
        blue: Primitives['color']['blue']['blue130']
        green: Primitives['color']['green']['green130']
        red: Primitives['color']['red']['red130']
        orange: Primitives['color']['orange']['orange130']
        grey: Primitives['color']['grey']['grey150']
        ash: Primitives['color']['grey']['grey180']
        violet: Primitives['color']['violet']['violet130']
        plum: Primitives['color']['plum']['plum130']
        stone: Primitives['color']['stone']['stone130']
        sky: Primitives['color']['sky']['sky130']
        honey: Primitives['color']['honey']['honey130']
        sea: Primitives['color']['sea']['sea130']
        aurora: Primitives['color']['aurora']['aurora130']
      }
      dark: Primitives['color']['grey']['grey180']
    }
    icon: {
      base: Primitives['color']['grey']['grey180']
      muted: Primitives['color']['grey']['grey150']
      success: Primitives['color']['green']['green130']
      error: Primitives['color']['red']['red140']
      warning: Primitives['color']['honey']['honey130']
      info: Primitives['color']['blue']['blue130']
      dark: Primitives['color']['grey']['grey170']
      onColor: Primitives['color']['white']
      inverse: Primitives['color']['white']
      brand: Primitives['color']['blue']['blue130']
      interactive: {
        disabled: {
          base: Primitives['color']['grey']['grey100']
          onColor: Primitives['color']['grey']['grey60']
        }
        navigation: {
          primary: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue160']
            active: Primitives['color']['blue']['blue140']
          }
          primaryOnColor: {
            base: Primitives['color']['grey']['grey10']
            hover: Primitives['color']['grey']['grey10']
            active: Primitives['color']['grey']['grey10']
          }
        }
        action: {
          secondary: {
            base: Primitives['color']['grey']['grey180']
            hover: Primitives['color']['grey']['grey180']
            active: Primitives['color']['grey']['grey180']
            disabled: Primitives['color']['grey']['grey180']
          }
          status: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          aiSecondary: {
            topGradient: { base: Primitives['color']['violet']['violet130'] }
            bottomGradient: { base: Primitives['color']['sea']['sea130'] }
            disabled: Primitives['color']['grey']['grey50']
          }
          primary: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['white']
          }
          primaryOnColor: {
            base: Primitives['color']['blue']['blue130']
            hover: Primitives['color']['blue']['blue130']
            active: Primitives['color']['blue']['blue130']
            disabled: Primitives['color']['blue']['blue130']
          }
          ai: {
            base: Primitives['color']['white']
            hover: Primitives['color']['white']
            active: Primitives['color']['white']
            disabled: Primitives['color']['grey']['grey60']
          }
          tertiary: {
            base: Primitives['color']['blue']['blue150']
            hover: Primitives['color']['blue']['blue150']
            active: Primitives['color']['blue']['blue150']
            disabled: Primitives['color']['blue']['blue150']
          }
          successSecondary: {
            base: Primitives['color']['green']['green130']
            hover: Primitives['color']['green']['green130']
            active: Primitives['color']['green']['green130']
            disabled: Primitives['color']['green']['green130']
          }
          destructiveSecondary: {
            base: Primitives['color']['red']['red130']
            hover: Primitives['color']['red']['red130']
            active: Primitives['color']['red']['red130']
            disabled: Primitives['color']['red']['red130']
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
        blue: Primitives['color']['blue']['blue130']
        green: Primitives['color']['green']['green130']
        red: Primitives['color']['red']['red130']
        orange: Primitives['color']['orange']['orange130']
        grey: Primitives['color']['grey']['grey150']
        ash: Primitives['color']['grey']['grey180']
        plum: Primitives['color']['plum']['plum130']
        violet: Primitives['color']['violet']['violet130']
        stone: Primitives['color']['stone']['stone130']
        sky: Primitives['color']['sky']['sky130']
        honey: Primitives['color']['honey']['honey130']
        sea: Primitives['color']['sea']['sea130']
        aurora: Primitives['color']['aurora']['aurora130']
      }
    }
    dropShadow: { shadowColor1: string; shadowColor2: string }
    institutional: {
      brandPrimary: Primitives['color']['blue']['blue100']
      brandFontColorDark: Primitives['color']['grey']['grey170']
      linkColor: Primitives['color']['blue']['blue130']
      brandButtonPrimaryText: Primitives['color']['white']
      brandButtonPrimaryBgd: Primitives['color']['blue']['blue130']
      brandButtonSecondaryBgd: Primitives['color']['grey']['grey10']
      brandButtonSecondaryText: Primitives['color']['grey']['grey170']
      brandGlobalNavBgd: Primitives['color']['grey']['grey150']
      globalNavLinkHover: Primitives['color']['grey']['grey170']
      brandGlobalNavMenuItemTextColor: Primitives['color']['white']
      brandGlobalNavMenuItemTextColorActive: Primitives['color']['blue']['blue130']
    }
    transparentColor: Primitives['color']['transparent']
    mobileCourse: Primitives['color']['plum']['plum110']
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
      success: primitives.color.green.green140,
      error: primitives.color.red.red140,
      warning: primitives.color.orange.orange140,
      info: primitives.color.blue.blue140,
      brand: primitives.color.blue.blue140,
      aiTopGradient: primitives.color.violet.violet140,
      aiBottomGradient: primitives.color.sea.sea140,
      aiText: primitives.color.violet.violet20,
      opacity: primitives.color.greyOpacity10,
      opacityOnColor: primitives.color.whiteOpacity10,
      mobileNav: {
        value: primitives.color.grey.grey10,
        modify: { type: 'lighten', value: 0.5, space: 'hsl' }
      },
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
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue140,
            disabled: primitives.color.blue.blue130
          },
          secondary: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey20,
            active: primitives.color.grey.grey20,
            disabled: primitives.color.grey.grey10
          },
          destructive: {
            base: primitives.color.red.red130,
            hover: primitives.color.red.red140,
            active: primitives.color.red.red140,
            disabled: primitives.color.red.red130,
            secondary: {
              hover: primitives.color.red.red20,
              active: primitives.color.red.red20
            }
          },
          success: {
            base: primitives.color.green.green130,
            hover: primitives.color.green.green140,
            active: primitives.color.green.green140,
            disabled: primitives.color.green.green130,
            secondary: {
              hover: primitives.color.green.green20,
              active: primitives.color.green.green20
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet130,
              hover: primitives.color.violet.violet140,
              active: primitives.color.violet.violet140
            },
            bottomGradient: {
              base: primitives.color.sea.sea130,
              hover: primitives.color.sea.sea140,
              active: primitives.color.sea.sea140
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
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10,
            disabled: primitives.color.white
          },
          tertiary: {
            hover: primitives.color.blue.blue20,
            active: primitives.color.transparent
          },
          disabled: primitives.color.grey.grey30,
          ghost: { onColor: { hover: primitives.color.whiteOpacity10 } }
        }
      },
      accent: {
        blue: primitives.color.blue.blue130,
        green: primitives.color.green.green130,
        red: primitives.color.red.red130,
        orange: primitives.color.orange.orange130,
        grey: primitives.color.grey.grey150,
        ash: primitives.color.grey.grey180,
        plum: primitives.color.plum.plum130,
        violet: primitives.color.violet.violet130,
        stone: primitives.color.stone.stone130,
        sky: primitives.color.sky.sky130,
        honey: primitives.color.honey.honey130,
        sea: primitives.color.sea.sea130,
        aurora: primitives.color.aurora.aurora130
      },
      elevatedSurface: {
        base: primitives.color.white,
        inverse: primitives.color.grey.grey150
      },
      overlay: {
        base: primitives.color.whiteOpacity75,
        dark: primitives.color.greyOpacity75
      },
      chart: {
        categorical: {
          color10: primitives.color.blue.blue150,
          color11: primitives.color.violet.violet130,
          color00: primitives.color.sky.sky130,
          color01: primitives.color.violet.violet150,
          color02: primitives.color.orange.orange130,
          color03: primitives.color.aurora.aurora150,
          color04: primitives.color.plum.plum130,
          color05: primitives.color.sky.sky150,
          color06: primitives.color.sea.sea130,
          color07: primitives.color.plum.plum150,
          color08: primitives.color.honey.honey130,
          color09: primitives.color.red.red130
        },
        categoricalGroup5: {
          color00: primitives.color.aurora.aurora150,
          color01: primitives.color.orange.orange130,
          color02: primitives.color.violet.violet150,
          color03: primitives.color.sea.sea130,
          color04: primitives.color.plum.plum150
        },
        categoricalGroup4: {
          color00: primitives.color.sky.sky150,
          color01: primitives.color.honey.honey130,
          color02: primitives.color.violet.violet150,
          color03: primitives.color.red.red130
        },
        categoricalGroup3: {
          color00: primitives.color.violet.violet130,
          color01: primitives.color.sky.sky150,
          color02: primitives.color.orange.orange130
        },
        categoricalGroup2: {
          color00: primitives.color.violet.violet150,
          color01: primitives.color.sea.sea130
        },
        sequential: {
          violet: {
            color0: primitives.color.violet.violet70,
            color1: primitives.color.violet.violet80,
            color2: primitives.color.violet.violet100,
            color3: primitives.color.violet.violet120,
            color4: primitives.color.violet.violet130,
            color5: primitives.color.violet.violet140,
            color6: primitives.color.violet.violet150,
            color7: primitives.color.violet.violet160,
            color8: primitives.color.violet.violet170,
            color9: primitives.color.violet.violet180
          },
          plum: {
            color0: primitives.color.plum.plum70,
            color1: primitives.color.plum.plum80,
            color2: primitives.color.plum.plum100,
            color3: primitives.color.plum.plum120,
            color4: primitives.color.plum.plum130,
            color5: primitives.color.plum.plum140,
            color6: primitives.color.plum.plum150,
            color7: primitives.color.plum.plum160,
            color8: primitives.color.plum.plum170,
            color9: primitives.color.plum.plum180
          },
          red: {
            color0: primitives.color.red.red70,
            color1: primitives.color.red.red80,
            color2: primitives.color.red.red100,
            color3: primitives.color.red.red120,
            color4: primitives.color.red.red130,
            color5: primitives.color.red.red140,
            color6: primitives.color.red.red150,
            color7: primitives.color.red.red160,
            color8: primitives.color.red.red170,
            color9: primitives.color.red.red180
          },
          orange: {
            color0: primitives.color.orange.orange70,
            color1: primitives.color.orange.orange80,
            color2: primitives.color.orange.orange100,
            color3: primitives.color.orange.orange120,
            color4: primitives.color.orange.orange130,
            color5: primitives.color.orange.orange140,
            color6: primitives.color.orange.orange150,
            color7: primitives.color.orange.orange160,
            color8: primitives.color.orange.orange170,
            color9: primitives.color.orange.orange180
          },
          honey: {
            color0: primitives.color.honey.honey70,
            color1: primitives.color.honey.honey80,
            color2: primitives.color.honey.honey100,
            color3: primitives.color.honey.honey120,
            color4: primitives.color.honey.honey130,
            color5: primitives.color.honey.honey140,
            color6: primitives.color.honey.honey150,
            color7: primitives.color.honey.honey160,
            color8: primitives.color.honey.honey170,
            color9: primitives.color.honey.honey180
          },
          green: {
            color0: primitives.color.green.green70,
            color1: primitives.color.green.green80,
            color2: primitives.color.green.green100,
            color3: primitives.color.green.green120,
            color4: primitives.color.green.green130,
            color5: primitives.color.green.green140,
            color6: primitives.color.green.green150,
            color7: primitives.color.green.green160,
            color8: primitives.color.green.green170,
            color9: primitives.color.green.green180
          },
          aurora: {
            color0: primitives.color.aurora.aurora70,
            color1: primitives.color.aurora.aurora80,
            color2: primitives.color.aurora.aurora100,
            color3: primitives.color.aurora.aurora120,
            color4: primitives.color.aurora.aurora130,
            color5: primitives.color.aurora.aurora140,
            color6: primitives.color.aurora.aurora150,
            color7: primitives.color.aurora.aurora160,
            color8: primitives.color.aurora.aurora170,
            color9: primitives.color.aurora.aurora180
          },
          sea: {
            color0: primitives.color.sea.sea70,
            color1: primitives.color.sea.sea80,
            color2: primitives.color.sea.sea100,
            color3: primitives.color.sea.sea120,
            color4: primitives.color.sea.sea130,
            color5: primitives.color.sea.sea140,
            color6: primitives.color.sea.sea150,
            color7: primitives.color.sea.sea160,
            color8: primitives.color.sea.sea170,
            color9: primitives.color.sea.sea180
          },
          sky: {
            color0: primitives.color.sky.sky70,
            color1: primitives.color.sky.sky80,
            color2: primitives.color.sky.sky100,
            color3: primitives.color.sky.sky120,
            color4: primitives.color.sky.sky130,
            color5: primitives.color.sky.sky140,
            color6: primitives.color.sky.sky150,
            color7: primitives.color.sky.sky160,
            color8: primitives.color.sky.sky170,
            color9: primitives.color.sky.sky180
          },
          blue: {
            color0: primitives.color.blue.blue70,
            color1: primitives.color.blue.blue80,
            color2: primitives.color.blue.blue100,
            color3: primitives.color.blue.blue120,
            color4: primitives.color.blue.blue130,
            color5: primitives.color.blue.blue140,
            color6: primitives.color.blue.blue150,
            color7: primitives.color.blue.blue160,
            color8: primitives.color.blue.blue170,
            color9: primitives.color.blue.blue180
          }
        },
        diverging: {
          redSea: {
            red5: primitives.color.red.red180,
            red4: primitives.color.red.red160,
            red3: primitives.color.red.red140,
            red2: primitives.color.red.red120,
            red1: primitives.color.red.red80,
            grey0: primitives.color.grey.grey70,
            sea1: primitives.color.sea.sea80,
            sea2: primitives.color.sea.sea120,
            sea3: primitives.color.sea.sea140,
            sea4: primitives.color.sea.sea160,
            sea5: primitives.color.sea.sea180
          },
          violetSea: {
            purple5: primitives.color.violet.violet180,
            purple4: primitives.color.violet.violet160,
            purple3: primitives.color.violet.violet140,
            purple2: primitives.color.violet.violet120,
            purple1: primitives.color.violet.violet80,
            grey0: primitives.color.grey.grey70,
            sea1: primitives.color.sea.sea80,
            sea2: primitives.color.sea.sea120,
            sea3: primitives.color.sea.sea140,
            sea4: primitives.color.sea.sea160,
            sky5: primitives.color.sea.sea180
          }
        },
        alert: {
          critical: primitives.color.red.red160,
          danger: primitives.color.red.red130,
          warningMedium: primitives.color.orange.orange130,
          warningLow: primitives.color.honey.honey130,
          success: primitives.color.green.green130,
          info: primitives.color.blue.blue130,
          neutral: primitives.color.grey.grey130
        }
      },
      pastel: {
        violet: primitives.color.violet.violet20,
        sea: primitives.color.sea.sea20,
        plum: primitives.color.plum.plum20,
        sky: primitives.color.sky.sky20,
        orange: primitives.color.orange.orange20,
        aurora: primitives.color.aurora.aurora20,
        stone: primitives.color.stone.stone20,
        info: primitives.color.blue.blue20,
        success: primitives.color.green.green20,
        warning: primitives.color.honey.honey20,
        error: primitives.color.red.red20,
        neutral: primitives.color.grey.grey20
      },
      skeleton: {
        backgroundColor: primitives.color.grey.grey100,
        shimmerColor: primitives.color.grey.grey80
      }
    },
    stroke: {
      base: primitives.color.grey.grey100,
      muted: primitives.color.grey.grey60,
      strong: primitives.color.grey.grey170,
      success: primitives.color.green.green140,
      error: primitives.color.red.red140,
      warning: primitives.color.honey.honey140,
      info: primitives.color.blue.blue140,
      brand: primitives.color.blue.blue130,
      aiTopGradient: primitives.color.violet.violet130,
      aiBottomGradient: primitives.color.sea.sea130,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      container: {
        base: primitives.color.grey.grey100,
        dark: primitives.color.grey.grey170
      },
      interactive: {
        focusRing: {
          base: primitives.color.blue.blue120,
          onColor: primitives.color.white
        },
        input: {
          base: primitives.color.grey.grey140,
          hover: primitives.color.grey.grey140,
          readonly: primitives.color.grey.grey140,
          disabled: primitives.color.grey.grey40,
          selected: primitives.color.grey.grey170
        },
        action: {
          primary: {
            base: primitives.color.blue.blue140,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue140,
            disabled: primitives.color.blue.blue140
          },
          secondary: {
            base: primitives.color.grey.grey140,
            hover: primitives.color.grey.grey140,
            active: primitives.color.grey.grey140,
            disabled: primitives.color.grey.grey140
          },
          destructive: {
            base: primitives.color.red.red140,
            hover: primitives.color.red.red140,
            active: primitives.color.red.red140,
            disabled: primitives.color.red.red140,
            secondary: {
              base: primitives.color.red.red140,
              hover: primitives.color.red.red140,
              active: primitives.color.red.red140,
              disabled: primitives.color.red.red140
            }
          },
          success: {
            base: primitives.color.green.green140,
            hover: primitives.color.green.green140,
            active: primitives.color.green.green140,
            disabled: primitives.color.green.green140,
            secondary: {
              base: primitives.color.green.green140,
              hover: primitives.color.green.green140,
              active: primitives.color.green.green140,
              disabled: primitives.color.green.green140
            }
          },
          ai: {
            topGradient: {
              base: primitives.color.violet.violet140,
              hover: primitives.color.violet.violet100,
              active: primitives.color.violet.violet120
            },
            bottomGradient: {
              base: primitives.color.sea.sea140,
              hover: primitives.color.sea.sea100,
              active: primitives.color.sea.sea120
            },
            disabled: primitives.color.grey.grey30
          },
          primaryOnColor: {
            base: primitives.color.grey.grey70,
            hover: primitives.color.grey.grey70,
            active: primitives.color.grey.grey70,
            disabled: primitives.color.grey.grey70
          },
          tertiary: {
            base: primitives.color.blue.blue140,
            hover: primitives.color.blue.blue140,
            active: primitives.color.blue.blue140,
            disabled: primitives.color.blue.blue140
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
        blue: primitives.color.blue.blue130,
        green: primitives.color.green.green130,
        red: primitives.color.red.red130,
        orange: primitives.color.orange.orange130,
        grey: primitives.color.grey.grey150,
        ash: primitives.color.grey.grey180,
        plum: primitives.color.plum.plum130,
        violet: primitives.color.violet.violet130,
        stone: primitives.color.stone.stone130,
        sky: primitives.color.sky.sky130,
        honey: primitives.color.honey.honey130,
        sea: primitives.color.sea.sea130,
        aurora: primitives.color.aurora.aurora130
      }
    },
    text: {
      base: primitives.color.grey.grey170,
      muted: primitives.color.grey.grey140,
      success: primitives.color.green.green130,
      error: primitives.color.red.red140,
      warning: primitives.color.orange.orange130,
      info: primitives.color.blue.blue130,
      aiColor: primitives.color.violet.violet160,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey100,
          onColor: primitives.color.grey.grey60
        },
        input: {
          base: primitives.color.grey.grey170,
          hover: primitives.color.grey.grey170,
          readonly: primitives.color.grey.grey170,
          placeholder: primitives.color.grey.grey120,
          disabled: primitives.color.grey.grey100
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue160,
            active: primitives.color.blue.blue140
          },
          primaryOnColor: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10
          }
        },
        action: {
          secondary: {
            base: primitives.color.grey.grey180,
            hover: primitives.color.grey.grey180,
            active: primitives.color.grey.grey180,
            disabled: primitives.color.grey.grey180
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet130 },
            bottomGradient: { base: primitives.color.sea.sea130 },
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
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue130,
            active: primitives.color.blue.blue130,
            disabled: primitives.color.blue.blue130
          },
          tertiary: {
            base: primitives.color.blue.blue150,
            hover: primitives.color.blue.blue150,
            active: primitives.color.blue.blue150,
            disabled: primitives.color.blue.blue150
          },
          successSecondary: {
            base: primitives.color.green.green130,
            hover: primitives.color.green.green130,
            active: primitives.color.green.green130,
            disabled: primitives.color.green.green130
          },
          destructiveSecondary: {
            base: primitives.color.red.red130,
            hover: primitives.color.red.red130,
            active: primitives.color.red.red130,
            disabled: primitives.color.red.red130
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
        blue: primitives.color.blue.blue130,
        green: primitives.color.green.green130,
        red: primitives.color.red.red130,
        orange: primitives.color.orange.orange130,
        grey: primitives.color.grey.grey150,
        ash: primitives.color.grey.grey180,
        violet: primitives.color.violet.violet130,
        plum: primitives.color.plum.plum130,
        stone: primitives.color.stone.stone130,
        sky: primitives.color.sky.sky130,
        honey: primitives.color.honey.honey130,
        sea: primitives.color.sea.sea130,
        aurora: primitives.color.aurora.aurora130
      },
      dark: primitives.color.grey.grey180
    },
    icon: {
      base: primitives.color.grey.grey180,
      muted: primitives.color.grey.grey150,
      success: primitives.color.green.green130,
      error: primitives.color.red.red140,
      warning: primitives.color.honey.honey130,
      info: primitives.color.blue.blue130,
      dark: primitives.color.grey.grey170,
      onColor: primitives.color.white,
      inverse: primitives.color.white,
      brand: primitives.color.blue.blue130,
      interactive: {
        disabled: {
          base: primitives.color.grey.grey100,
          onColor: primitives.color.grey.grey60
        },
        navigation: {
          primary: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue160,
            active: primitives.color.blue.blue140
          },
          primaryOnColor: {
            base: primitives.color.grey.grey10,
            hover: primitives.color.grey.grey10,
            active: primitives.color.grey.grey10
          }
        },
        action: {
          secondary: {
            base: primitives.color.grey.grey180,
            hover: primitives.color.grey.grey180,
            active: primitives.color.grey.grey180,
            disabled: primitives.color.grey.grey180
          },
          status: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          aiSecondary: {
            topGradient: { base: primitives.color.violet.violet130 },
            bottomGradient: { base: primitives.color.sea.sea130 },
            disabled: primitives.color.grey.grey50
          },
          primary: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.white
          },
          primaryOnColor: {
            base: primitives.color.blue.blue130,
            hover: primitives.color.blue.blue130,
            active: primitives.color.blue.blue130,
            disabled: primitives.color.blue.blue130
          },
          ai: {
            base: primitives.color.white,
            hover: primitives.color.white,
            active: primitives.color.white,
            disabled: primitives.color.grey.grey60
          },
          tertiary: {
            base: primitives.color.blue.blue150,
            hover: primitives.color.blue.blue150,
            active: primitives.color.blue.blue150,
            disabled: primitives.color.blue.blue150
          },
          successSecondary: {
            base: primitives.color.green.green130,
            hover: primitives.color.green.green130,
            active: primitives.color.green.green130,
            disabled: primitives.color.green.green130
          },
          destructiveSecondary: {
            base: primitives.color.red.red130,
            hover: primitives.color.red.red130,
            active: primitives.color.red.red130,
            disabled: primitives.color.red.red130
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
        blue: primitives.color.blue.blue130,
        green: primitives.color.green.green130,
        red: primitives.color.red.red130,
        orange: primitives.color.orange.orange130,
        grey: primitives.color.grey.grey150,
        ash: primitives.color.grey.grey180,
        plum: primitives.color.plum.plum130,
        violet: primitives.color.violet.violet130,
        stone: primitives.color.stone.stone130,
        sky: primitives.color.sky.sky130,
        honey: primitives.color.honey.honey130,
        sea: primitives.color.sea.sea130,
        aurora: primitives.color.aurora.aurora130
      }
    },
    dropShadow: {
      shadowColor1: 'rgba(0,0,0,0.1)',
      shadowColor2: 'rgba(0,0,0,0.2)'
    },
    institutional: {
      brandPrimary: primitives.color.blue.blue100,
      brandFontColorDark: primitives.color.grey.grey170,
      linkColor: primitives.color.blue.blue130,
      brandButtonPrimaryText: primitives.color.white,
      brandButtonPrimaryBgd: primitives.color.blue.blue130,
      brandButtonSecondaryBgd: primitives.color.grey.grey10,
      brandButtonSecondaryText: primitives.color.grey.grey170,
      brandGlobalNavBgd: primitives.color.grey.grey150,
      globalNavLinkHover: primitives.color.grey.grey170,
      brandGlobalNavMenuItemTextColor: primitives.color.white,
      brandGlobalNavMenuItemTextColorActive: primitives.color.blue.blue130
    },
    transparentColor: primitives.color.transparent,
    mobileCourse: primitives.color.plum.plum110
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
      elevation1: { dropshadow1: '0.125rem', dropshadow2: '0.125rem' },
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
  opacity: { base: primitives.opacity100, disabled: primitives.opacity50 }
})
export default semantics
