// Reducers
import { handleSortOnDrop, updateCurrentList } from '../Characters/reducer'

// Actions types
const DRAG_START = 'dragAndDrop/DRAG_START'
const DRAG_END = 'dragAndDrop/DRAG_END'
const DRAG_LEAVE = 'dragAndDrop/DRAG_LEAVE'
const DRAG_ENTER = 'dragAndDrop/DRAG_ENTER'
const DRAG_DROP = 'dragAndDrop/DRAG_DROP'

// Actions creators
const dragStart = (index) => ({ type: DRAG_START, index })
const dragEnd = () => ({ type: DRAG_END })
const dragLeave = () => ({ type: DRAG_LEAVE })
const dragEnter = () => ({ type: DRAG_ENTER })
const dragDrop = () => ({ type: DRAG_DROP })

// Initial state
const initialState = {
  draggedCharIndex: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAG_START:
      return {
        ...state,
        draggedCharIndex: action.index
      }
    case DRAG_END:
      return {
        ...state,
        draggedCharIndex: null
      }
    case DRAG_ENTER:
      return state
    case DRAG_LEAVE:
      return state
    case DRAG_DROP:
      return state
    default:
      return state
  }
}

// Logic
export const handleDragStart = (event) => (dispatch, getState) => {
  const active = event.target
  dispatch(dragStart(active.dataset.index))
  active.classList.add('active')
  active.addEventListener('dragend', (e) => dispatch(handleDragEnd(e)))

  const cards = Array.from(active.parentNode.children)
  cards.forEach(card => {
    if (card !== active) {
      const dropzoneMask = document.createElement('div')
      dropzoneMask.classList.add('dropzone')
      card.appendChild(dropzoneMask)
    }
  })
}

export const handleDragEnd = (event) => (dispatch, getState) => {
  dispatch(dragEnd())
  const active = event.target
  active.classList.remove('active')
  const dropzones = Array.from(document.querySelectorAll('.dropzone'))
  dropzones.forEach(el => el.parentElement.removeChild(el))
}

export const handleDragEnter = (event) => (dispatch, getState) => {
  const hoveredChar = event.target.parentElement
  if (hoveredChar.hasAttribute('data-index')) {
    dispatch(dragEnter())
    event.target.classList.add('hovered')

    const draggedCharIndex = getState().dragAndDrop.draggedCharIndex
    const charOnDraggedIndexAfterSort = document.querySelector(
      `[data-index='${draggedCharIndex}']`
    )
    charOnDraggedIndexAfterSort.classList.add('sorted')
    const thisIndex = hoveredChar.dataset.index
    const current = getState().characters.current.slice(0)
    const draggedChar = current.splice(draggedCharIndex, 1)
    current.splice(thisIndex, 0, draggedChar[0])
    dispatch(updateCurrentList(current))
  }
}

export const handleDragOver = (event) => (dispatch, getState) => {
  event.preventDefault()
}

export const handleDragLeave = (event) => (dispatch, getState) => {
  const dropzone = event.target
  const card = dropzone.parentElement
  if (
    card.hasAttribute('data-index')
    && dropzone.classList.contains('hovered')
  ) {
    const sortedCard = document.querySelector('.sorted')
    if (sortedCard) {
      sortedCard.classList.remove('sorted')
    }
    dispatch(dragLeave())
    dropzone.classList.remove('hovered')
    const history = getState().characters.history.slice(0)
    const current = history.pop()
    dispatch(dragLeave())
    dispatch(updateCurrentList(current))
  }
}

export const handleDrop = (event) => (dispatch, getState) => {
  const draggedCharIndex = getState().dragAndDrop.draggedCharIndex
  const thisIndex = event.target.parentElement.dataset.index
  if (
    thisIndex !== undefined
    && thisIndex !== draggedCharIndex
  ) {
    dispatch(handleSortOnDrop())
    dispatch(dragDrop())
  } else {
    event.preventDefault()
  }
}