import React from 'react'

const Card = ({ character, index }) => (
  <div className="card" draggable='true' data-index={index}>
    <div>
      <h2 draggable="false">
        {character.name}
      </h2>
      <img className="image" src={character.image} alt="character"
        draggable="false"
      />
      <div className="card-details" draggable="false">
        <div className="card-details-section">
          <p>SPECIES</p>
          <p>{character.species}</p>
        </div>
        <div className="card-details-section">
          <p>GENDER</p>
          <p>{character.gender}</p>
        </div>
        <div className="card-details-section">
          <p>ORIGIN</p>
          <p>{character.origin.name}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Card