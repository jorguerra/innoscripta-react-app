import React from 'react'
import Config from './../Config'
const axios=require('axios');

export default class ReviewOrders extends React.Component{
    state = {orders: [], page: 1}
    constructor(props){
        super(props);
        this.token = document.getElementById('home').dataset.token;
    }

    componentDidMount(){
        axios.get(`${Config.api_url}/orders?api_token=${this.token}`,).then((orders) => {
            this.setState({orders: orders.data.data})
        })
    }

    printOrder(order){
        const admin_col = this.props.admin ? <td>{order.user.name}<br/>{order.user.email}</td> :''
        const created_at = <td>{order.created_at}</td>
        const mobile_phone = <td>{order.mobile_phone}</td>
        const pizzas = <td>{order.pizzas.map((pizza) => pizza.name).join(', ')}</td>
        const amount = <td>${order.amount}</td>
        return <tr key={order.id}>{admin_col}{created_at}{mobile_phone}{pizzas}{amount}</tr>
    }

    render(){
        return(
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 heading-section ftco-animate text-center fadeInUp ftco-animated">
                            <h2 className="mb-4">Orders</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                {this.props.admin ? <th>User</th> : ''}
                                <th>Date</th>
                                <th>Provided Phone</th>
                                <th>Details</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody id="orders">
                            {this.state.orders.map((order) => this.printOrder(order))}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}