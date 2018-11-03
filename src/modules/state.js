export const componentState = (function () {
  
  let state = {}; 

  return {
    getState: () => state,
    changeState: updatedState => {
      state = Object.assign({}, state, updatedState)
    }
  }
}());