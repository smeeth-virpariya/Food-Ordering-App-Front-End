import React, {Component, Fragment} from 'react';

import './checkout.css'

//Material-Ui Imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0
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
                                <div className='address-tabs'>
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
}

export default Checkout;