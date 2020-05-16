import React from 'react'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './OrderItems.css'
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
                           style={item.itype === 0 ? {color: "green"} : {color: "red"}}></i>
                    </div>
                    <div className='item-name'>
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
                                {Number(item.quantity * item.pricePerItem).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </Typography>
                        </div>
                </div>
            ))
            }
            {props.divider ? <Divider/> : null}
            <div className='amount-section'>
                <div className='amount'>
                    <Typography variant='h6' color='textPrimary'>
                        Net Ammount
                    </Typography>
                </div>
                <div className='payable-bill-amount'>
                    <Typography variant='h6' color='textSecondary'>
                        <i className="fa fa-inr" aria-hidden="true"></i>
                    </Typography>
                    <Typography style={{marginRight: 10}} variant='h6' color='textSecondary'>
                        {Number(props.orderitems.total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </Typography>
                </div>
            </div>
            <FormControl className='place-order-button'>
                <Button variant="contained" color="primary" onClick={props.placeOrder}>PLACE ORDER</Button>
            </FormControl>
        </div>
    )
}