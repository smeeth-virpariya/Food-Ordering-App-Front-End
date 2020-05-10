import React, { Component } from 'react';
import './Details.css';
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

class Details extends Component{
  
    constructor(){
        super();
        this.state = {
            id:null,
            restaurant_name : null,
            photo_URL : null,
            customer_rating : null,
            average_price : null,
            number_customers_rated : null,
            locality : null,
            categories : [],
            open:false,
            totalAmount : 0,
            totalItems:0,
            cartEmpty : false,
            orderItems : {id:null,items:[]},
            cartItems:[],
            cartItem : {}
            
            
        }
       
    }

      
    componentDidMount() {
        
    
        // Get profile 
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        
       
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    id : JSON.parse(this.responseText).id,
                    restaurant_name : JSON.parse(this.responseText).restaurant_name,
                    photo_URL : JSON.parse(this.responseText).photo_URL,
                    customer_rating : JSON.parse(this.responseText).customer_rating,
                    average_price : JSON.parse(this.responseText).average_price,
                    number_customers_rated : JSON.parse(this.responseText).number_customers_rated,
                    locality : JSON.parse(this.responseText).address.locality,
                    categories : JSON.parse(this.responseText).categories,
                    orderItems : {id:JSON.parse(this.responseText).id},
                    

                });
            }
        });
       
        xhr.open("GET", "/api/restaurant/3097b8f4-a294-11e8-9a3a-720006ceb890");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    addToCartHandler = (e,id,type,name,price)=>{
        const newItem = this.state.cartItem;
        newItem.id = id;
        newItem.type = type;
        newItem.name = name;
        newItem.pricePerItem = price;
    
        this.setState({cartItem: newItem});
        this.state.cartItems.push(this.state.cartItem);
        this.setState({cartItem:{}});

       const orderItems = this.state.orderItems;
        orderItems.items =  this.state.cartItems;
        this.setState({orderItems:orderItems});

        var totalItems = this.state.totalItems;
        totalItems +=1;
        this.setState({open:true});
        this.setState({totalItems,totalItems});
    }

    closeHandler = () =>{
        this.setState({open:false})
        this.setState({cartEmpty:false})
    }

    checkoutHandler = () =>{
        this.state.totalItems === 0 ? this.setState({cartEmpty:true}):this.setState({cartEmpty:false});
    }
    Capitalize(str){
        var arr = str.split(" ")
        var pascalCasedString =""
        arr.map(a=>(
            pascalCasedString +=  a.charAt(0).toUpperCase() + a.slice(1) +" "
        )

        )
        return pascalCasedString
        }

    render(){
       
        return(
         <div>Header comes here
            <div className="restaurant-details-container">
               <div className="restaurant-left-container"> 
                  <img  src={this.state.photo_URL} className="restaurant-image"/>
                </div>
                <div className="restaurant-right-container"> 
                  <div style={{fontWeight:"medium", fontSize:"30px", paddingTop:"10px" ,paddingBottom:"10px"}}>{this.state.restaurant_name}</div>
                  <div style={{fontWeight:"medium", fontSize:"16px",paddingBottom:"10px"}}>{this.state.locality}</div>
                  <div style={{fontSize:"14px",paddingBottom:"20px"}}>
                    {
                        this.state.categories.map(category =>(
                            
                        <span key={category.id+"category"}>{category.category_name}, </span>
                        ))
                    }
                  </div>
                  <div className="rating-section">
                      <div className="rating-section-left">
                        <i className="fa fa-star" aria-hidden="true" style={{paddingRight:"3px",paddingBottom:"3px",paddingLeft:"2px"}}></i>{this.state.customer_rating}
                        <div style={{color:"gray", fontSize:"12px"}}>AVERAGE RATING BY</div>
                        <div style={{color:"gray", fontSize:"12px"}}>{this.state.number_customers_rated} CUTOMERS</div>
                      </div>
                      <div className="rating-section-right">
                      <i className="fa fa-inr" aria-hidden="true" style={{paddingRight:"4px",paddingBottom:"3px",
                      paddingLeft:"2px"}}></i>{this.state.average_price}
                      <div style={{color:"gray", fontSize:"12px"}}>AVERAGE COST FOR</div>
                        <div style={{color:"gray", fontSize:"12px"}}>TWO PEOPLE</div>
                      </div>
                   </div>   
                </div>
             </div> 


            <div className="category-items-cart-container">
                <div className="category-items-container">
                    {this.state.categories.map(category=>(
                        <div className="category" key="category.id"><span style={{color:"grey",fontWeight:"bolder"}}>{category.category_name.toUpperCase()}</span> <Divider style={{marginTop:"10px",marginBottom:"10px"}}/>
                        {  category.item_list.map(item=>(
                            <div className="item" key={item.id}>
                               <div className="item-left">{
                                  
                                   item.item_type == "VEG" ?  <span className="fa fa-circle" aria-hidden="true" style={{fontSize:"12px" ,color:"green",paddingRight:"12px"}} />:
                                   <span className="fa fa-circle" aria-hidden="true" style={{fontSize:"12px" ,color:"red",paddingRight:"12px"}} />
                               }
                                  
                                   {this.Capitalize(item.item_name)}</div>
                               <div className="item-right"><i className="fa fa-inr" aria-hidden="true" 
                                 style={{paddingRight:"4px",paddingBottom:"3px",
                                 paddingLeft:"2px"}}></i>{item.price.toFixed(2)}
                                <IconButton style={{marginLeft:"40px"}} 
                                onClick={(e)=> this.addToCartHandler(e,item.id,item.item_type,item.item_name,item.price)}><AddIcon /> </IconButton>
                               </div>
                            </div> 
                             ))
                         }
                        </div>
                    ))}
                 </div>  
                 <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.closeHandler}
                    message="Item added to cart!"
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeHandler}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                        }
                    /> 
                    <div className="cart-container">
                    <Card>  
                           <CardContent>
                           <div style={{fontWeight:"bold"}}>
                             <i  style={{paddingRight:"20px"}}>
                             <Badge badgeContent={this.state.totalItems} color="primary" showZero>  
                                 <ShoppingCartIcon/>
                             </Badge>     
                            </i>My Cart
                            </div>
                             <div className="cart-item-list">
                                {
                                    this.state.orderItems.items !== undefined ?
                                    this.state.orderItems.items.map(item=>(
                                    <div className="cart-item">
                                    {
                                         item.type == "VEG" ?  
                                         <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"green",paddingRight:"12px"}} />:
                                         <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"red",paddingRight:"12px"}} /> 
                                    }
                                     
                                        {this.Capitalize(item.name)}
                                    </div>)):""
                                }
                            </div>
                            <div className="total-amount-section">
                                <span>
                                TOTAL AMOUNT
                                </span>
                                <span style={{float:"right"}}>
                                <i className="fa fa-inr" aria-hidden="true" style={{paddingRight:"2px"}} ></i>{this.state.totalAmount.toFixed(2)}
                                </span>
                            </div>
                           
                            <div className="checkout-button" onClick={this.checkoutHandler}>
                                <Button className="checkout" variant="contained" color="primary" style={{marginLeft:'5px',minWidth:'450px'}}>
                                CHECKOUT
                                </Button>
                            </div>
                           </CardContent>    
                       </Card>   
                    </div>
                    <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.cartEmpty}
                    autoHideDuration={3000}
                    onClose={this.closeHandler}
                    message="Please add an item to your cart!"
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeHandler}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                        }
                    /> 
            </div>            



        </div>
        )
    }
}

export default Details;