"use strict"
import React from 'react'
import {Nav, Navbar, Badge} from 'react-bootstrap'
import {connect} from 'react-redux'

class Menu extends React.Component {
    render() {
        return (
            
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
                    
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/cart"> { (this.props.totalQty > 0) ?  <Badge pill variant="info">{this.props.totalQty}</Badge> : ('') } Your Cart</Nav.Link>
                
            </Navbar.Collapse>
        </Navbar> 

        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalQty: state.cart.totalQty
    }
}

export default connect(mapStateToProps)(Menu)