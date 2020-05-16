import React, { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header'
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import RemoveIcon from '@material-ui/icons/Remove';



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
            orderItems : {id:null,items:[],total:0},
            cartItems:[],
            cartItem : {},
            itemQuantityDecreased : false,
            nonloggedIn:false
            
            
        }
       
    }

      
    componentDidMount() {
        
    
        // Get profile 
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        
       
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log("The response is : " +this.responseText);
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
       
        xhr.open("GET", "http://localhost:8080/api/restaurant/"+ this.props.match.params.restaurantId);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

   getIndex = (value, arr, prop)=> {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    addToCartHandler = (e,id,type,name,price)=>{
        var totalAmount = this.state.totalAmount;
        var totalItems = this.state.totalItems;
        totalItems +=1;
       
        const newItem = this.state.cartItem;
        newItem.id = id;
        newItem.type = type;
        newItem.name = name;
        newItem.pricePerItem = price;
        newItem.quantity = 1;
        newItem.priceForAll = price;
    
        this.setState({cartItem: newItem});

        totalAmount+=price;

        if(this.state.orderItems.items !== undefined && this.state.orderItems.items.some(item => (item.name === name))){ 
            var index = this.getIndex(name,this.state.orderItems.items,"name");
            var quantity = this.state.orderItems.items[index].quantity + 1;
            var priceForAll = this.state.orderItems.items[index].priceForAll +  this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.priceForAll = priceForAll;
            this.setState(item);
            
        }
        else{

            this.state.cartItems.push(this.state.cartItem);
            this.setState({cartItem:{}});
    
    
            const orderItems = this.state.orderItems;
            orderItems.items =  this.state.cartItems;
            this.setState({orderItems:orderItems});
        }
     
        this.setState({open:true});
        this.setState({totalItems,totalItems});
        this.setState({totalAmount:totalAmount});
      
     
    
    }

    removeFromCartHandler = (e,id,type,name,price)=>{
      
        var index = this.getIndex(name,this.state.orderItems.items,"name");
    
        if(this.state.orderItems.items[index].quantity > 1){
            var quantity = this.state.orderItems.items[index].quantity - 1;
            var priceForAll = this.state.orderItems.items[index].priceForAll -  this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.priceForAll = priceForAll;
            this.setState(item);
        }
        else{

            this.state.orderItems.items.splice(index,1);
           
        }

        var totalAmount = this.state.totalAmount;
        totalAmount-=price;
        var totalItems = this.state.totalItems;
        totalItems -=1;
        this.setState({itemQuantityDecreased:true});
        this.setState({totalItems,totalItems});
        this.setState({totalAmount:totalAmount});

    }
       

    closeHandler = () =>{
        this.setState({open:false})
        this.setState({cartEmpty:false})
        this.setState({itemQuantityDecreased:false})
    }

    checkoutHandler = () =>{
       if ( this.state.totalItems === 0 ){
           this.setState({cartEmpty:true})
        } else if (this.state.totalItems > 0 && sessionStorage.getItem('access-token') === null) {
            this.setState({nonloggedIn:true})
        } else{
            this.props.history.push({pathname:'/checkout/' ,orderItems:this.state.orderItems,
            total:this.state.totalAmount,totalItems:this.state.totalItems});
        }
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
         <div><Header/>
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
                                      <div className="cart-item-left">
                                        {
                                            item.type == "VEG" ?  
                                            <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"green",paddingRight:"12px"}} />:
                                            <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"red",paddingRight:"12px"}} /> 
                                        }
                                         {this.Capitalize(item.name)}
                                      </div>                                                 
                                       <div className="cart-item-centre">
                                         <IconButton><RemoveIcon onClick={(e)=>this.removeFromCartHandler(e,item.id,item.type,item.name,item.pricePerItem)}/></IconButton>
                                         <span >{item.quantity} </span>
                                         <IconButton ><AddIcon onClick={(e)=>this.addToCartHandler(e,item.id,item.type,item.name,item.pricePerItem)}/></IconButton>
                                        </div>
                                        <div className="cart-item-right" >
                                         <span style={{float:"right"}}>
                                            <i className="fa fa-inr" aria-hidden="true" style={{paddingRight:"4px"}}></i>
                                            {item.priceForAll.toFixed(2)}</span>
                                        </div>
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
                           
                            <div className="checkout-b<Link to={{ pathname: '/checkout', orderItems:this.state.orderItems  }}> CHECKOUT </Link>utton" onClick={this.checkoutHandler}>
                                <Button className="checkout" variant="contained" color="primary" style={{minWidth:'470px'}}>
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
                      <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.itemQuantityDecreased}
                    autoHideDuration={3000}
                    onClose={this.closeHandler}
                    message="Item quantity decreased by 1!"
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeHandler}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                        }
                    /> 
                  <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.nonloggedIn}
                    autoHideDuration={3000}
                    onClose={this.closeHandler}
                    message="Please login first!"
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