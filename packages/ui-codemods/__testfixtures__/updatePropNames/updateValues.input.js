/* eslint-disable */

const Test = (
  <div>
    <TestComponent isSquare alertType="hidden" errorCode={1} />
    <TestComponent isSquare={true} alertType="visible" errorCode={3} />
    <TestComponent isSquare={false} alertType="screenreader" errorCode={2} />
    <TestComponent errorCode={0} alertType="hidden" testNull="toNull" />
  </div>
)
