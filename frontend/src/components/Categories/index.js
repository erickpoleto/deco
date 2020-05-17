import React, {Component} from 'react'


import {Link} from 'react-router-dom'
import './styles.css'

export default class Categories extends Component{

    state = {
        categories: [],
        structCat: []
    }


    componentDidUpdate(prevProps){
        if(prevProps.structCategories !== this.props.structCategories){
            this.handleParentState()
        }
    }

    handleParentState = async() => {
        await this.setState({categories: this.props.categories, structCat: this.props.structCategories})

    }

    render(){
        const {categories, structCat} = this.state 
        return(
            <div className="category-div">
                <ul className="category-list">
                    <li><b>Moveis Ferro e madeira</b></li>
                    {categories.map(category=>{
                        return(
                            <li>
                                <button id={category.name} onClick={this.props.handleCategory}>{category.name}</button>
                            </li>
                        )
                    })}
                    
                </ul>
                <ul className="category-list">
                    <li><b>Estruturas Metálicas</b></li>
                    {structCat.map(category=>{
                        return(
                            <li>
                                <button id={category.name} onClick={this.props.handleCategory}>{category.name}</button>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}