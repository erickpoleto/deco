import React, {Component} from 'react'


import {Link} from 'react-router-dom'
import './styles.css'

export default class Categories extends Component{

    state = {
        categories: []
    }


    componentDidUpdate(prevProps){
        if(prevProps.value !== this.props.value){
            this.handleParentState()
        }
    }

    handleParentState = async() => {
        await this.setState({categories: this.props.value})
    }

    render(){
        const {categories} = this.state 
        return(
            <ul className="category-list">
                <li>categoria</li>
                {categories.map(category=>{
                    return(
                        <li>
                            <button id={category.name} onClick={this.props.handleCategory}>{category.name}</button>
                        </li>
                    )
                })}
                
            </ul>
        )
    }
}