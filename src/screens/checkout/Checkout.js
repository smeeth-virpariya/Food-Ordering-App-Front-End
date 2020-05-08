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

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
            selectedAddressId: undefined
        }
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
                                        <GridListTile
                                            className={this.state.selectedAddressId === '1' ? 'grid-list-tile-selected-address' : 'grid-list-tile'}>
                                            <div>
                                                <p>#307</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                            <div className='select-address-icon-container'>
                                                <IconButton id='select-address-button-1' className='select-address-icon'
                                                            onClick={this.selectAddress}>
                                                    <CheckCircleIcon id='select-address-icon-1'
                                                                     className={this.state.selectedAddressId === '1' ? 'display-green-icon' : 'display-grey-icon'}/>
                                                </IconButton>
                                            </div>
                                        </GridListTile>
                                        <GridListTile className='grid-list-tile'>
                                            <div>
                                                <p>#308</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Near Matru Nursing Home,
                                                    Hulimavu, Bannerghatta Main Road,</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                            <div className='select-address-icon-container'>
                                                <IconButton className='select-address-icon'>
                                                    <CheckCircleIcon className='display-grey-icon'/>
                                                </IconButton>
                                            </div>
                                        </GridListTile>
                                        <GridListTile className='grid-list-tile'>
                                            <div>
                                                <p>#309</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                            <div className='select-address-icon-container'>
                                                <IconButton className='select-address-icon'>
                                                    <CheckCircleIcon/>
                                                </IconButton>
                                            </div>
                                        </GridListTile>
                                        <GridListTile className='grid-list-tile'>
                                            <div>
                                                <p>#310</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                            <div className='select-address-icon-container'>
                                                <IconButton className='select-address-icon'>
                                                    <CheckCircleIcon/>
                                                </IconButton>
                                            </div>
                                        </GridListTile>
                                    </GridList>
                                </div>
                                <div id='new-address-display' className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none'}>

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
                                <Button style={{margin: 5}} onClick={this.decrementActiveStep}>Back</Button>
                                <Button style={{margin: 5}} variant="contained" color="primary"
                                        onClick={this.incrementActiveStep}>Finish</Button>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
                <div className='summary-section'>
                    <span>Summary</span>
                </div>
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
}

export default Checkout;