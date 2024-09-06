// de sters tot folderul ResetPassword , a fost inclus direct in dashboard


import React from 'react';
import {

  useLocation

} from "react-router-dom"
// import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Password } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background: '#CFD8DC',
    height: '100%',
    overflow: 'auto'
  }
}));

const ResetPassword = (props) => {
  const classes = useStyles();
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

  const codResetare = () => {
console.log (queryParameters.get("code"))
    if (queryParameters.get("code") !== ""  && queryParameters.get("code") !== null) {
      return true;
    } else {

      return false;
    }
  }

  return (
    codResetare() ?

      <div className={classes.root}>
        <h5 style={{ color: 'grey' }}> WebStore Larexir- resetare parola!</h5>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <Password codResetare={queryParameters.get("code")}/>
          </Grid>
        </Grid>
      </div>
      :
      <h5 style={{ color: 'red', textAlign: 'center' }}> WebStore Larexir- cod resetare invalid!</h5>
  );
};


// const mapStateToProps=state=>({
//   currentUser:selectCurrentUser(state),
// })
// export default connect(mapStateToProps)(Settings);
export default ResetPassword;