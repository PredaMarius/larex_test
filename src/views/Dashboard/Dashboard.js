/* eslint-disable linebreak-style */
import React from 'react';
import { useLocation } from "react-router-dom"
import { makeStyles } from '@material-ui/styles';
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';
import {
  colors,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  InputBase,
  Grid
} from '@material-ui/core';

import { Password } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background: colors.blueGrey[100],
    height: '100%',
    textAlign: 'center',
    overflow: 'auto'
  },
  spinner: {
    textAlign: 'center',
    padding: '200px'
  },
  gol: {
    height: '100%',
  }
  ,
  img: {
    maxWidth: '300px',
    maxHeight: '200px',
    padding: '20px'

  }
}));

const Dashboard = (props) => {
  const { loading } = props
  const classes = useStyles();

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

  const codResetare = () => {
    console.log(queryParameters.get("code"))
    if (queryParameters.get("code") !== "" && queryParameters.get("code") !== null) {
      return true;
    } else {

      return false;
    }
  }


  if (loading === true) {
    return (
      <div className={classes.spinner}>
        <Loader
          color="#00BFFF"
          height={100}
          type="Puff"
          width={100}
        />
      </div>
    )
  } else {

    return (
      <div className={classes.root}>
          <h2 style={{paddingTop:'20px', color: colors.blueGrey[900]}}>Larexir WebStore -TEST SERVER AWS</h2>
           {/* <h5 style={{paddingBottom:'20px', color: 'grey'}}>aplicatie comenzi retaileri</h5> */}
        
        <div className={classes.gol}>
          <Card>
            <CardHeader
              style={{ background: colors.blueGrey[400] }}
              title={'INFORMARI GENERALE'}
            />
            <Divider />
            <CardContent style={{ overflow: 'scroll', maxHeight: '350px' }} >
              {props.informari ?
                props.informari.map((mesaj) => (
                  <div key={mesaj.id} style={{ pading: '10px' }}>
                    <TextField
                      fullWidth
                      inputProps={{ min: 0, style: { textAlign: 'center', paddingTop: '0px', fontWeight: 'bold' } }}
                      margin="dense"
                      name="titlu"
                      size="small" // the change is here
                      value={mesaj.mesaj1}
                    />
                    {mesaj.Mesaj2 ? <InputBase multiline fullWidth value={mesaj.Mesaj2} /> : null}
                    {mesaj.Mesaj3 ? <InputBase multiline fullWidth value={mesaj.Mesaj3} /> : null}
                    {mesaj.Mesaj4 ? <InputBase multiline fullWidth value={mesaj.Mesaj4} /> : null}
                    {mesaj.Mesaj5 ?
                      <InputBase
                        fullWidth
                        inputProps={{ min: 0, style: { textAlign: 'center', paddingTop: '0px', fontWeight: 'bold', color: 'red' } }}
                        value={mesaj.Mesaj5}
                      /> : null}
                  </div>
                ))
                : null
              }
              {props.firma && props.firma[0] ?
                null
                :
                <div>
                  <div>
                    <InputBase multiline fullWidth value={'Bine ati venit in aplicatia WebStore Larexir!'} style={{ paddingTop: '0px', fontWeight: 'bold', color: '#78909C' }} />
                    <InputBase multiline fullWidth value={'Pentru conectare folositi butonul : Autentificare din meniul din stanga si introduceti datele de conectare transmise de noi pe e-mail.'} style={{ paddingTop: '0px', color: '#78909C' }} />

                    {/* <InputBase multiline fullWidth value={'Daca rulati aplicatia pe sistemul de operare WINDOWS 7 sau 8, o sa va rugam sa instalati ultimele update-uri ale acestuia.'} style={{ paddingTop:'0px',  fontWeight: 'bold', color:'#A60E0E' }}/>
                    // <InputBase multiline fullWidth value={'Browserele detecteaza daca aveti o varianta de Windows 7 sau 8 careia ii lipsesc update-uri vitale privind securitatea si vor bloca conectarea la unele aplicatii din motive de securitate.'} style={{ paddingTop:'0px', color:'#A60E0E' }}/>
              // <a href="https://www.youtube.com/watch?v=dcLViwTPvnc" style={{ textAlign: 'right', fontWeight: 'bold'}}>Link video instructiuni realizare update-uri Windows 7</a>  */}
                  </div>
                </div>
              }


            </CardContent>
          </Card>

          {props.firma && <Card style={{ marginTop: '15px' }}>
            <CardHeader
              style={{ background: colors.blueGrey[400] }}
              title={`MESAJE PENTRU FIRMA: ${props.firma ?
                (props.firma[0] ? props.firma[0].denumire.toUpperCase() : '')
                : ''}`}
            />
            <Divider />
            <CardContent style={{ overflow: 'scroll', maxHeight: '350px' }} >
              {props.firma ?
                <InputBase
                  fullWidth
                  inputProps={{ min: 0, style: { textAlign: 'center', paddingTop: '0px', fontWeight: 'bold', color: 'red' } }}
                  multiline
                  value={props.firma[0] ? props.firma[0].mesajpersonalizat : ''}
                />
                : null}
            </CardContent>

            <Divider />
            {codResetare() ?
            <div className={classes.root}>
              <h5 style={{ color: 'grey', textAlign:"left" }}> WebStore Larexir- resetare parola!</h5>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={5}
                  xs={12}
                >
                  <Password codResetare={queryParameters.get("code")} />
                </Grid>
              </Grid>
            </div>
            :
            null}

          </Card>}

          {
            //<div>
            // <img src="/images/dashbord/craciun.png" alt="Sarbatori fericite!"/>
            // </div> 
          }

        </div>

      </div>
    );
  }

};

const mapStateToProps = state => ({
  loading: state.order.currentProduct,
  errors: state.user.currentUser,
  warnings: state.order.currentOrder,
  currentUser: state.user.currentUser,
  firma: state.lookup.firma,
  informari: state.lookup.informari
})

export default connect(mapStateToProps)(Dashboard);
