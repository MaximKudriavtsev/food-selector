export default clientReducers = (state = {}, action) => {
  switch (action.type) {
      case 'CHANGE_TEXT': {
          return { ...state, text: action.value }
      }
  }
  return state;
}