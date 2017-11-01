import React from 'react'

import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
})


const Loader = ({classes}) => <div className="loader">
  <CircularProgress className={classes.progress} size={50} />
</div>

export default withStyles(styles)(Loader)
