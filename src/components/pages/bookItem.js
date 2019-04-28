"use strict"
import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart, updateCart} from '../../actions/cartActions'

class BookItem extends React.Component {

    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            quantity: 1 
        }] 
        // Check if the cart is empty
        if(this.props.cart.length > 0) {
            let _id = this.props._id 
            let cartIndex = this.props.cart.findIndex(cart => {
                return cart._id === _id
            })
            // if returns -1, means it didn't find any match
            if (cartIndex === -1) {
                this.props.addToCart(book)
            }
            else {
            // we need to update the quantity
                this.props.updateCart(_id, 1)
            }

        }else {
        // cart is empty
            this.props.addToCart(book)
        }
    }

    render() { 
        return (
            <Row>
                <Col>
                    <Card style={{textAlign: 'center' }}>
                        <Card.Body>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>{this.props.description}</Card.Text>
                            <h6>$ {this.props.price}</h6>
                            <Button onClick={this.handleCart.bind(this)} variant="primary">Buy Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStatToProps = state => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(BookItem)