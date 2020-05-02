import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

import api from '../../services/api'
import './styles.css'

export default class Product extends Component {
    state={
        product: {},
        image: [],
    }

    componentDidMount(){
        this.loadProduct();
    }
    
    loadProduct = async() => {
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`)

        this.setState({product:response.data, 
            image: response.data.idImage.map(item=>{return {original: item.url, thumbnail: item.url}})})
    }

    render(){
        const {product, image} = this.state
        console.info(image)
        return(
            <div className='product-container'>
                <section className="productinfo-section">
                    <div className="image-div">
                        <ImageGallery lazyLoad={true} items={image}/>
                    </div>
                    <div className="consult-info">
                        <h2>{product.name}</h2>
                        <span>
                            <strong>Quantidade</strong>
                            <select>
                                <option value='1'>1</option>
                                <option value='1'>2</option>
                                <option value='1'>3</option>
                                <option value='more'>outros</option>
                            </select>
                        </span>
                        <button>Solicitar Consultoria</button>
                        <nav>
                            <ul>
                                <li>descrição</li>
                                <li>tecnico</li>
                            </ul>
                        </nav>
                        <div className="desc-div">
                            <p>{product.desc} lorem lore lorem lorem lorem lreom</p>
                            <p style={{display:"none"}}>{product.tec}</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}