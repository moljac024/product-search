import { combineReducers } from 'redux'

import createStore from './configure'
import { runSagas } from './saga'


export const initStore = ({
  reducers = {},
  sagas = [],
  initialState = {}
}) => {
  const reducer = combineReducers({
    ...reducers
  })
  const store = createStore(reducer, initialState)
  runSagas(sagas)

  return store
}

export default initStore
