"use strict"

import React from 'react'
import {Form, Button, Container, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {findDOMNode} from 'react-dom'
import {postBooks, deleteBooks} from '../../actions/booksAction'


class BookForm extends React.Component {

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book)
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value
        console.log(bookId)
        this.props.deleteBooks(bookId)
    }
                       
    render() {

        const bookList = this.props.books.map( booksArray => {
            return (
                <option key={booksArray._id}> {booksArray._id} </option>
            )
        })

        return (
            <Container>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title please" ref="title"/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder="description please" ref="description"/>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="price please" ref="price"/>
                    </Form.Group>
                    <Button onClick={this.handleSubmit.bind(this)} variant="primary">Save Book</Button>
                </Form>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Select a book</Form.Label>
                    <Form.Control ref="delete" as="select">
                        <option>Choose...</option>
                        {bookList}
                    </Form.Control>
                </Form.Group>
                <Button onClick={this.onDelete.bind(this)} variant="danger" >Delete a book</Button>
            </Container>
        )
    }
}

const mapSateToProps = state => {
    return {
        books: state.books.books
    }
}

const mapDispatchtoProps = dispatch => {
    return bindActionCreators({postBooks,deleteBooks}, dispatch)
}

export default connect(mapSateToProps, mapDispatchtoProps)(BookForm)