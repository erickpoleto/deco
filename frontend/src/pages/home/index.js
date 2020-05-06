import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import {Link} from 'react-router-dom';


import api from "../../services/api";
import image from '../../imgs/pp.png'

import './styles.css'

export default class Home extends Component {

    state = {
        products: [],
        category: [],
        productInfo: {},
        page : 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const category = await api.get('/indexcategory');
        const {docs, ...productInfo} = response.data;
        this.setState({products: docs, category:category.data, productInfo, page:page})
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
        
        const {products, category, productInfo, page} = this.state;
        const comments = [
            {
                comment: "perfeito, melhor trabalho que ja recebi, empresa extremamente profissional",
                name: "erick"
            },
            {
                comment: "showshowshow",
                name: "rodrigo"
            }
        ]
        return( 
            <div className="home-container">
                <header>
                    <div className="header-div">
                        <div>
                            <span><img src={image} style={{width:"150px", height:"150px"}}></img></span>
                            <span><h1>D<b>E</b>C<b>O</b></h1>
                            <h2>Estruturas Metálicas</h2></span>
                        </div>
                        <div>
                            <p> Prestando serviços com 
                                qualidade, 
                                segurança e 
                                desempenho
                            </p>
                        </div>
                    </div>
                    <div className="comments-div">
                        <div>
                            <Carousel>
                                {comments.map(comment=>{
                                    return(
                                        <Carousel.Item>
                                            <Carousel.Caption>
                                                <p>{comment.comment}</p>
                                                <strong>{comment.name}</strong>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                    <ul>
                        <li><Link style={{color:"white"}} to="/">Home</Link></li>
                        <li><Link style={{color:"white"}} to="/works">Trabalhos</Link></li>
                        <li><Link style={{color:"white"}} to="/enterprise">Empresa</Link></li>
                    </ul>
                </header>
                <main>
                    <div className="main-div">
                        <ul className="category-list">
                            <strong>Categorias</strong>
                            {category.map(item=>{
                                return(
                                    <li><Link to="">{item.name}</Link></li>
                                )
                            })}
                        </ul>
                        <div className="products-div">
                            <ul className="products-list">
                            {products.map(item => {
                                return(
                                    <li key={item._id}>
                                        <strong>{item.name}</strong>
                                        
                                        <img src={item.imageId[0].url}></img>
                                        <Link to={`/product/${item._id}`}>
                                            <button>Consultar</button>
                                        </Link>
                                    </li>
                                )})
                                }
                            </ul>
                            <div className="actions">
                                <button disabled={page === 1} onClick={this.prevPage}><FaChevronLeft size={30}></FaChevronLeft></button>
                                <p>Página {page} de {productInfo.pages}</p>    
                                <button disabled={page === productInfo.pages} onClick={this.nextPage}><FaChevronRight size={30}></FaChevronRight></button>    
                            </div>
                        </div>  
                    </div>
                    
                </main>  
            </div>
        )
    }
}