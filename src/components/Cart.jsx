import React, { Component } from 'react';

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {order: []}
    }

    componentDidMount(){
        const id = parseInt(this.props.match.params.id);
        const item = this.state.order.reduce((acc, el) => {
            if(el.id == id)
                return {id: id, quantity: acc.quantity + el.quantity}
        }, {id: id, quantity:1})
        let order = this.state.order.map((pizza) =>{ return pizza.id != item.id ? pizza : null})
        order.push(item)
        this.setState({order: order })
        
    }
    render(){
        return (
            <section className="ftco-section ftco-services">
                <div className="overlay">
                    <div className="container">
                        <h3>My order</h3>
                    </div>
                </div>
            </section>
        )
    }
}


