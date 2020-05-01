import React from 'react';
import {FaEnvelope} from 'react-icons/fa'
import './styles.css';

import {Link, useHistory} from 'react-router-dom';
import pp from '../../imgs/pp.png'

export default function Header() {
    return (
        <div className='header-container'>
            <main>
                <Link to='/'><img src={pp} style={{width:"70px", height:"70px", marginLeft:"10px"}}></img></Link>
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
            </main>
        </div>
    )
    
}