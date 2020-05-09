import React, {Component, Fragment} from 'react';

import './checkout.css'

//Material-Ui Imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OrderItems from "../../common/orderitems/OrderItems";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
            addresses: [],
            states: [],
            flat: undefined,
            locality: undefined,
            city: undefined,
            stateUUID: '',
            pincode: undefined,
            selectedAddressId: undefined,
            placeOrderMessage: undefined,
            placeOrderMessageOpen: false,
            orderItems: {
                total: 240,
                items: [
                    {
                        id: '100',
                        name: 'Coke',
                        itype: 0,
                        quantity: 4,
                        pricePerItem: 10
                    }, {
                        id: '101',
                        name: 'Pizza',
                        itype: 1,
                        quantity: 2,
                        pricePerItem: 100
                    }]
            }
        }
    }

    componentDidMount() {
        this.fetchAddress();
        this.fetchStates();
    }

    render() {
        return <Fragment>
            <div className='main-container'>
                <div className='delivery-payment-section'>
                    <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                        <Step key='Delivery'>
                            <StepLabel>Delivery</StepLabel>
                            <StepContent>
                                <div>
                                    <AppBar position={"relative"}>
                                        <Tabs value={this.state.activeTabValue} variant='standard'>
                                            <Tab value='existing_address' label='EXISTING ADDRESS'
                                                 onClick={() => this.changeActiveTab('existing_address')}/>
                                            <Tab value='new_address' label='NEW ADDRESS'
                                                 onClick={() => this.changeActiveTab('new_address')}/>
                                        </Tabs>
                                    </AppBar>
                                </div>
                                <div id='existing-address-display'
                                     className={this.state.activeTabValue === 'existing_address' ? 'display-block' : 'display-none'}>
                                    <GridList style={{flexWrap: 'nowrap'}} cols={3} cellHeight='auto'>
                                        {
                                            (this.state.addresses || []).map((address, index) => (
                                                <GridListTile key={address.id}
                                                              className={this.state.selectedAddressId === address.id ? 'grid-list-tile-selected-address' : 'grid-list-tile'}>
                                                    <div>
                                                        <p>{address.flat_building_name}</p>
                                                        <p>{address.locality}</p>
                                                        <p>{address.city}</p>
                                                        <p>{address.state.state_name}</p>
                                                        <p>{address.pincode}</p>
                                                    </div>
                                                    <div className='select-address-icon-container'>
                                                        <IconButton id={'select-address-button-' + address.id}
                                                                    className='select-address-icon'
                                                                    onClick={this.selectAddress}>
                                                            <CheckCircleIcon id={'select-address-icon-' + address.id}
                                                                             className={this.state.selectedAddressId === address.id ? 'display-green-icon' : 'display-grey-icon'}/>
                                                        </IconButton>
                                                    </div>
                                                </GridListTile>
                                            ))
                                        }
                                    </GridList>
                                </div>
                                <div id='new-address-display'
                                     className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none'}>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='flat'>Flat/Building No</InputLabel>
                                        <Input id='flat' name='flat' type='text'
                                               onChange={this.onInputFieldChangeHandler}/>
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='locality'>Locality</InputLabel>
                                        <Input id='locality' name='locality' type='text'
                                               onChange={this.onInputFieldChangeHandler}/>
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='city'>City</InputLabel>
                                        <Input id='city' name='city' type='text'
                                               onChange={this.onInputFieldChangeHandler}/>
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='stateUUID'>State</InputLabel>
                                        <Select id='stateUUID' name='stateUUID' value={this.state.stateUUID}
                                                onChange={this.onInputFieldChangeHandler}>
                                            {this.state.states.map((state, index) => (
                                                <MenuItem key={state.id} value={state.id}>{state.state_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br/>
                                    <FormControl style={{minWidth: 300}}>
                                        <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                        <Input id='pincode' name='pincode' type='text'
                                               onChange={this.onInputFieldChangeHandler}/>
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <FormControl style={{minWidth: 150}}>
                                        <Button variant='contained' color='secondary' onClick={this.saveAddress}>SAVE
                                            ADDRESS</Button>
                                    </FormControl>
                                </div>
                                <div>
                                    <Button style={{margin: 5}} disabled={this.state.activeStep === 0}>Back</Button>
                                    <Button style={{margin: 5}} className='button' variant="contained" color="primary"
                                            onClick={this.incrementActiveStep}>Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key='Payment'>
                            <StepLabel>Payment</StepLabel>
                            <StepContent>
                                <div id='payment-modes'>
                                    <FormControl>
                                        <FormLabel>Select Mode of Payment</FormLabel>
                                        <RadioGroup>
                                            <FormControlLabel value="payment-id-01" control={<Radio/>} label="COD"/>
                                            <FormControlLabel value="payment-id-02" control={<Radio/>}
                                                              label="Wallet"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <Button style={{margin: 5}} onClick={this.decrementActiveStep}>Back</Button>
                                <Button style={{margin: 5}} variant="contained" color="primary"
                                        onClick={this.incrementActiveStep}>Finish</Button>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
                <div className='summary-section'>
                    <Card variant='elevation' className='summary-card'>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Summary
                            </Typography>
                            <br/>
                            <Typography variant='h6' component='h3' color='textSecondary'>
                                Restaurant Name
                            </Typography>
                            <OrderItems divider='true' orderitems={this.state.orderItems}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} key='01'
                          message={this.state.placeOrderMessage}
                          open={this.state.placeOrderMessageOpen}
                          onClose={this.placeOrderMessageClose}
                          action={<Fragment> <IconButton color='inherit'
                                                         onClick={this.placeOrderMessageClose}><CloseIcon/></IconButton></Fragment>}/>
            </div>
        </Fragment>
    }

    incrementActiveStep = () => {
        let activeState = this.state.activeStep + 1;
        this.setState({activeStep: activeState})
    }

    decrementActiveStep = () => {
        let activeState = this.state.activeStep - 1;
        this.setState({activeStep: activeState})
    }

    changeActiveTab = (value) => {
        this.setState({activeTabValue: value})
        if (value === 'existing_address') {
            console.log('Switching to existing project.')
            this.fetchAddress();
        }
    }

    selectAddress = (e) => {
        let elementId = e.target.id;
        if (elementId.startsWith('select-address-icon-')) {
            this.setState({selectedAddressId: elementId.split('select-address-icon-')[1]});
        }
        if (elementId.startsWith('select-address-button-')) {
            this.setState({selectedAddressId: elementId.split('select-address-button-')[1]})
        }
    }

    onInputFieldChangeHandler = (e) => {
        let stateKey = e.target.id;
        let stateValue = e.target.value;
        if (stateKey === undefined) {
            stateKey = 'stateUUID';
        }
        this.setState({[stateKey]: stateValue});
    }

    placeOrderMessageClose = () => {
        this.setState({placeOrderMessageOpen: false});
    }

    fetchAddress = () => {
        console.log('Fetching addresses.');
        let token = 'eyJraWQiOiI2MWMxODFjNy03ODgyLTQxZTEtODVkYi1lMzk3M2M2NDllNjAiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxYTlhZDRjYS04MmMwLTQ3YzQtYTNjZS1kZTcwZTRiZWZjNWEiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU4OTA0MCwiaWF0IjoxNTg5MDEyfQ.nxObTYbip4p4x5XT0jzVKsLPegxqSbdB7fW6iqLj4007-pqHxMEHJhiqPa8uWw3ZboIQhNfWkIQxeL3QsVkVOw';

        let xhr = new XMLHttpRequest();

        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({addresses: JSON.parse(this.responseText).addresses});
            }
        });

        let url = 'http://localhost:8080/api/address/customer';

        xhr.open('GET', url);

        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.send();
    }

    fetchStates = () => {

        let xhr = new XMLHttpRequest();

        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({states: JSON.parse(this.responseText).states});
            }
        });

        let url = 'http://localhost:8080/api/states';

        xhr.open('GET', url);

        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.send();
    }

    saveAddress = () => {
        let address = {
            city: this.state.city,
            flat_building_name: this.state.flat,
            locality: this.state.locality,
            pincode: this.state.pincode,
            state_uuid: this.state.stateUUID
        }

        let token = 'eyJraWQiOiI2MWMxODFjNy03ODgyLTQxZTEtODVkYi1lMzk3M2M2NDllNjAiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxYTlhZDRjYS04MmMwLTQ3YzQtYTNjZS1kZTcwZTRiZWZjNWEiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU4OTA0MCwiaWF0IjoxNTg5MDEyfQ.nxObTYbip4p4x5XT0jzVKsLPegxqSbdB7fW6iqLj4007-pqHxMEHJhiqPa8uWw3ZboIQhNfWkIQxeL3QsVkVOw';

        let xhr = new XMLHttpRequest();

        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({addresses: JSON.parse(this.responseText).addresses});
            }
        });

        let url = 'http://localhost:8080/api/address/';

        xhr.open('POST', url);

        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader('content-type', 'application/json');

        xhr.send(JSON.stringify(address));
    }
}

export default Checkout;