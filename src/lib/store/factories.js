import { mergeAll } from 'ramda'
import isFunction from 'lodash/isFunction'


const bind = (fn, ...args) => fn.bind(null, ...args)


const capitalize = (a) => {
  if (a.length < 1) {
    return a
  }

  if (a.length === 1) {
    return a.charAt(0).toUpperCase()
  }

  if (a.length > 1) {
    return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
  }
}

const bigSnakeToCamel = a => {
  let [head, ...rest] = a.split('_')

  return [
    head.toLowerCase(),
    ...rest.map(capitalize)
  ].join('')
}


export const ActionCreator = (type) => {
  return (payload = null, meta = {}) => ({ type, payload, meta })
}


export const PromiseActionCreator = (type, promise, ...args) => _ => dispatch => {
  dispatch({type: `${type}_REQUEST`, meta: {args}})
  promise(...args)
  .then(response => {
    dispatch({type: `${type}_SUCCESS`, meta: {args}, payload: response})
  })
  .catch(error => {
    dispatch({type: `${type}_ERROR`, error, payload: error})
  })
}


export function Reducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


export const AsyncTypes = (prefix, actionType) => ({
    [`${actionType}_REQUEST`]: `${prefix}${actionType}_REQUEST`,
    [`${actionType}_SUCCESS`]: `${prefix}${actionType}_SUCCESS`,
    [`${actionType}_ERROR`]: `${prefix}${actionType}_ERROR`,
  })


export const Type = (prefix, actionType) => ({
    [`${actionType}`]: `${prefix}${actionType}`
  })


export const Types = config => {
    let prefix = config.prefix || config.namespace || ''
    const builder = {
      type: bind(Type, prefix),
      asyncTypes: bind(AsyncTypes, prefix)
    }

    const types = config.types || config.sync || []
    const asyncTypes = config.asyncTypes || config.async || []

    return {
      ...mergeAll(asyncTypes.map(builder.asyncTypes)),
      ...mergeAll(types.map(builder.type))
    }
  }


export const ActionCreators = types => {
   return Object.keys(types)
     .reduce((nm, k) => {
       nm[bigSnakeToCamel(k)] = ActionCreator(types[k])
       return nm
     }, {})
 }



export const Model = (config, prefix = null) => {
  let types = Types({
    ...config,
    prefix: prefix || config.prefix
  })
  let baseActions = ActionCreators(types)
  let actions = isFunction(config.actions)
    ? {...baseActions, ...config.actions(baseActions)}
    : baseActions

  let base = {
    types,
    actions,
    reducer: Reducer(config.initialState, config.reducer(types)),
    initialState: config.initialState,
  }

  return {
    ...base,
    sagas: isFunction(config.sagas)
      ? config.sagas(types, actions)
      : []
  }
}
