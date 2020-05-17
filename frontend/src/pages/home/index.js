import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import {Link} from 'react-router-dom';


import api from "../../services/api";
import serrimg from '../../imgs/shutterstock-539932924.png'

import Products from '../../components/Products/index'
import Header from '../../components/Header/index'
import './styles.css'

export default class Home extends Component {

    state = {
        imagesCarousel: [],
        products: [],
        category: [],
        
    }

    componentDidMount() {
        this.loadProducts();
        this.loadImagesCarousel();
    }

    loadProducts = async () => {
        const response = await api.get(`/recentproducts`);
        const category = await api.get('/indexcategory');
        this.setState({products: response.data, category:category.data})
    }

    loadImagesCarousel = async() => {
        this.state.imagesCarousel.push(serrimg);
    }

  

    render(){
        
        const {products,imagesCarousel, category, productInfo, page} = this.state;
        return( 
            <div>
                <Header {...this.props}></Header>
                <div className="home-container">
                    
                    <header>
                        
                        <div className="carousel-div">
                            <Carousel>
                                {imagesCarousel.map(product=>{
                                    return(
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={product}
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>            
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                        })
                                    }
                            </Carousel>
                        </div>
                        <div className="divisa">

                        </div>
                        
                    </header>
                    <main>
                        <div className="main-div">
                            <ul className="category-list">
                                {category.map(item=>{
                                    return(
                                        <li><button onClick={e=>this.props.history.push(`/moveis?category=${item.name}`)}>{item.name}</button></li>
                                    )
                                })}
                                
                            </ul>
                            <div>
                                <h2 style={{fontSize: '26px', marginLeft:"10px"}}>Móveis Adicionados recentemente</h2>
                                <Products value={this.state.products}></Products>
                            </div>
                        </div>
                        
                    </main>  
                </div>
            </div>
        )
    }
}