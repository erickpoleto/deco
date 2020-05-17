import React, {Component} from 'react'


import {Link} from 'react-router-dom'
import './styles.css'

export default class Products extends Component{

    state = {
        products: []
    }


    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value){
            this.handleParentState()
        }
    }

    handleParentState = async() => {
        await this.setState({products: this.props.value})
    }

    render(){
        const {products} = this.state 
        return(
            <div className="products-div">
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
        )
    }
}