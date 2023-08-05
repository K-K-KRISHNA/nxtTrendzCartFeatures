import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedCart = cartList.filter(item => item.id !== id)
    this.setState({cartList: removedCart})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = cartItemDetails => {
    const {cartList} = this.state
    const position = cartList.findIndex(
      item => item.title === cartItemDetails.title,
    )
    const {title} = cartItemDetails
    const isDuplicate = cartList.find(item => item.title === title)
    const updatedItem = {
      ...isDuplicate,
      quantity: isDuplicate.quantity + 1,
    }
    cartList.splice(position, 1, updatedItem)
    // const newCartList = [...filteredList, updatedItem]
    this.setState({cartList})
  }

  decrementCartItemQuantity = cartItemDetails => {
    const {cartList} = this.state
    const position = cartList.findIndex(
      item => item.title === cartItemDetails.title,
    )
    const {quantity, title} = cartItemDetails
    const newQuantity = quantity > 1 ? quantity - 1 : 0
    const isDuplicate = cartList.find(item => item.title === title)
    const updatedItem = {
      ...isDuplicate,
      quantity: newQuantity,
    }
    if (newQuantity !== 0) {
      cartList.splice(position, 1, updatedItem)
    } else {
      cartList.splice(position, 1)
    }
    // const newCartList = [...filteredList, updatedItem]
    this.setState({cartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const position = cartList.findIndex(item => item.title === product.title)
    const {title, quantity} = product
    const isDuplicate = cartList.find(item => item.title === title)
    if (position === -1)
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    else {
      const updatedItem = {
        ...isDuplicate,
        quantity: isDuplicate.quantity + quantity,
      }
      cartList.splice(position, 1, updatedItem)
      this.setState({cartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
