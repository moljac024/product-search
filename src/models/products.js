import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { Model } from '../lib/store/factories'
import { search as searchProducts } from '../services/products'


export const initialState = {
  query: '',
  loading: false,
  products: null,
  error: null
}


export const config = {
  initialState,
  prefix: 'products/',
  sync: [
    'TYPED_QUERY',
    'STOPPED_TYPING_QUERY',
  ],
  async: [
    'LOAD_PRODUCTS',
  ],
  reducer: types => ({
    [types.TYPED_QUERY]: (state, action) => ({
      ...state,
      query: action.payload
    }),
    [types.LOAD_PRODUCTS_REQUEST]: (state, action) => ({
      ...state,
      loading: true,
      products: null
    }),
    [types.LOAD_PRODUCTS_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      products: action.payload
    }),
    [types.LOAD_PRODUCTS_ERROR]: (state, action) => ({
      ...state,
      loading: false,
      products: null,
      error: action.payload
    }),
  }),

  sagas: (types, actions) => ([
    function* search () {
      yield takeLatest([
        types.STOPPED_TYPING_QUERY,
      ], function* (action) {
        try {
          const query = action.payload

          yield put(actions.loadProductsRequest())
          const products = yield call(searchProducts, query)
          yield put(actions.loadProductsSuccess(products.data))
        } catch (error) {
          yield put(actions.loadProductsError(error))
        }
      })
    },
  ])
}

export const model = Model(config)
export const { types, actions, reducer, sagas } = model
