import { Model } from '../lib/store/factories'


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
    'LOAD_PRODUCTS'
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
      productions: action.payload
    }),
    [types.LOAD_PRODUCTS_ERROR]: (state, action) => ({
      ...state,
      loading: false,
      products: null,
      error: action.payload
    }),

  }),
}

export const model = Model(config)
export const { types, actions, reducer, sagas } = model
