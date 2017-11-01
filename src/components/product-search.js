import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

import Input from './input'
import CircleLoader from './loader-circle'
import ProductCard from './product-card'

import { actions } from '../models/products'



const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})


const ProductSearch = props => {
  const { classes } = props

  return <div className={classes.root}>

    <Grid container spacing={24}>
      <Grid item xs={12}>
        <div className={classes.paper}>
          <Input value={props.query}
            onChange={props.onQueryChange}
            onStopTyping={props.handleStoppedTyping} />
        </div>
      </Grid>
    </Grid>


    {props.products && (props.products.map(product =>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <ProductCard key={product.objectID} product={product} />
          </div>
        </Grid>
      </Grid>
    ))}

    {(props.loading) && <Grid container spacing={24}>
      <Grid item xs={12}>
        <CircleLoader />
      </Grid>
    </Grid>}
  </div>
}


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

export default withStyles(styles)(ConnectedProductSearch)
