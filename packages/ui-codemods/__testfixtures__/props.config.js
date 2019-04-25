module.exports = {
  'Modal': {
    '3.0.0': [
      { old: 'onReady', new: 'onOpen' },
      { old: 'isOpen', new: 'open' },
      { old: 'getDefaultFocusElement', new: 'defaultFocusElement' },
      { old: 'closeButtonVariant', new: null }
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

  'TestComponent': {
    '3.0.0': [
      { old: 'isSquare', new: 'shape', values: [
        { old: true, new: 'square' },
        { old: false, new: 'circle'}
      ]},
      { old: 'alertType', new: 'shouldDisplayAlert', values: [
        { old: 'visible', new: true },
        { old: 'hidden', new: false },
        { old: 'screenreader' }
      ]},
      { old: 'errorCode', new: 'errorType', values: [
        { old: 0, new: 'low' },
        { old: 1, new: 'moderate' },
        { old: 2, new: 'severe' },
        { old: 3, new: 'critical' }
      ]},
      { old: 'testNull', new: 'testNull', values: [
        { old: 'toNull', new: null }
      ]}
    ]
  }
}
