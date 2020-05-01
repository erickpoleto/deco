import React, { Component } from 'react';

import api from '../../services/api'
import './styles.css'

export default class Product extends Component {
    state={
        product: {},
        image: {},
    }

    componentDidMount(){
        this.loadProduct();
    }
    
    loadProduct = async() => {
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`)

        this.setState({product:response.data, image: response.data.idImage[0]})
        console.info(this.state.product, this.state.image)
    }

    render(){
        const {product, image} = this.state
        return(
            <div className={'product-container'}>
                <section>
                    <img src={image.url} style={{width:400, height: 400}}></img>
                    <h2>{product.name}</h2>
                </section>
            </div>
        )
    }
}