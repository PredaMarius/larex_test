/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {setCurrentUserStart, setDeliveryAddressesStart} from '../../redux/user/user.actions';
import Loader from 'react-loader-spinner'
import {setLoading} from '../../redux/other/other.actions';
import {strapi, STRAPI_PASSWORD_RESET_URL} from '../../strapi/strapi.config';
import { withSnackbar } from 'notistack';
import './signin.css';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'aceasta rubrica este obligatorie' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'aceasta rubrica este obligatorie' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.png)',
    backgroundSize: '800px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  resetPaswordButton: {
    margin: theme.spacing(2, 0),
    fontSize: '12px'
  },
  resetPaswordDiv:{
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'flex-end',
    margin: theme.spacing(2, 0),
  }

}));

const SignIn = props => {
  const { history, loading, enqueueSnackbar } = props;
  const classes = useStyles();


  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async e => {
    const {setCurrentUserStart,setDeliveryAddressesStart, currentUser}=props;
    e.preventDefault();
    
    setCurrentUserStart({email:formState.values.email, password:formState.values.password})
    //setDeliveryAddressesStart(currentUser?currentUser.idFirma.id:0)
    setLoading(true)
    setTimeout(()=>window.location.reload(),1000)
    // setLoading(false)
  };

  const handleResetPasword = async e => { 
    
    if (!hasError('email') && formState.values.email){
      await strapi.forgotPassword(formState.values.email, STRAPI_PASSWORD_RESET_URL)
      .catch(e=>(
        enqueueSnackbar(`Eroare : nu am putut trimite e-mailul cu linkul de resetare a parolei.(${e})`,{ 
          variant: 'error',
          autoHideDuration:3000 
        })
      ))
      .then(()=>{
        enqueueSnackbar('Email-ul cu link-ul de resetare a fost trimis cu succes.',{ 
          variant: 'success',
          autoHideDuration:2000
        })
      })
    }else{
      enqueueSnackbar('Va rog completati adresa de email folosita la crearea contului!',{ 
        variant: 'error',
        autoHideDuration:3000
      })
    }
    
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  if (loading===false){
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteContainer}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                ....
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                  .......
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                  .......
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={handleSignIn}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                  Autentificare
                  </Typography>
                
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    InputLabelProps={{shrink:true}}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password[0] : null
                    }
                    InputLabelProps={{shrink:true}}
                    label="Parola"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                  Conectare
                  </Button>
                    <a
                    className={classes.resetPaswordButton}
                      href="#text-buttons"
                      onClick={() => {
                        handleResetPasword();
                      }}
                    >
                    Am uitat parola?
                    </a>
                 
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )}else{
    return (
      <div className="spinner">
        <h2>loading....</h2>
        <Loader
          color="#00BFFF"
          height={100}
          type="Puff"
          width={100}
        />
      </div>
    );
  };
};

SignIn.propTypes = {
  history: PropTypes.object,
  setCurrentUserStart:PropTypes.func
};
const mapStateToProps=state=>({
  currentUser:state.user.currentUser,
  loading:state.other.loading,
})

const mapDispatchToProps=dispatch=>({
  setCurrentUserStart:(emailAndPassword)=>dispatch(setCurrentUserStart(emailAndPassword)),
  setDeliveryAddressesStart:idFirma=>dispatch(setDeliveryAddressesStart(idFirma)),
  setLoading:boll=>dispatch(setLoading(boll)),
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withSnackbar(SignIn)));

