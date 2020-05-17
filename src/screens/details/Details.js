import React, { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header'
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import CustomizedSnackbar from '../../common/CustomizedSnackbar/CustomizedSnackBar'



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
            nonloggedIn:false,
            itemRemovedFromCart:false,
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

        let url = this.props.baseUrl + 'restaurant/';
       
        xhr.open("GET", url+ this.props.match.params.restaurantId);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

   getIndex = (value, arr, prop)=> {
        for(let i = 0; i < arr.length; i++) {
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
        this.setState({totalItems:totalItems});
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
            this.setState({itemQuantityDecreased:true});
           
        }
        else{

            this.state.orderItems.items.splice(index,1);
            this.setState({itemRemovedFromCart:true});
           
        }

       
        var totalAmount = this.state.totalAmount;
        totalAmount-=price;
        var totalItems = this.state.totalItems;
        totalItems -=1;
       
        this.setState({totalItems:totalItems});
        this.setState({totalAmount:totalAmount});

    }
       

    closeHandler = () =>{
        this.setState({open:false})
        this.setState({cartEmpty:false})
        this.setState({nonloggedIn:false})
        this.setState({itemQuantityDecreased:false})
        this.setState({itemRemovedFromCart:false})
    }

    checkoutHandler = () =>{
       if ( this.state.totalItems === 0 ){
           this.setState({cartEmpty:true});
        } else  if(this.state.totalItems > 0 && sessionStorage.getItem('access-token') === null) {
            this.setState({nonloggedIn:true});
        } else{
            this.props.history.push({
                pathname: '/checkout/' ,
                state :{orderItems:this.state.orderItems,
                total:this.state.totalAmount,restaurantName:this.state.restaurant_name }
            })
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
         
        <div><Header baseUrl={this.props.baseUrl}/>
        {this.state.text}
          <div className="main-container-body">
                <div className="restaurant-details-container">
                    <div className="restaurant-left-container"> 
                        <img  src={this.state.photo_URL} alt="none" className="restaurant-image"/>
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
                        <div className="category" key={"category"+category.id}><span style={{color:"grey",fontWeight:"bolder"}}>{category.category_name.toUpperCase()}</span> <Divider style={{marginTop:"10px",marginBottom:"10px"}}/>
                        {  category.item_list.map(item=>(
                            <div className="item" key={item.id}>
                               <div className="item-left">{
                                  
                                   item.item_type === "VEG" ?  <span className="fa fa-circle" aria-hidden="true" style={{fontSize:"12px" ,color:"green"}} />:
                                   <span className="fa fa-circle"  aria-hidden="true" style={{fontSize:"12px" ,color:"red"}} />
                               }
                                  
                                 <span className="item-name">  {this.Capitalize(item.item_name)} </span>
                                </div>
                               <div className="item-right">
                                  <div className="pricePerItem">
                                    <span>
                                    <i className="fa fa-inr" aria-hidden="true"></i>
                                      <span style={{paddingLeft:"2px"}} >{item.price.toFixed(2)}</span>
                                    </span>
                                  </div>
                                  <div className="addIcon">
                                    <IconButton  style={{float:'right'}}
                                    onClick={(e)=> this.addToCartHandler(e,item.id,item.item_type,item.item_name,item.price)}>
                                      
                                        <AddIcon  /> 
                                       
                                    </IconButton>
                                    </div> 
                                 
                                </div>
                               
                            </div> 
                             ))
                         }
                        </div>
                    ))}
                 </div>  
                   
                <div className="cart-container">
                    <Card>  
                        <CardContent>
                        <div style={{fontWeight:"bold"}}>
                            <i  style={{paddingRight:"20px"}}>
                            <Badge  className="badge" badgeContent={this.state.totalItems} color="primary" showZero>  
                                <ShoppingCartIcon/>
                            </Badge>     
                        </i>My Cart
                        </div>
                        <div className="cart-item-list">
                            {
                                this.state.orderItems.items !== undefined ?
                                this.state.orderItems.items.map(item=>(
                                <div className="cart-item" key={item.id}>
                                    <div className="cart-item-left">
                                    {
                                        item.type === "VEG" ?  
                                        <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"green",paddingRight:"12px"}} />:
                                        <span className="fa fa-stop-circle-o" aria-hidden="true" style={{fontSize:"12px" ,color:"red",paddingRight:"12px"}} /> 
                                    }
                                        {this.Capitalize(item.name)}
                                    </div>                                                 
                                    <div className="cart-item-centre">
                                      
                                        <IconButton className="removeIcon-cart"
                                        style={{fontWeight:"bolder"}} onClick={(e)=>this.removeFromCartHandler(e,item.id,item.type,item.name,item.pricePerItem)}><RemoveIcon/></IconButton>
                                     
                                        <span >{item.quantity} </span>
                                        <IconButton  className="addIcon-cart" style={{fontWeight:"bolder"}}  onClick={(e)=>this.addToCartHandler(e,item.id,item.type,item.name,item.pricePerItem)}><AddIcon /></IconButton>
                                    </div>
                                    <div className="cart-item-right" >
                                        <span >
                                            <i className="fa fa-inr" aria-hidden="true" ></i>
                                            <span style={{paddingLeft:"2px"}}>{item.priceForAll.toFixed(2)}</span>
                                        </span>
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
                        
                        <div className="checkout-button">
                            <Button className="checkout" variant="contained" color="primary">
                               <Typography onClick={this.checkoutHandler}>CHECKOUT</Typography>
                            </Button>
                        </div>
                        </CardContent>    
                    </Card>   
                </div>
            </div>  
            <CustomizedSnackbar open={this.state.open} closeHandler={this.closeHandler} message="Item added to cart!"/>
            <CustomizedSnackbar open={this.state.cartEmpty} closeHandler={this.closeHandler} message="Please add an item to your cart!"/>
            <CustomizedSnackbar open={this.state.itemQuantityDecreased} closeHandler={this.closeHandler} message="Item quantity decreased by 1!"/>
            <CustomizedSnackbar open={this.state.nonloggedIn} closeHandler={this.closeHandler} message="Please login first!"/>
            <CustomizedSnackbar open={this.state.itemRemovedFromCart} closeHandler={this.closeHandler} message="Item removed from cart!"/>
                

        </div>
    </div>
        )
    }
}

export default Details;