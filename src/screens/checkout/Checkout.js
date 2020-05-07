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

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address'
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
                                                 onClick={() => this.changeActiveTab('existing_address')}></Tab>
                                            <Tab value='new_address' label='NEW ADDRESS'
                                                 onClick={() => this.changeActiveTab('new_address')}></Tab>
                                        </Tabs>
                                    </AppBar>
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
}

export default Checkout;