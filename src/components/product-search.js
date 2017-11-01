import React from 'react'
import { connect } from 'react-redux'

import Input from '../components/input'
import { actions } from '../models/products'
import { search as searchProducts } from '../services/products'


const Product = ({product}) => <div className="product">
  <p>{product.name}</p>
  <img src={product.image} />
</div>


const ProductSearch = props => <div className="product-search">
  <Input value={props.query}
    onChange={props.onQueryChange}
    onStopTyping={props.handleStoppedTyping} />

  {props.products && (props.products.map(product =>
    <Product key={product.objectID} product={product} />
  ))}
</div>


const mapStateToProps = state => {
  return state.products
}

const mapDispatchToProps = dispatch => {
  return {
    onQueryChange: value => {
      dispatch(actions.typedQuery(value))
    },
    handleStoppedTyping: value => {
      dispatch(actions.stoppedTypingQuery(value))
    }
  }
}

const ConnectedProductSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch)

export default ConnectedProductSearch
