/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import './orderheader.css'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  Tooltip,
  colors
} from '@material-ui/core';
import { dataFormatRO } from '../../../../utils/functiiComune';
import {setUpdatedOrder} from '../../../../redux/order/order.actions'
import {selectOrderCurrentProduct, selectOrderCurrentOrder,selectOrderUpdatedOrder  } from '../../../../redux/order/order.selectors'
import {selectDeliveryAddresses } from '../../../../redux/user/user.selectors'


const useStyles = makeStyles(() => ({
  header:{
    background:colors.blueGrey[700],
    textAlign:'center',
    color:'grey'
  },
  menu: {
    width: 200,
  },
  centerGrid:{
    alignContent: 'center'
  }
}));

const OrderHeader = props => {
  const { className,currentProduct, deliveryAddresses,  setUpdatedOrder, updatedOrder} = props;
  const classes = useStyles();
  //----------------------------------------------------------------
  const [values, setValues] = useState({
    id: updatedOrder.id,
    dataComanda: updatedOrder.dataComanda,
    clientClient:updatedOrder.clientClient,
    observatii:updatedOrder.observatii,
    adresaLivrare:updatedOrder.adresaLivrare,
    discount:updatedOrder.discount,
    subTip:updatedOrder.subTip
  });

  //----------------------------------------------------------------
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    });
    setUpdatedOrder({...updatedOrder,[event.target.name]: event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')})
  };
  //----------------------------------------------------------------

  return (
    <Card
      className={className}
    >
      <form>
        <CardHeader
          className={classes.header}
          subheader={
            values.id?
              values.stadiu==='TRANSMISA'?
                ` Numar: ${values.id} din: ${dataFormatRO(values.dataComanda).substr(0,10)} / data transmiterii: ${dataFormatRO(updatedOrder.updated_at)}`
                : `Numar: ${values.id} din: ${dataFormatRO(values.dataComanda).substr(0,10)} / ultima modificare: ${dataFormatRO(updatedOrder.updated_at)}`
              :'Numarul si data se stabilesc dupa prima salvare'}
             
          title={updatedOrder.stadiu?`COMANDA ${currentProduct.title.toUpperCase()} ${updatedOrder.stadiu}`:`COMANDA ${currentProduct.title.toUpperCase()} NETRANSMISA`}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}
          >   
            <Grid
              item
              md={4}
              xs={12}
            >
              <Tooltip title={'Clientul final al distribuitorului.'}>
                <TextField
                  autoComplete='off'
                  disabled={updatedOrder.stadiu && updatedOrder.stadiu==='TRANSMISA'?true:false}
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Client final"
                  margin="dense"
                  name="clientClient"
                  onChange={handleChange}
                  required
                  type="text"
                  value={values.clientClient || ''}
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
           
            {/* Doar pentru partea de masuratori ---------------------------------------------*/}
            {currentProduct.cod==="sv" &&
            <>
             <Grid
              item
              md={8}
              xs={12}
            >
              <Tooltip title={'Adresa la care se vor efectua masuratorile de catre Larexir Decor.'}>
                <TextField
                  autoComplete='off'
                  disabled={updatedOrder.stadiu && updatedOrder.stadiu==='TRANSMISA'?true:false}
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Adresa masuratoare (incl. numar telefon)"
                  margin="dense"
                  name="adresaLivrare"
                  onChange={handleChange}
                  type="text"
                  value={values.adresaLivrare || ''}
                  variant="outlined"
                >
                </TextField>
              </Tooltip>
            </Grid> 
            <Grid
              item
              md={4}
              xs={12}
            >
              <Tooltip title={'Tipul de produs pentru care se fac masuratorile.'}>
                <TextField
                  autoComplete='off'
                  disabled={updatedOrder.stadiu && updatedOrder.stadiu==='TRANSMISA'?true:false}
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Tip produs"
                  margin="dense"
                  name="subTip"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    }
                  }}
                  type="text"
                  value={values.subTip || ''}
                  variant="outlined"
                >
                  <option key="VERTICALE" value="JALUZELE VERTICALE">
                    JALUZELE VERTICALE
                  </option>
                  <option key="ROLETE" value="ROLETE PANZA">
                    ROLETE PANZA
                  </option>
                  <option key="RULOURI" value="RULOURI EXTERIOARE">
                    RULOURI EXTERIOARE
                  </option>
                  <option key="USI" value="USI GARAJ">
                    USI GARAJ
                  </option>
                  <option key="PLASE" value="PLASE INSECTE" >
                    PLASE INSECTE
                  </option>
                  <option key="ORIZONTALE" value="JALUZELE ORIZONTALE">
                    JALUZELE ORIZONTALE
                  </option>
                  <option key="" value="">
                  </option>

                </TextField>

              </Tooltip>
            </Grid>
            </> 
          }
          {/* -------------------- ---------------------------------------------*/}
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                autoComplete="off"
                disabled={updatedOrder.stadiu && updatedOrder.stadiu==='TRANSMISA'?true:false}
                fullWidth
                InputLabelProps={{shrink:true}}
                label="Observatii"
                margin="dense"
                name="observatii"
                onChange={handleChange}
                type="text"
                value={values.observatii || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

OrderHeader.propTypes = {
  className: PropTypes.string,
  currentProduct:PropTypes.object,
  deliveryAddresses:PropTypes.array,
  setUpdatedOrder:PropTypes.func,
  updatedOrder:PropTypes.object,
};


const mapStateToProps=state=>({
  currentProduct:selectOrderCurrentProduct(state),
  currentOrder:selectOrderCurrentOrder(state),
  deliveryAddresses:selectDeliveryAddresses(state),
  updatedOrder:selectOrderUpdatedOrder(state),
})

const mapDispatchToProps=dispatch=>({
  setUpdatedOrder:order=>dispatch(setUpdatedOrder(order)),
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OrderHeader));
