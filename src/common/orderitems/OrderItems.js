import React, {Fragment} from 'react'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './OrderItems.css'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

export default function OrderItems(props) {
    return (
        <div className='order-item-container'>
            {(props.orderitems || []).map((item, index) => (
                <div className='order-item'>
                    <div>
                        <i className="fa fa-stop-circle-o icon-type" aria-hidden="true"
                           style={item.itype === 0 ? {color: "green"} : {color: "red"}}></i>
                    </div>
                    <div className='item-name'>
                        <Typography variant='h6' color='textSecondary'>
                            {item.name}
                        </Typography>
                    </div>
                    <div className='quantity-price'>
                        <div>
                            <Typography variant='h6' color='textSecondary'>
                                {item.quantity}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='h6' color='textSecondary'>
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                {Number(item.quantity * item.pricePerItem).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </Typography>
                        </div>
                    </div>
                </div>
            ))
            }
            {props.divider ? <Divider/> : null}
            <div className='amount'>
                <Typography variant='h6' color='textPrimary'>
                    Net Ammount
                </Typography>
                <div className='payable-bill-amount'>
                    <Typography variant='h6' color='textSecondary'>
                        <i className="fa fa-inr" aria-hidden="true"></i>
                    </Typography>
                    <Typography variant='h6' color='textSecondary'>
                        {Number(240).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </Typography>
                </div>
            </div>
            <FormControl className='place-order-button'>
                <Button variant="contained" color="primary">PLACE ORDER</Button>
            </FormControl>
        </div>
    )
}