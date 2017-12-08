import reducer from '../index'
import * as types from '../../constants/ActionTypes'
import * as states from '../../constants/CaptureStates'

describe('capture reducer', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(
      { captureState: states.READY }
    )
  })

  it('should handle AUDIO_DEVICE_CHANGED', () => {
    expect(
      reducer([], {
        type: types.AUDIO_DEVICE_CHANGED,
        id: '123wfjwfnef1'
      })
    ).to.deep.equal(
      { audioDeviceId: '123wfjwfnef1' }
    )
  })

  it('should handle CLOSE_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.READY },
        { type: types.CLOSE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.FINISHED }
    )

    expect(
      reducer(
        { captureState: states.SAVING },
        { type: types.CLOSE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.SAVING }
    )
  })

  it('should handle COUNTDOWN_COMPLETE', () => {
    expect(
      reducer(
        { captureState: states.STARTING },
        { type: types.COUNTDOWN_COMPLETE }
      )
    ).to.deep.equal(
      { captureState: states.RECORDING }
    )

    expect(
      reducer(
        { captureState: states.RECORDING },
        { type: types.COUNTDOWN_COMPLETE }
      )
    ).to.deep.equal(
      {
        captureState: states.RECORDING
      }
    )
  })

  it('should handle FINISH_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.RECORDING },
        { type: types.FINISH_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE }
    )

    expect(
      reducer(
        { captureState: states.SAVING },
        { type: types.FINISH_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.SAVING }
    )
  })

  it('should handle ONCOMPLETE', () => {
    expect(
      reducer(
        { captureState: states.SAVING },
        { type: types.ONCOMPLETE }
      )
    ).to.deep.equal(
      { captureState: states.FINISHED }
    )

    expect(
      reducer(
        { captureState: states.FINISHED },
        { type: types.ONCOMPLETE }
      )
    ).to.deep.equal(
      { captureState: states.FINISHED }
    )
  })

  it('should handle SAVE_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.SAVE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.SAVING }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.SAVE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.READY }
    )
  })

  it('should handle START_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle START_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle STARTOVER_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.STARTOVER_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.READY }
    )

    expect(
      reducer(
        { captureState: states.STARTING },
        { type: types.STARTOVER_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle TITLE_EDITED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.TITLE_EDITED, text: 'this is a title' }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE, title: 'this is a title' }
    )
  })

  it('should handle VIDEO_DEVICE_CHANGED', () => {
    expect(
      reducer(
        { captureState: states.READY },
        { type: types.VIDEO_DEVICE_CHANGED, id: '1028eowjdnf' }
      )
    ).to.deep.equal(
      { captureState: states.READY, videoDeviceId: '1028eowjdnf' }
    )
  })
})
