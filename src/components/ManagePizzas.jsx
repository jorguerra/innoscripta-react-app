import React from 'react';
import Config from './../Config'
const axios = require('axios').default

export default class ManagePizza extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pizzas: [],
            pizza: null
        }
        this.token = document.getElementById('home').dataset.token
    }
    componentDidMount(){
        axios.get(`/api/pizzas?apit_token=${this.token}`).then((resp) => this.setState({pizzas: resp.data.data}))
    }
    addPizza(e){
        e.preventDefault();
        const query = `api_token=${this.token}&` + $('#pizza-form').serialize();
        let pizzas = this.state.pizzas;
         axios.post(`/api/pizzas?${query}`).then((pizza) => {
            pizzas.push(pizza.data);
        })
        e.target.reset();
        this.setState({pizzas: pizzas})

    }

    setPizza(pizza){
        this.setState({pizza: pizza})
    }
    updatePizza(pizza){
        let pizzas = this.state.pizzas
        if(pizzas.filter((p) => p.id == pizza.id).length){
            pizzas = pizzas.map((p) => p.id != pizza.id ? p : pizza)
        }
        else{
            pizzas.push(pizza)
        }
        this.setState({pizzas: pizzas})
    }

    form()
    {
        const pizza = this.state.pizza
        const url = Config.api_url + (pizza ? `/pizzas/${pizza.id}` : '/pizzas');
        const method = pizza ? 'update' : 'post';
        const options = {url: url, method: method, api_token: this.token};
        return <form action="" onSubmit={(e) => { e.preventDefault(); axios(options).then((pizza) => this.updatePizza(pizza))}}  className="contact-form" id="pizza-form"><div className="row">
            <div className="form-group col-md-3 ">
                <input type="text" name="pizza[name]" defaultValue={pizza ? pizza.name : null} className="form-control" placeholder="Name" />
            </div>
            <div className="form-group col-md-7 ">
                <input required type="text" name="pizza[description]" defaultValue={pizza ? pizza.description : null} className="form-control" placeholder="Description" />
            </div>
            <div className="form-group col-md-1 ">
                <input required type="number" min="5" step="0.01" name="pizza[price]" defaultValue={pizza ? pizza.price : null} className="form-control" placeholder="Price" />
            </div>
            <div className=" col-md-1 ">
                <input style={{bottom: '19px', position: 'absolute'}} type="submit" value={pizza ? 'Update' : 'Add new'} className="btn btn-primary btn-sm" />
            </div>
        </div></form>
    }
    
    render(){
        const {pizzas} = this.state
        $('#formContainter').html(this.form())
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-9">
                        <button className="btn btn-primary" onClick={this.setPizza.bind(this, null)}>Add new</button>
                        <div className="col-md-12 ftco-animate fadeInUp ftco-animated" id="formContainer">
                            {this.form()}
                        </div>
                    </div>
                    <div className="row" style={{borderBottom: '1px solid white'}}>
                        <div className="col-md-1"><strong>Id</strong></div>
                        <div className="col-md-2"><strong>Name</strong></div>
                        <div className="col-md-7"><strong>Description</strong></div>
                        <div className="col-md-1"><strong>Price</strong></div>
                    </div>
                    {pizzas.map((pizza, index) =>
                        <div key={index} className="row">
                            <div className="col-md-1">{pizza.id}</div>
                            <div className="col-md-2">{pizza.name}</div>
                            <div className="col-md-7">{pizza.description}</div>
                            <div className="col-md-1">${pizza.price}</div>
                            <div className="col-md-1"><button className="btn btn-primary" onClick={this.setPizza.bind(this,pizza)}>Update</button></div>
                        </div>
                    )}
                </div>
            </section>  
        )
    }
}