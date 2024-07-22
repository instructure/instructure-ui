/* eslint-disable */
let shouldTriggerWarning = { b: 1 }

const Test = (
  <div>
    <TestComponent
      shape="square"
      shouldDisplayAlert={false}
      errorType="moderate"
    />
    <TestComponent
      shape="square"
      shouldDisplayAlert={true}
      errorType="critical"
    />
    <TestComponent shape="circle" errorType="severe" />
    <TestComponent errorType="low" shouldDisplayAlert={false} testNull={null} />
    <TestComponent errorType={shouldTriggerWarning} />
  </div>
)
