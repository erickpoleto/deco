import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import api from '../../services/api'
import Header from '../../components/Header'

import './styles.css'
import { FaChevronDown } from 'react-icons/fa'

export default class Moveis extends Component{

    state = {
        categories: [],
        products: [],
        productsInfo: {},
        search: this.props.location.search,
        sortOrd: 1
    }

    componentDidMount(){
        this.loadCategories()
        this.loadProducts()
    }

    async componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search != this.props.location.search){
            await this.setState({search: this.props.location.search})
            this.loadProducts()
        }
        if(prevState.sortOrd != this.state.sortOrd){
            await this.loadProducts()
        }
    }

    loadProducts = async() => {
        const data = {
            sortOrd : this.state.sortOrd
        }
        const response = await api.post(`/products${this.state.search}`, data)
        const {docs, productsInfo} = response.data
        this.setState({products: docs, productsInfo})
        
    }

    loadCategories = async() => {
        const response = await api.get("/indexcategory");
        this.setState({categories: response.data})
    }

    handleCategory = async(e)=> {
        await this.props.history.push(`/moveis?category=${e.target.id}`)
    }


    render(){
        
        const {categories, products, search} = this.state

        return(
            <div>
                <Header {...this.props}></Header>
                <div className="moveis-container">
                    <main>
                        <div className="pagemap-div">
                            <Link to="/"></Link>
                            <Link style={{marginLeft:"5px"}} to="/"> <b>></b> {search.replace(/[?](search|category)[=]/, "")}</Link>
                        </div>
                        <div className="main-div">
                            <ul className="category-list">
                                {categories.map(item=>{
                                    return(
                                        <li>
                                            <button id={item.name} onClick={this.handleCategory}>{item.name}</button>
                                        </li>
                                    )
                                })}
                                
                            </ul>
                            <div className="products-div">
                                <div className="orderby-div">
                                    <button>Escolher ordem <FaChevronDown size={14}/></button>
                                    <div className="orderby-drop-div">
                                        <button onClick={e=>this.setState({sortOrd: 1})} className="sortbutton">$ Menor preço</button>
                                        <button onClick={e=>{this.setState({sortOrd: -1})}} className="sortbutton">$ Maior preço</button>
                                    </div>
                                </div>
                                <h2>{search.replace(/[?](search|category)[=]/, "")}</h2>
                                <ul className="products-list">
                                {products.map(item => {
                                    return(
                                        <li key={item._id}>
                                            <strong>{item.name}</strong>
                                            <img src={item.imageId[0].url}></img>
                                            <strong>R$ {item.preco}</strong>
                                            <p style={{marginLeft:"5px"}}>até <b>3x</b> de <b>{Math.round(item.preco / 3)}</b></p>
                                            <Link to={`/product/${item._id}`}>
                                                <button>Consultar</button>
                                            </Link>
                                        </li>
                                    )})
                                    }
                                </ul>
                                
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}