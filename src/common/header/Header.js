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
import 'typeface-roboto';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';
import { Snackbar } from '@material-ui/core';

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
            openLoginSnackBar: false
        }
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

        let loginData = null;
        let that = this;
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let loginResponse = JSON.parse(this.responseText);
                if (loginResponse.code === 'ATH-001') {
                    that.setState({
                        loginErroMessage: loginResponse.message,
                        loginErroMessageRequired: "dispBlock"
                    });
                    return;
                }
                if (loginResponse.code === 'ATH-002') {
                    that.setState({
                        loginErroMessage: loginResponse.message,
                        loginErroMessageRequired: "dispBlock"
                    });
                    return;
                }
                sessionStorage.setItem("uuid", loginResponse.id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                sessionStorage.setItem("first-name", loginResponse.first_name)
                that.setState({
                    loggedIn: true,
                    openLoginSnackBar: true
                });
                that.closeModalHandler();
            }
        });

        xhrLogin.open("Post", "http://localhost:8080/api/customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContactNo + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
        console.log(this.state.customerFirstName);
    }

    inputContactNoChangeHandler = (e) => {
        this.setState({ loginContactNo: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
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
                            <FormControl required>
                                <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                <Input id="contactno" type="text" contactno={this.state.loginContactNo} onChange={this.inputContactNoChangeHandler} />
                                <FormHelperText className={this.state.loginContactNoRequired}>
                                    <span className="red">{this.state.loginContactNoRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">{this.state.loginPasswordRequiredMessage}</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <div id="error-msg-div" className={this.state.loginErroMessageRequired}><span id="error-msg" className="red">{this.state.loginErroMessage}</span></div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
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
            </div>
        );
    }
}

export default withStyles(styles)(Header);
