"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBooks} from '../../actions/booksAction'
import {Container, Col, Row, Button} from 'react-bootstrap'

import BookItem from './bookItem'
import BookForm from './booksForm'
import Cart from './cart'


class BooksList extends React.Component{
    componentDidMount() {
        // dispatch an action
        this.props.getBooks()
    }

    render() {
        const bookList = this.props.books.map(booksarr => {
            return (
                // <Col xs={12} sm={6} md={4} key={booksarr.id}>
                    <BookItem 
                        _id ={booksarr._id}
                        title={booksarr.title}
                        description={booksarr.description}
                        price={booksarr.price}
                    ></BookItem>
                // </Col>
            )
        })
        return (

            <Container>
                <Cart/>
                <Row>
                    <Col xs={12} sm={4}>
                        <BookForm/>
                    </Col>
                    <Col xs={12} sm={8}>
                        {bookList}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStatetoProps = state => {
    return {
        books : state.books.books
    }
}

const mapDispatchtoProps = (dispatch) => {
    return bindActionCreators({getBooks: getBooks}, dispatch)
}

export default connect(mapStatetoProps, mapDispatchtoProps)(BooksList)