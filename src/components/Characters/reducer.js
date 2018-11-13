// Actions types
const SET_DEFAULT_CHARACTERS = 'characters/SET_DEFAULT_CHARACTERS'
const ADD_TO_HISTORY = 'characters/ADD_TO_HISTORY'
const UPDATE_CURRENT_LIST = 'characters/UPDATE_CURRENT_LIST'
const SORT_CHARACTERS_ON_RESET = 'characters/SORT_CHARACTERS_ON_RESET'
const DATA_LOADING = 'characters/DATA_LOADING'
const DATA_LOADED = 'characters/DATA_LOADED'

// Actions creators
const setDefaultCharacters = (characters) => ({ type: SET_DEFAULT_CHARACTERS, characters })
const addToHistory = (characters) => ({ type: ADD_TO_HISTORY, characters})
export const updateCurrentList = (characters) => ({ type: UPDATE_CURRENT_LIST, characters })
const sortCharactersOnReset = () => ({ type: SORT_CHARACTERS_ON_RESET })
export const setDataIsLoading = () => ({ type: DATA_LOADING })
export const setDataIsLoaded = () => ({ type: DATA_LOADED })

// Initial state
const initialState = {
  current: null,
  default: [],
  history: [],
  isDataLoaded: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_CHARACTERS:
      return {
        ...state,
        default: action.characters,
        isDataLoaded: true
      }
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: action.characters
      }
    case UPDATE_CURRENT_LIST:
      return {
        ...state,
        current: action.characters
      }
    case SORT_CHARACTERS_ON_RESET:
      return {
        ...state,
        current: state.default
      }
    case DATA_LOADING:
      return {
        ...state,
        isDataLoaded: false
      }
    case DATA_LOADED:
      return {
        ...state,
        isDataLoaded: true
      }
    default:
      return state
  }
}

// Logic
export const getCharachtersOnInit = () => (dispatch, getState) => {
  fetch('https://rickandmortyapi.com/api/character/1,2,3,183,242,340')
    .then(response => response.json())
    .then(characters => {
      dispatch(updateCurrentList(characters))
      dispatch(setDefaultCharacters(characters))
      dispatch(addToHistory([characters]))
    }).catch(error => console.log(error))
}

export const handleCharactersReset = () => (dispatch, getState) => {
  const characters = getState().characters.default
  dispatch(sortCharactersOnReset(characters))
}

export const handleSortOnDrop = (characters) => (dispatch, getState) => {
  const history = getState().characters.history.slice(0)
  history.push(characters)
  dispatch(addToHistory(history))
}