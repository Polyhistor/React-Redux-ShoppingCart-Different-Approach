"use strict"

import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonGroup, Card, Modal} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {deleteCartItem, updateCart} from '../../actions/cartActions'

class Cart extends React.Component {    

    onDelete(_id) {

        const currentCartToDelete = this.props.cart
        const indexToDelete = currentCartToDelete.findIndex (
            cart => {
                return cart._id === _id
            }
        )

        let cartAfterDelete = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete+1)]
        this.props.deleteCartItem(cartAfterDelete)

    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1)
    }

    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1)
        }
    }

    constructor () {
        super()
        this.state = {
            ShowModal:false
        }
    }

    open() {
        this.setState({ShowModal:true})
    }

    close() {
        this.setState({ShowModal:false})
    }

    render() {
        if(this.props.cart[0]){
            return this.renderCart()
        } else {
            return this.renderEmpty()
        }
    }

    renderEmpty() {
        return (
            <div></div>
        )
    }
    
    renderCart() {
        const cartItemsList = this.props.cart.map( cartArr => {
            return (
                <Card.Body key={cartArr._id} style={{ textAlign: 'center'}}>
                    <Card.Title>{cartArr.title}</Card.Title>
                    <Card.Text>{cartArr.price}</Card.Text>
                    <Card.Text>qty: <label>{cartArr.quantity}</label> </Card.Text>
                    <ButtonGroup>
                        <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} variant="warning">-</Button>
                        <Button onClick={this.onIncrement.bind(this, cartArr._id)} variant="success">+</Button>
                        <Button onClick={this.onDelete.bind(this, cartArr._id)} variant="danger">Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            )
        })
        return (
            <Card header="Cart" variant="primary">
                <Card.Body>
                        {cartItemsList}
                        <h6>Total Amount:{this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} variant="success" size="small">Proceed to Checkout</Button>  
                        <Modal show={this.state.ShowModal} onHide={this.close.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thank you!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               <h6>Your order has been saved</h6> 
                               <p>You will receive an e-mail confirmation</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <h6>Total: $:{this.props.totalAmount} </h6>
                                <Button variant="secondary" onClick={this.close.bind(this)}>
                                Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                </Card.Body>
            </Card>
        )
    }

}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
} 

const mapDispatchToprops = dispatch => {
    return bindActionCreators({
        deleteCartItem : deleteCartItem,
        updateCart : updateCart,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToprops)(Cart)