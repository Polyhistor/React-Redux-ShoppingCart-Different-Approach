"use strict"
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import BooksList from '../src/components/pages/booksList'
import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'
// import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import Cart from './components/pages/cart'
import BooksForm from './components/pages/booksForm'
import Menu from './components/menu'
import Footer from './components/footer'

const middlWare = applyMiddleware(logger)
const store = createStore(reducers, middlWare)

const Routes = (
    <Provider store={store}>
        <BrowserRouter>
                <Menu></Menu>
                <Route component={BooksList}></Route>
                <Route path="/admin" component={BooksForm}></Route>
                <Route path="/cart" component={Cart}></Route>
                <Footer></Footer>
        </BrowserRouter>
    </Provider>
)

render(
    Routes, document.querySelector('#app')
)





