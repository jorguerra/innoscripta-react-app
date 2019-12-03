import React, { Component } from 'react';
import {Link} from 'react-router-dom';
axios = require('axios').default;

export default class Cart extends Component{
    state = {pizzas: [], qty: []}

    constructor(props){
        super(props);
        this.state2 = props.order
    }

    componentDidMount(){
        this.props.order.map((pizza) => {
            if(!pizza) return;
            axios.get(`/api/pizzas/${pizza.id}`).then((resp) => {
                pizza.info = resp.data;
                pizza.style = {backgroundImage: `url(${resp.data.photo})`}
                this.setState((prevState) => ({pizzas: [pizza, ...prevState.pizzas] }))
            })
        })
    }

    render(){
        return (
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center" style={{marginBottom: '3em'}}>
                        <div className="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated"> 
                            <h2 className="mb-4">My Order</h2>
                            <p className="flip">
                                <span className="deg1"></span>
                                <span className="deg2"></span>
                                <span className="deg3"></span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {this.state2.map((order ) =>{
                            const pizza = order ? this.props.get.bind(this, order.id)() : null;
                            return (
                                pizza && pizza.info ?     
                                <div key={pizza.id} className="col-md-6">
                                    <div className="pricing-entry d-flex">
                                        <div className="img" style={order.style}></div>
                                        <div className="desc pl-3">
                                            <div className="d-flex text align-items-center">
                                                <h3><span>{pizza.quantity} x {pizza.info.name}</span></h3>
                                                <span className="price">${pizza.info.price}</span>
                                            </div>
                                            <div className="d-block order">
                                                Quantity: {pizza.quantity}
                                                <div className="float-right">
                                                <Link to='#' className="text-primary" onClick={this.props.add.bind(this,pizza.id)}>+</Link>
                                                &nbsp;&nbsp;&nbsp;
                                                <Link to='#' className="text-danger" onClick={this.props.remove.bind(this,pizza.id)}>-</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : ''
                            )
                        })}
                    </div>
                    <div className="col-md-12 text-center">
                        {this.props.user ?
                            <Link to={this.state2.length ? '/order':'#'} className="btn btn-primary">
                                {this.state2.length ? 'Process order' : 'You don\'t have pizzas yet'}
                            </Link>
                        : <Link to="#" className="btn btn-primary">You need to login first</Link>}
                    </div>
                </div>
            </section>
        )
    }
}


