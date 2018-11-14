import React from 'react'
import { connect } from 'react-redux'
import { handleCharactersReset } from '../Characters/reducer'

const Counter = ({ history, handleCharactersReset }) => (
  <div className="section-counter">
    <div className="counter-title">
      <span>
        Sequence changed:
      </span>
      <span className="counter">
        {history.length - 1}
      </span>
    </div>
    <button className="btn"
      onClick={handleCharactersReset}>
      RESET
    </button>
  </div>
)

export default connect(
  state => ({
    history: state.characters.history
  }),
  dispatch => ({
    handleCharactersReset: () => dispatch(handleCharactersReset())
  })
)(Counter)