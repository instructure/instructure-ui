@deprecated('1.0.0', {
  foo: 'bar'
})
@deprecated('3.0.0', {
  onReady: 'onOpen',
  isOpen:'open',
  getDefaultFocusElement: 'defaultFocusElement'
})
class Modal extends React.Component {}

@deprecated('3.0.0', {
  baz: 'qux',
  onReady: 'onShow',
  rootClose: 'shouldCloseOnDocumentClick',
  renderOffscreen: 'shouldRenderOffscreen'
})
class Popover extends React.Component {}

@deprecated('3.0.0', {
  onReady: 'onPositioned'
})
class Position extends React.Component {}
