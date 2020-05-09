import React, { Component } from 'react';
import Header from '../../common/header/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import './Home.css';

const styles = theme => ({
    restaurantsCard: {
        width: 300,
        maxWidth: 300,
        height: 340,
        maxHeight: 340,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 15,
        cursor: 'pointer',
    }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
            cards: null,
        }
    }

    componentDidMount() {
        this.getRestaurants();
        this.noOfCardsPerColumn();
        window.addEventListener('resize', this.noOfCardsPerColumn);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.noOfCardsPerColumn);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header showSearchBox={true} searchHandler={this.searchHandler} />
                {this.state.restaurants.length === 0 ?
                    <Typography variant="h6">No restaurant with the given name.</Typography> :
                    <GridList cols={this.state.cards} cellHeight="auto">
                        {this.state.restaurants.map(restaurant => (
                            <GridListTile key={'restaurant' + restaurant.id} >
                                {/* restaurant details card */}
                                < Card className={classes.restaurantsCard}>
                                    <CardActionArea>
                                        <CardMedia component="img" height={160} image={restaurant.photo_URL} title={restaurant.restaurant_name} />
                                        <CardContent>
                                            <div className="restaurant-title-div">
                                                <Typography gutterBottom variant='h5' component='h2'>
                                                    {restaurant.restaurant_name}
                                                </Typography>
                                            </div>
                                            <div className="restaurant-categories-div">
                                                <Typography variant='subtitle1'>
                                                    {restaurant.categories}
                                                </Typography>
                                            </div>
                                            <div className="rating-and-avg-div">
                                                {/* restaurant rating */}
                                                <div className="restaurant-rating-div">
                                                    <Typography variant='body1'>
                                                        <i className="fa fa-star"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                                </Typography>
                                                </div>
                                                {/* restaurant average price */}
                                                <div className="restaurant-avg-price-div">
                                                    <Typography variant='body1'>
                                                        <i className="fa fa-inr" aria-hidden="true"></i>{restaurant.average_price} for two
                                            </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                }
            </div >
        )
    }

    getRestaurants = () => {
        let that = this;
        let restaurantsData = null;
        let xhrRestaurants = new XMLHttpRequest();
        xhrRestaurants.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurants: JSON.parse(this.responseText).restaurants
                });
            }
        })
        xhrRestaurants.open("GET", "http://localhost:8080/api/restaurant");
        xhrRestaurants.send(restaurantsData);
    }

    noOfCardsPerColumn = () => {

        if (window.innerWidth >= 320 && window.innerWidth <= 600) {
            this.setState({
                cards: 1,
            });
            return;
        }

        if (window.innerWidth >= 601 && window.innerWidth <= 1000) {
            this.setState({
                cards: 2,
            });
            return;
        }

        if (window.innerWidth >= 1001 && window.innerWidth <= 1270) {
            this.setState({
                cards: 3,
            });
            return;
        }

        if (window.innerWidth >= 1271 && window.innerWidth <= 1530) {
            this.setState({
                cards: 4,
            });
            return;
        }
        if (window.innerWidth >= 1530) {
            this.setState({ cards: 5 });
            return;
        }
    }

    searchHandler = (event) => {
        let that = this;
        let filteredRestaurants = null;
        let xhrFilteredRestaurants = new XMLHttpRequest();
        xhrFilteredRestaurants.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (!JSON.parse(this.responseText).restaurants) {
                    that.setState({
                        restaurants: null
                    });
                } else {
                    that.setState({
                        restaurants: JSON.parse(this.responseText).restaurants
                    });
                }
            }
        });
        if (event.target.value === '') {
            this.getRestaurants();
        } else {
            xhrFilteredRestaurants.open("GET", "http://localhost:8080/api/restaurant/name/" + event.target.value);
            xhrFilteredRestaurants.send(filteredRestaurants);
        }
    }
}

export default withStyles(styles)(Home);