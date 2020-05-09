import React, { Component } from 'react';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';

import './Header.css';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#263238',
        boxShadow: 'none',
    },
    headerTools: {
        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    logo: {
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
    },
    searchBox: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '30ch',
    },
    headerLoginBtn: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    customerProifleBtn: {
        color: 'white',
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            loginContactNoRequired: "dispNone",
            loginContactNo: "",
            loginContactNoRequiredMessage: "required",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequiredMessage: "required",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            openLoginSnackBar: false,
            loginErroMessage: "",
            loginErroMessageRequired: "dispNone",
            signupFirstname: "",
            signupFirstnameRequired: "dispNone",
            singupLastname: "",
            signupEmail: "",
            signupEmailRequired: "",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupContactNo: "",
            signupContactNoRequired: "dispNone",
            signupEmailRequiredMessage: "required",
            signupPasswordRequiredMessage: "required",
            signupContactNoRequiredMessage: "required",
            openSignupSnackBar: false,
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.headerTools}>
                        <IconButton disableRipple={true} className={classes.logo} edge="start" color="inherit" aria-label="app logo">
                            <FastfoodIcon />
                        </IconButton>
                        <div className={classes.grow} />
                        <div className={classes.searchBox}>
                            <ThemeProvider theme={theme}>
                                <InputLabel htmlFor="search-box-input" />
                                <Input id="search-box-input"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                    placeholder="Search by Restaurant Name"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={classes.grow} />
                        {!this.state.loggedIn ?
                            <div className={classes.headerLoginBtn}>
                                <Button variant="contained" color="default" startIcon={<AccountCircle />} onClick={this.openModalHandler}>Login</Button>
                            </div>
                            : <div className={classes.customerProifleBtn}>
                                <Button id="customer-profile" startIcon={<AccountCircle />}>{sessionStorage.getItem("first-name")}</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs value={this.state.value} className="tabs" onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Signup" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                <Input id="contactno" type="text" value={this.state.loginContactNo} contactno={this.state.loginContactNo} onChange={this.inputLoginContactNoChangeHandler} />
                                <FormHelperText className={this.state.loginContactNoRequired}>
                                    <span className="red">{this.state.loginContactNoRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" value={this.state.loginPassword} password={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">{this.state.loginPasswordRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <div id="login-error-msg-div" className={this.state.loginErroMessageRequired}><span id="login-error-msg" className="red">{this.state.loginErroMessage}</span></div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" value={this.state.signupFirstname} signupfirstname={this.state.signupFirstname} onChange={this.inputSignupFirstNameChangeHandler} />
                                <FormHelperText className={this.state.signupFirstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl className="login-and-signup-forms">
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" value={this.state.singupLastname} signuplastname={this.state.singupLastname} onChange={this.inputSignupLastNameChangeHandler} />
                            </FormControl>
                            <br /><br />
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" value={this.state.signupEmail} signupemail={this.state.signupEmail} onChange={this.inputSignupEmailChangeHandler} />
                                <FormHelperText className={this.state.signupEmailRequired}>
                                    <span className="red">{this.state.signupEmailRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="signupPassword">Password</InputLabel>
                                <Input id="signupPassword" type="password" value={this.state.signupPassword} signuppassword={this.state.signupPassword} onChange={this.inputSignupPasswordChangeHandler} />
                                <FormHelperText className={this.state.signupPasswordRequired}>
                                    <span className="red">{this.state.signupPasswordRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className="login-and-signup-forms">
                                <InputLabel htmlFor="signupContactNo">Contact No.</InputLabel>
                                <Input id="signupContactNo" type="text" value={this.state.signupContactNo} signupcontactno={this.state.signupContactNo} onChange={this.inputSignupContactNoChangeHandler} />
                                <FormHelperText className={this.state.signupContactNoRequired}>
                                    <span className="red">{this.state.signupContactNoRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <div id="signup-error-msg-div" className={this.state.signupErrorMessageRequired}><span id="signup-error-msg" className="red">{this.state.signupErrorMessage}</span></div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
                {/* login snackbar to display the message if customer login is successful  */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openLoginSnackBar}
                    autoHideDuration={5000}
                    onClose={this.loginSnackBarCloseHandler}
                    message="Logged in successfully!"
                />
                {/* signup snackbar to display the message if customer registered successfully  */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSignupSnackBar}
                    autoHideDuration={5000}
                    onClose={this.signupSnackBarCloseHandler}
                    message="Registered successfully! Please login now!"
                />
            </div>
        );
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            loginContactNoRequired: "dispNone",
            loginContactNo: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loginErroMessage: "",
            loginErroMessageRequired: "dispNone",
            signupFirstname: "",
            signupFirstnameRequired: "dispNone",
            singupLastname: "",
            signupEmail: "",
            signupEmailRequired: "dispNone",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupContactNo: "",
            signupContactNoRequired: "dispNone",
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {

        let contactNoRequired = false;
        if (this.state.loginContactNo === "") {
            this.setState({
                loginContactNoRequired: "dispBlock",
                loginContactNoRequiredMessage: "required"
            });
            contactNoRequired = true;
        } else {
            this.setState({
                loginContactNoRequired: "dispNone"
            });
        }

        let passwordRequired = false;
        if (this.state.loginPassword === "") {
            this.setState({
                loginPasswordRequired: "dispBlock",
                loginPasswordRequiredMessage: "required"
            });
            passwordRequired = true;
        } else {
            this.setState({
                loginPasswordRequired: "dispNone"
            });
        }

        if ((contactNoRequired && passwordRequired) || contactNoRequired) {
            return;
        }

        const isvalidContactNo = validator.isMobilePhone(this.state.loginContactNo);
        if ((contactNoRequired === false && !isvalidContactNo) || this.state.loginContactNo.length !== 10) {
            this.setState({
                loginContactNoRequiredMessage: "Invalid Contact",
                loginContactNoRequired: "dispBlock"
            });
            return;
        }

        if (passwordRequired) {
            return;
        }
        this.sendLoginDetails();
    }

    inputLoginContactNoChangeHandler = (e) => {
        this.setState({ loginContactNo: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginSnackBarCloseHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openLoginSnackBar: false
        });
    }

    sendLoginDetails = () => {
        let loginData = null;
        let that = this;
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let loginResponse = JSON.parse(this.responseText);
                if (this.status === 401) {
                    that.setState({
                        loginErroMessage: loginResponse.message,
                        loginErroMessageRequired: "dispBlock"
                    });
                }
                if (this.status === 200) {
                    sessionStorage.setItem("uuid", loginResponse.id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                    sessionStorage.setItem("first-name", loginResponse.first_name)
                    that.setState({
                        loggedIn: true,
                        openLoginSnackBar: true
                    });
                    that.closeModalHandler();
                }
            }
        });

        xhrLogin.open("Post", "http://localhost:8080/api/customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContactNo + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
    }

    signupClickHandler = () => {

        this.state.signupFirstname === "" ? this.setState({ signupFirstnameRequired: "dispBlock" }) : this.setState({ signupFirstnameRequired: "dispNone" });

        let signupEmailRequired = false;
        if (this.state.signupEmail === "") {
            this.setState({
                signupEmailRequiredMessage: "required",
                signupEmailRequired: "dispBlock"
            });
            signupEmailRequired = true;
        } else {
            this.setState({ signupEmailRequired: "dispNone" });
        }

        let signupPasswordRequired = false;
        if (this.state.signupPassword === "") {
            this.setState({
                signupPasswordRequiredMessage: "required",
                signupPasswordRequired: "dispBlock"
            });
            signupPasswordRequired = true;
        } else {
            this.setState({ signupPasswordRequired: "dispNone" });
        }

        let signupContactNoRequired = false;
        if (this.state.signupContactNo === "") {
            this.setState({
                signupContactNoRequiredMessage: "required",
                signupContactNoRequired: "dispBlock"
            });
            signupContactNoRequired = true;
        } else {
            this.setState({ signupContactNoRequired: "dispNone" });
        }

        const isValidEmail = validator.isEmail(this.state.signupEmail);
        if (signupEmailRequired === false && !isValidEmail) {
            this.setState({
                signupEmailRequiredMessage: "Invalid Email",
                signupEmailRequired: "dispBlock"
            });
            return;
        }

        const isValidPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$');
        if (signupPasswordRequired === false && !isValidPassword.test(this.state.signupPassword)) {
            this.setState({
                signupPasswordRequiredMessage: "Password must contain at least one capital letter, one small letter, one number, and one special character",
                signupPasswordRequired: "dispBlock"
            });
            return;
        }

        if (signupContactNoRequired) {
            return;
        }

        const isvalidContactNo = validator.isMobilePhone(this.state.signupContactNo);
        if ((signupContactNoRequired === false && !isvalidContactNo) || this.state.signupContactNo.length !== 10) {
            this.setState({
                signupContactNoRequiredMessage: "Contact No. must contain only numbers and must be 10 digits long",
                signupContactNoRequired: "dispBlock"
            });
            return;
        }

        this.sendSignupDetails();
    }

    inputSignupFirstNameChangeHandler = (e) => {
        this.setState({ signupFirstname: e.target.value });
    }

    inputSignupLastNameChangeHandler = (e) => {
        this.setState({ singupLastname: e.target.value });
    }

    inputSignupEmailChangeHandler = (e) => {
        this.setState({ signupEmail: e.target.value });
    }

    inputSignupPasswordChangeHandler = (e) => {
        this.setState({ signupPassword: e.target.value });
    }

    inputSignupContactNoChangeHandler = (e) => {
        this.setState({ signupContactNo: e.target.value });
    }

    signupSnackBarCloseHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSignupSnackBar: false
        });
    }

    sendSignupDetails = () => {
        let signupData = JSON.stringify({
            "contact_number": this.state.signupContactNo,
            "email_address": this.state.signupEmail,
            "first_name": this.state.signupFirstname,
            "last_name": this.state.singupLastname,
            "password": this.state.signupPassword
        });

        let that = this;
        let xhrSignup = new XMLHttpRequest();
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let responseText = JSON.parse(this.responseText);
                if (this.status === 400) {
                    that.setState({
                        signupErrorMessage: responseText.message,
                        signupErrorMessageRequired: "dispBlock"
                    });
                }
                if (this.status === 201) {
                    that.setState({
                        value: 0,
                        openSignupSnackBar: true
                    });
                }
            }
        });

        xhrSignup.open("POST", "http://localhost:8080/api/customer/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(signupData);
    }
}

export default withStyles(styles)(Header);
