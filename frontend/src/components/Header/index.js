import React from 'react';
import {FaEnvelope, FaWhatsapp} from 'react-icons/fa'
import './styles.css';

import {Link, useHistory} from 'react-router-dom';

import pp from '../../imgs/Ativo3.png'
import projectImg from '../../imgs/project-management.png'
import shopImg from '../../imgs/commerce-and-shopping.png'

export default function Header() {
    return (
        <div>
        <div className='header-container'>
            <header>
                    <div>
                        <nav className="site-nav">
                            <Link></Link>
                            <Link></Link>
                            <Link></Link>
                        </nav>
                        <nav>
                            <Link><img src={projectImg} style={{width:"30px", height: "30px"}}></img></Link>
                            <Link style={{color:"white"}}>envie sua idéia, nos fazemos!</Link>
                        </nav>
                        <nav className="contact-nav">
                            <button>Fale Conosco!</button>
                            <a href='#'>telefone: (51)55555555</a>
                            <a href='#'>whatsapp: (51)999811810</a>
                        </nav>
                    </div>
                
            </header>
        </div>
            <div className="header-div">
                <div>
                    <span><Link to="/"><img src={pp} style={{width:"130px", height:"130px"}}></img></Link></span>
                </div>
                <form>
                    <input placeholder="digite o que você procura..."></input>
                </form>
                <div className="cart-div">
                    <Link to="/cart"><img src={shopImg}></img></Link>
                    <Link href="/cart"><strong> carrinho</strong></Link>
                </div>
            </div>
        </div>
    )
    
}