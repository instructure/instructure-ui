module.exports = {
  'Modal': {
    '3.0.0': [
      { old: 'onReady', new: 'onOpen' },
      { old: 'isOpen', new: 'open' },
      { old: 'getDefaultFocusElement', new: 'defaultFocusElement' },
    ] 
  },

  'Overlay': {
    '3.0.0': [
      { old: 'onRequestClose', new: 'onDismiss' },
    ]
  },

  'Popover': {
    '3.0.0': [
      { old: 'onReady', new: 'onShow' },
      { old: 'rootClose', new: 'shouldCloseOnDocumentClick' },
      { old: 'renderOffscreen', new: 'shouldRenderOffscreen' },
    ]
  },

  'Position': {
    '3.0.0': [
      { old: 'onReady', new: 'onPositioned' },
    ]
  },  
}

