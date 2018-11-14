# Drag and Drop in React and Redux 

A simple static web app for drag and drop implementation in ReactJS, created using `create-react-app`.
Try it out [here](http://drag-rick-and-morty.surge.sh/).

App is using **THE RICK AND MORTY API** by [Axel Fuhrmann](https://axelfuhrmann.com/) from [here](https://rickandmortyapi.com/).

## How does it work

The state of the app is stored in Redux. Right after the data from an API call is loaded it is stored as default in this shape, so user can reset to this state anytime. It also added to a current state and a history. When user grabs any card there's an invisible `div` added as a *dropzone* (which is each area of other cards) so `drag event` will be insensitive to any other `drag events` between current card and its children (like `dragleave` and `dragenter` when drag over an image inside). In this moment characters are sorted and the current state is changed until user leaves the *dropzone* or drop a card. If user leaves a drop area the previous state will be restored, and if user drops the card in a new place the current state will be added to history.

User is also informed how many times sequences were changed and can restore state to default with a `button`.