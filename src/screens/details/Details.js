import React, { Component } from 'react';
import './Details.css';
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
            open:false
            
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
                    categories : JSON.parse(this.responseText).categories

                });
            }
        });
       
        xhr.open("GET", "/api/restaurant/3097b8f4-a294-11e8-9a3a-720006ceb890");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    addToCartHandler = () =>{
        this.setState({open:true})
    }

    closeHandler = () =>{
        this.setState({open:false})
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
                            
                        <span>{category.category_name}, </span>
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
                        <div className="category"><span style={{color:"grey",fontWeight:"bolder"}}>{category.category_name.toUpperCase()}</span> <Divider style={{marginTop:"10px",marginBottom:"10px"}}/>
                        {  category.item_list.map(item=>(
                            <div className="item">
                               <div className="item-left">{
                                  
                                   item.item_type == "VEG" ?  <span className="fa fa-circle" aria-hidden="true" style={{fontSize:"12px" ,color:"green",paddingRight:"12px"}} />:
                                   <span className="fa fa-circle" aria-hidden="true" style={{fontSize:"12px" ,color:"red",paddingRight:"12px"}} />
                               }
                                  
                                   {this.Capitalize(item.item_name)}</div>
                               <div className="item-right"><i className="fa fa-inr" aria-hidden="true" 
                                 style={{paddingRight:"4px",paddingBottom:"3px",
                                 paddingLeft:"2px"}}></i>{item.price.toFixed(2)}
                                <IconButton style={{marginLeft:"40px"}}><AddIcon onClick={this.addToCartHandler}/> </IconButton>
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
                           <Typography style={{fontWeight:"bold"}}>
                             My Cart
                            </Typography>
                            <Typography style={{fontWeight:"bold"}}>
                            TOTAL AMOUNT
                            </Typography>
                           </CardContent>    
                       </Card>   
                    </div>
            </div>            



        </div>
        )
    }
}

export default Details;