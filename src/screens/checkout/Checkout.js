import React, {Component, Fragment} from 'react';

import './checkout.css'

//Material-Ui Imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

class Checkout extends Component {
    render() {
        return <Fragment>
            <div className='main-container'>
                <Stepper activeStep='1' orientation='vertical'>
                    <Step key='Delivery'>
                        <StepLabel>Delivery</StepLabel>
                    </Step>
                    <Step key='Payment'>
                        <StepLabel>Payment</StepLabel>
                    </Step>
                </Stepper>
            </div>
        </Fragment>
    }
}

export default Checkout;