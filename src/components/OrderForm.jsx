import React from 'react';
const axios= require('axios').default;

export default class Form extends React.Component {
    constructor(props){
        super(props)
        this.user = props.user;
        this.state = {
            result: '',
            classResult : 'hide'
        }
    }
    order(e){
        e.preventDefault();
        const self = this
        const token = document.getElementById('home').dataset.token;
        const data = `api_token=${token}&` + $('#orderForm').serialize();
        axios.post('/api/orders/', data).then(() => {
            self.setState({result: 'We have received your order', classResult:'bg-success text-white'})
        }).catch((error) => {
            self.setState({result: 'Something went wrong. I am sorry. Try again', classResult:'bg-danger text-white'})
        })
    }
    render(){
        const {user} = this.props
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-9">
                        <div className="col-md-4 contact-info ftco-animate fadeInUp ftco-animated">
                            <div className="row">
                                <div className="col-md-12 mb-4"><h2 className="h4">Your current order</h2></div>
                            </div>
                            {this.props.order.map((pizza) =>{
                                const order = pizza ? this.props.get.bind(this, pizza.id)() : null;
                                return (
                                    order ? 
                                    <div key={pizza.id} className="col-md-12 mb-3">
                                        <p><span>{order.quantity} {order.info.name}</span></p>
                                    </div> 
                                    : ''
                                )
                            })}    
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 ftco-animate fadeInUp ftco-animated">
                            <form action="" onSubmit={this.order.bind(this)} className="contact-form" id="orderForm">
                                <div className="form-group">
                                    <input type="text" name="name" defaultValue={user.name} className="form-control" placeholder="Name" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input required type="text" name="order[street_line1]" className="form-control" placeholder="Street line 1" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input required type="text" name="order[street_line2]" className="form-control" placeholder="Street line 2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input required type="text" name="order[zip_code]" className="form-control" placeholder="Zip code" />
                                </div>
                                <div className="form-group">
                                    <input required type="text" name="order[mobile_phone]" className="form-control" placeholder="Mobile phone" />
                                </div>
                                <div className="form-group">
                                    <input required type="submit" value="Order" className="btn btn-primary py-3 px-5" />
                                </div>

                                {this.props.order.map((pizza) => {
                                    const name = `pizzas[${pizza.id}]`;
                                    return <input key={pizza.id} type="hidden" name={name} value={pizza.quantity} />
                                })}
                            </form>
                            <div className={this.state.classResult}>
                                {this.state.result}
                            </div>
                        </div>
                    </div>
                </div>
            </section>            
        )
    }
}