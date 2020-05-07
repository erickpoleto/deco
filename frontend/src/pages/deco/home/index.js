import React, { Component } from 'react'

import api from '../../../services/api'
import image from '../../../imgs/pp.png'

import {Link} from 'react-router-dom'
import './styles.css'

export default class DecoHome extends Component {

    state = {
        products: [],
        productInfo: {}
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async() => {
        const response = await api.get('/products')
        const {docs, ...productInfo} = response.data
        this.setState({products: docs, productInfo})
    }

    render(){
        const {products} = this.state
        return(
            <div className="decohome-container">
                <header>
                        <div>
                            <span><img src={image} style={{width:"150px", height:"150px"}}></img></span>
                            <span><h1>D<b>E</b>C<b>O</b></h1>
                            <h2>Estruturas Metálicas</h2></span>
                        </div>
                        <ul>
                            <li><Link style={{color:"white"}} to="">adicionar produtos</Link></li>
                            <li><Link style={{color:"white"}} to="">adicionar servicos</Link></li>
                            <li><Link style={{color:"white"}} to="">sair</Link></li>
                        </ul>
                </header>
                <main>
                    <div className="products-div">
                        <ul>
                            <li id='li-btn-add'><button id='btn-add'></button></li>
                            {products.map(item => {
                                return(
                                    <li>
                                        <p>id: {item._id}</p>
                                        <p>{item.name}</p>
                                        <img src={item.imageId[0].url}></img>
                                        <button id='btn-remove'>remover</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </main>
            </div>
        )
    }
}