import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getCharachtersOnInit } from './components/Characters/reducer'
import Spinner from './components/Spinner'
import Card from './components/Card'
import Counter from './components/Characters/Counter'

class App extends Component {
  componentDidMount() {
    this.props.getCharachtersOnInit()
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
          {
            this.props.characters
              ? <div className="section-characters">
                <Counter />
                <div className="wrapper">
                  {
                    this.props.characters.map((character, i) =>
                      <Card key={i} character={character} index={i} />
                    )
                  }
                </div>
              </div>
              : <div className="wrapper">
                <Spinner />
              </div>
          }
        </main>
      </div>
    )
  }
}

export default connect(
  state => ({
    characters: state.characters.current
  }),
  dispatch => ({
    getCharachtersOnInit: () => dispatch(getCharachtersOnInit())
  })
)(App)