import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { createLogger as logger } from 'redux-logger'
import { sagaMiddleware as saga } from './saga'


const __DEV__ = process.env.NODE_ENV === 'development'


const middleware = (__DEV__
  ? [ // Development middleware
    saga,
    logger({collapsed: true}),
  ]
  : [ // Production middleware
    saga
  ]
)

// Common store enhancers
const enhancers = [
  applyMiddleware.apply(null, middleware),
]

// eslint-disable-next-line
export default compose.apply(
  null,
  [...enhancers,
    __DEV__ && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f]
)(createStore)
