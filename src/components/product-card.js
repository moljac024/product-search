import React from 'react'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
}


const ProductCard = (props) => {
  const { classes, product } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {product.name}
          </Typography>
          <Typography component="p">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}


export default withStyles(styles)(ProductCard)
