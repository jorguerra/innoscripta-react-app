import React, { Component } from 'react';
import Header from './components/Header'
import {BrowserRouter as Router} from 'react-router-dom';

const axios = require('axios').default

export default class App extends Component {
  state = { user: { id: null, admin:false }, pizzas: {}, order: [] }
  
  constructor(props){
    super(props);
    this.token = document.getElementById('home').dataset.token;
    this.api_url=props.api_url
  }

  componentDidMount(){
    this.getUser()
    axios.get(`${this.api_url}/pizzas`).then((resp) => this.setState({pizzas: resp.data}))
  }

  getUser = async () => {
    if(this.token)
      axios.get(`${this.api_url}/user?api_token=${this.token}`).then((resp) => this.setState({user: resp.data}))
  }



  render() {
    const {id, admin} = this.state.user
    return (
        <Router>
            <Header user={id} admin={admin} cart={this.state.order} />

        </Router>
    );
  }
}