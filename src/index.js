import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import './index.css'
import App from './app/App'
import ProductSearch from './components/product-search'

import { initStore } from './lib/store'
import { reducers, sagas } from './models'

const store = initStore({reducers, sagas})


ReactDOM.render(
  <App store={store}>
    <ProductSearch />
  </App>,
  document.getElementById('root')
)
registerServiceWorker()
