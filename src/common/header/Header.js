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

import './Header.css';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: 'darkGrey',
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
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});

class Header extends Component {
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
                        <div className={classes.headerLoginBtn}>
                            <Button variant="contained" color="default" startIcon={<AccountCircle />}>Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
