import React, { Component } from 'react';
import api from "../../services/api";

import {Link, useHistory} from 'react-router-dom';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page : 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;
        this.setState({products: docs, productInfo, page:page})

        console.info(this.state.products)
    }

    prevPage = () => {
        const { page, productInfo} = this.state;
        if(productInfo.pages === 1 || productInfo.page === "1"){
            return;
        }
        const pageNumber = page - 1
        this.loadProducts(pageNumber)
    }
    nextPage = () => {
        const { page, productInfo} = this.state;
        if (page === productInfo.pages) {
            return;
        }
        const pageNumber = page + 1
        this.loadProducts(pageNumber);
    }

    render(){
        
        const {products, productInfo, page} = this.state;
        return( 
            <div className="main-container">
                <ul>
                    {products.map(item => {
                        return(
                            <li key={item._id}>
                                <strong>{item.name}</strong>
                                <img src={item.idImage.url} style={{width:"400px", height:"400px"}}></img>
                                <Link to={`/product/${item._id}`}>product</Link>
                            </li>
                        )})
                        }
                </ul>  
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    {<p></p>}    
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>próximo</button>    
                </div>  
            </div>
        )
    }
}