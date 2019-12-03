import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
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

  render() {
    const {user, pizzas} = this.state
    return (
      <Router>
        <Header user={user.id} admin={user.admin} cart={this.state.order} />

        <Switch>
          <Route path='/' exact render={() => <Home pizzas={this.state.pizzas.data} add={this.addToCart} />} /> 
        </Switch>

      </Router>
    );
  }
}