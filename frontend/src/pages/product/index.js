import React, { Component } from 'react';

import api from '../../services/api'
import './styles.css'

export default class Product extends Component {
    state={
        product: {},
    }

    componentDidMount(){
        this.loadProduct();
    }
    
    loadProduct = async() => {
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`)

        this.setState({product:response.data})
        console.info(this.state.product)
    }

    render(){
        const {product} = this.state
        return(
            <div className={'product-container'}>
                <section>
                </section>
            </div>
        )
    }
}