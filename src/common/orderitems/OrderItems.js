import React from 'react'
//Stylesheet imports
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './OrderItems.css'
//Material UI imports
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

export default function OrderItems(props) {
    return (
        <div className='order-item-container'>
            {(props.orderitems.items || []).map((item, index) => (
                <div key={item.id} className='order-item'>
                    <div className='icon'>
                        <i className="fa fa-stop-circle-o icon-type" aria-hidden="true"
                           style={item.type === 'VEG' ? {color: "green"} : {color: "red"}}></i>
                    </div>
                    <div className='item-name' style={{textTransform:"capitalize"}}>
                        <Typography variant='h6' color='textSecondary'>
                            {item.name}
                        </Typography>
                    </div>
                        <div className='quantity'>
                            <Typography variant='h6' color='textSecondary'>
                                {item.quantity}
                            </Typography>
                        </div>
                        <div className='price'>
                            <Typography variant='h6' color='textSecondary'>
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                {item.priceForAll.toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </Typography>
                        </div>
                </div>
            ))
            }
            {props.divider ? <Divider/> : null}
            <div className='amount-section'>
                <div className='amount'>
                    <Typography variant='h6' color='textPrimary'>
                        Net Amount
                    </Typography>
                </div>
                <div className='payable-bill-amount'>
                    <Typography variant='h6' color='textSecondary'>
                        <i className="fa fa-inr" aria-hidden="true"></i>
                    </Typography>
                    <Typography style={{marginRight: 10}} variant='h6' color='textSecondary'>
                        {Number(props.total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </Typography>
                </div>
            </div>
            <FormControl className='place-order-button'>
                <Button variant="contained" color="primary" onClick={props.placeOrder}>PLACE ORDER</Button>
            </FormControl>
        </div>
    )
}