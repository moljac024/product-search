import createSagaMiddleware from 'redux-saga'
import forOwn from 'lodash/forOwn'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'


export const sagaMiddleware = createSagaMiddleware()


const arrUnit = x => isArray(x) ? x : [x]


export const runSagas = (sagas) => {
  forOwn(sagas, saga => {
    const defaults = saga.__esModule
      ? arrUnit(saga.default)
      : arrUnit(saga)
    defaults.forEach(def => {
      // Seems like redux-saga itself only checks if the supplied argument is a
      // function. There seems to be no reliable way to test if a function is a
      // generator function.
      if (isFunction(def)) {
        sagaMiddleware.run(def)
      }
    })
  })
}
