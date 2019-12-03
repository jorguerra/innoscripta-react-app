import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Order from './components/Order';
import OrderForm from './components/OrderForm';
import ReviewOrders from './components/ReviewOrders';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const axios = require('axios').default

export default class App extends Component {
  state = { user: { id: null, admin:false }, pizzas: {}, order: [] }
  
  constructor(props){
    super(props);
    this.token = document.getElementById('home').dataset.token;
    this.api_url= '/api'
  }

  componentDidMount(){
    this.getUser()
    axios.get(`${this.api_url}/pizzas`).then((resp) => this.setState({pizzas: resp.data}))
  }

  getUser = async () => {
    if(this.token)
      axios.get(`${this.api_url}/user?api_token=${this.token}`).then((resp) => this.setState({user: resp.data}))
  }

  addToCart = (id) => {
    let item = this.state.order.reduce((acc, el) => {
      if(!el || el.id != id) return acc;
      return {id: id, quantity: acc.quantity + el.quantity}
    }, {id: id, quantity:1});
    if(!item.info){
      item.info = this.getInfoPizza(id)
    }
    let order = this.state.order.map((pizza) =>{ 
      if (pizza && pizza.id != item.id ){
          pizza.info = this.getInfoPizza(pizza.id);
          return pizza;
      }
      return null
    }).filter((obj) => obj != null);
    order.push(item);
    this.setState({order: order})
  }

  getInfoPizza = (id) => {
    const pizza = this.state.pizzas.data.filter((p) => p.id == id);
    return pizza.length ? pizza[0] : null
  }

  removeFromCart = (id) => {
    const order = this.state.order.map((item) => {
        if(!item || (item.id == id && item.quantity == 1)) return;
        if(item.id == id) item.quantity--;
        return item;
    })
    this.setState({order: order})
  }

  getFromCart = (id) => {
    const item = this.state.order.filter((pizza) => (pizza && pizza.id == id));
    return item.length ? item[0] : null;
  }


  render() {
    const {user, pizzas, order} = this.state
    return (
      <Router>
        <Header user={user.id} admin={user.admin} cart={order} />

        <Switch>
          <Route path='/' exact render={() => <Home pizzas={pizzas.data} add={this.addToCart} />} />
          <Route path='/cart' exact render={() => <Order order={order} get={this.getFromCart} user={user.id} add={this.addToCart} remove={this.removeFromCart}  />} /> 
          <Route path="/order" render={() => <OrderForm order={order} get={this.getFromCart} user={user} />} />
          <Route path="/review-orders" render={() => <ReviewOrders admin={this.state.user.admin} api={this.api_url} />} />
        </Switch>

      </Router>
    );
  }
}