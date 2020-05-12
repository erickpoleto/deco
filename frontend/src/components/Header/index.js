import React from 'react';
import {FaEnvelope} from 'react-icons/fa'
import './styles.css';

import {Link, useHistory} from 'react-router-dom';
import pp from '../../imgs/pp.png'

export default function Header() {
    return (
        <div>
        <div className='header-container'>
            <header>
                    <div>
                        <nav>
                            <strong><Link style={{textDecoration:"none", color:"white"}} to='/'>Home</Link></strong>
                            <strong><Link style={{textDecoration:"none", color:"white"}} to='/works'>Trabalhos</Link></strong>
                            <strong><Link style={{textDecoration:"none", color:"white"}} to='/enterprise'>Empresa</Link></strong>
                        </nav>
                        <nav>
                            <span><FaEnvelope color={"white"} size={20}></FaEnvelope><Link to='/'>email</Link></span>
                            <span><FaEnvelope color={"white"} size={20}></FaEnvelope><a href='#'>(51)999811810</a></span>
                        </nav>
                    </div>
                
            </header>
        </div>
            <div className="header-div">
                <div>
                    <span><img src={pp} style={{width:"100px", height:"100px"}}></img></span>
                    <span><h1>D<b>E</b>C<b>O</b></h1>
                    <h2>Estruturas Metálicas e Móveis rústicos</h2></span>
                </div>
                <form>
                    <input placeholder="pesquise por produtos"></input>
                </form>
            </div>
        </div>
    )
    
}