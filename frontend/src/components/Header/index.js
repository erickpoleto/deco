import React, { Component } from 'react';
import {FaEnvelope, FaChevronDown, FaWhatsapp} from 'react-icons/fa'
import './styles.css';

import {Link, useHistory} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'

import api from '../../services/api'

import pp from '../../imgs/Ativo3.png'
import projectImg from '../../imgs/project-management.png'
import shopImg from '../../imgs/commerce-and-shopping.png'

export default class Header extends Component {
    
    state = {
        cartItems: JSON.parse(localStorage.getItem("@cart-item") || "[]"),
        categories: [],
        search: ""
    }

    componentDidMount(){
        this.loadCategories()
    }

    loadCategories = async() => {
        const response = await api.get("/indexcategory")
        this.setState({categories: response.data})
    }

    handleSubmit = async(e)=> {
        e.preventDefault();
        this.props.history.push(`/moveis?search=${this.state.search}`)
    }

    handleModalHeader = (e)=> {
        const modal = document.querySelector(".modalheader");
        if(e.target.id === "openmodal-header"){
            modal.classList.add("modal--open")
            return;
        }
        document.activeElement.blur();
        modal.classList.remove("modal--open")
    }

    render(){
        const {cartItems, categories} = this.state
        return (
            <div>
                <div className='header-container'>
                    <header>
                            <div>
                                <nav>
                                    <Link><img src={projectImg} style={{width:"30px", height: "30px"}}></img></Link>
                                    <Link style={{color:"white"}}>envie sua idéia, nos fazemos!</Link>
                                </nav>
                                <nav className="contact-nav">
                                    <button id="openmodal-header" onClick={this.handleModalHeader}>Fale Conosco!</button>
                                    <a href='#'>telefone: (51)55555555</a>
                                    <a href='#'>whatsapp: (51)999811810</a>
                                </nav>
                            </div>
                        
                    </header>
                </div>
                <section className="menu-section">
                    <div className="header-menu-div">
                        <div className="menusearch-div">
                            <div>
                                <span><Link to="/"><img src={pp} style={{width:"160px", height:"90px", position:"relative", top:"10px"}}></img></Link></span>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input onChange={e=> this.setState({search: e.target.value})} placeholder="o que você procura?"></input>
                                <button id="searchicon" type="submit"></button>
                            </form>
                            <div className="cart-div">
                                <Link to="/cart"><img src={shopImg}></img></Link>
                                <Link href="/cart"><strong>carrinho ({cartItems.length})</strong></Link>
                                
                            </div>
                        </div>
                        <div className="menu-nav">
                            <Link id="home" to="/">Página principal</Link>
                            <div className="ferromadeiradrop-div dropdown-div">
                                <button>Móveis ferro e madeira <FaChevronDown size={12}/></button>
                                <div className="dropdowncontent-div">
                                    <Link to="/moveis">todos</Link>
                                    {categories.map(category => {
                                        return(
                                            <Link to={`/moveis?category=${category.name}`}>{category.name}</Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="servicos-div dropdown-div">
                                <button>Serviços <FaChevronDown size={12}/></button>
                                <div className="dropdowncontent-div">
                                    <Link>Link</Link>
                                    <Link>Link</Link>
                                    <Link>Link</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                    <div className="modalheader">
                        <div className="modalheadercontent-div">
                            <div className="modalheadertittle-div">
                                <h3>Fale Conosco</h3>
                                <button onClick={this.handleModalHeader}>x</button>
                            </div>
                            <div className="modalheadermain-div">
                                <form className="modalheader-form">
                                    <label>Nome <input placeholder="Nome" required></input></label>
                                    <label>E-mail <input placeholder="Email" required></input></label>
                                    <label>Telefone <input id="ddd" placeholder="ddd" required></input><input placeholder="xxxxxxxxx" required></input></label>
                                    <label>Mensagem <textarea placeholder="Mensagem(opcionial)"></textarea></label>
                                </form>
                                <div>
                                    <ul>
                                        <li>
                                            <strong>CNPJ</strong>
                                            <p>454545.85858</p>
                                        </li>
                                        <li>
                                            <strong>telefone</strong>
                                            <p>(51)55555555555</p>
                                        </li>
                                        <li>
                                            <strong>whatsapp</strong>
                                            <p>(51)44554455</p>
                                        </li>
                                        <li>
                                            <strong>Email</strong>
                                            <p>contato@taltal.com.br</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modalheaderfoot-div">
                                <button className="closemodal" onClick={this.handleModalHeader}>fechar</button>
                                <button onClick={e=>""}>Enviar</button>
                            </div>
                        </div>
                        <div onClick={this.handleModalHeader} className="modalheaderoverlay-div">
                        </div>
                    </div>
            </div>
        )
    }
    
}