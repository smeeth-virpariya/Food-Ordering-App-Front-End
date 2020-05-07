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

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address'
        }
    }

    /*componentDidMount() {
        this.fetchAddress();
    }*/

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
                                <div id='existing-address-display' className='display-block'>
                                    <GridList style={{flexWrap: 'nowrap'}} cols={3} cellHeight='auto'>
                                        <GridListTile>
                                            <div>
                                                <p>#307</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                        </GridListTile>
                                        <GridListTile>
                                            <div>
                                                <p>#308</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Near Matru Nursing Home, Hulimavu, Bannerghatta Main Road,</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                        </GridListTile>
                                        <GridListTile>
                                            <div>
                                                <p>#309</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                        </GridListTile>
                                        <GridListTile>
                                            <div>
                                                <p>#310</p>
                                                <p>Shravanthi Graces, Timappa Reddy Layout, Hulimavu</p>
                                                <p>Bangalore</p>
                                                <p>Karnataka</p>
                                                <p>560076</p>
                                            </div>
                                        </GridListTile>
                                    </GridList>
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

    /*fetchAddress = () => {
        let url = 'http://localhost:8080/api/address/customer';
        let accessToken = 'eyJraWQiOiJkOTE5YjNkZS05ZGI4LTQ1MzYtYjQ4My1kNDIxODAxMjE5MzgiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxYTlhZDRjYS04MmMwLTQ3YzQtYTNjZS1kZTcwZTRiZWZjNWEiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU4ODg5MCwiaWF0IjoxNTg4ODYxfQ.bILQoopdMx9Tn7BzgbzgE7toPBXHsmRUJtnw9QSZQpHPhd2F_81d9M7d-PNt-9nytMF62Sz9yZRyJuHiSZ3BCg';
        let response = get(url, accessToken);
        console.log(response);
    }*/
}

export default Checkout;