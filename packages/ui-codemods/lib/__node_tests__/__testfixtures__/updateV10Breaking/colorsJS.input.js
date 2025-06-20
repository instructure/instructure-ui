// this is the same as the other colors test, it just makes sure that
// codemods work on plain `.js` files too
/* eslint-disable */
// @ts-nocheck
import { canvas, canvasHighContrast } from '@instructure/ui'

export const generateStyle = () => {
  return {
    logoSubtitle: {
      label: 'logoSubtitle',
      marginTop: '-3px'
    },
    optionWrapper: {
      label: 'optionWrapper',
      margin: '-0.5rem -0.75rem',
      padding: '0.5rem 0.75rem',
      border: '0 solid ' + canvas.colors.tiara,
      borderBottomWidth: '1px',
      display: 'flex',
      maxWidth: '100%',
      overflow: 'hidden',
      alignItems: 'center'
    },
    optionIcon: {
      label: 'optionIcon',
      width: '36px',
      height: '36px',
      backgroundColor: canvasHighContrast.colors.oxford,
      borderRadius: 100,
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    truncateSingleLine: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  }
}

export const generateComponentTheme = () => ({})
