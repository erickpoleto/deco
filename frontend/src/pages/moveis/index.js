import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import api from '../../services/api'
import Header from '../../components/Header'

import './styles.css'

export default class Moveis extends Component{

    state = {
        categories: [],
        products: [],
        productsInfo: {},
        search: this.props.location.search
    }

    componentDidMount(){
        this.loadCategories()
        this.loadProducts()
    }

    async componentDidUpdate(prevProps){
        if(prevProps.location.search != this.props.location.search){
            await this.setState({search: this.props.location.search})
            this.loadProducts()
        }
    }

    loadProducts = async() => {
        const response = await api.get(`/products${this.state.search}`)
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
                                <h2>{search.replace(/[?](search|category)[=]/, "")}</h2>
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
                                
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}