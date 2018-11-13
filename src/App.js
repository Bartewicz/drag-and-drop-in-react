import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getCharachtersOnInit } from './components/Characters/reducer';
import { handleDragStart } from './components/DragAndDrop/reducer';
import Spinner from './components/Spinner';
import Card from './components/Card';

class App extends Component {
  componentDidMount() {
    this.props.getCharachtersOnInit()
  }

  componentDidUpdate() {
    const cards = document.querySelectorAll('.card')
    for (let card of cards) {
      card.addEventListener('dragstart', this.props.handleDragStart)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            {"Drag'n'Drop with Rick & Morty"}
          </h1>
        </header>
        <main className="App-main">
          <div className="wrapper">
            {
              this.props.characters
                ? this.props.characters.map((character, i) =>
                  <Card key={i} character={character} index={i} />
                )
                : <Spinner />
            }
          </div>
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    characters: state.characters.current
  }),
  dispatch => ({
    handleDragStart: (event) => dispatch(handleDragStart(event)),
    getCharachtersOnInit: () => dispatch(getCharachtersOnInit())
  })
)(App)