import React from 'react'
import { connect } from 'react-redux'
import {
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop
} from './DragAndDrop/reducer'

const Card = (props) => (
  <div className="card" draggable data-index={props.index}
    onDragStart={(e) => props.handleDragStart(e)}
    onDragEnter={(e) => props.handleDragEnter(e)}
    onDragOver={(e) => props.handleDragOver(e)}
    onDragLeave={(e) => props.handleDragLeave(e)}
    onDrop={(e) => props.handleDrop(e)}
  >
    <div>
      <h2 draggable="false">
        {props.character.name}
      </h2>
      <img className="image" src={props.character.image} alt="character"
        draggable="false"
      />
      <div className="card-details" draggable="false">
        <div className="card-details-section">
          <p>SPECIES</p>
          <p>{props.character.species}</p>
        </div>
        <div className="card-details-section">
          <p>GENDER</p>
          <p>{props.character.gender}</p>
        </div>
        <div className="card-details-section">
          <p>ORIGIN</p>
          <p>{props.character.origin.name}</p>
        </div>
      </div>
    </div>
  </div>
)

export default connect(
  () => ({}),
  dispatch => ({
    handleDragStart: (e) => dispatch(handleDragStart(e)),
    handleDragEnter: (e) => dispatch(handleDragEnter(e)),
    handleDragOver: (e) => dispatch(handleDragOver(e)),
    handleDragLeave: (e) => dispatch(handleDragLeave(e)),
    handleDrop: (e) => dispatch(handleDrop(e))
  })
)(Card)