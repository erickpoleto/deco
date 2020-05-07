import React from 'react';
import {FaFacebook, FaInstagram} from 'react-icons/fa'
import './styles.css';

import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <div className='footer-container'>
            <footer>
                <section className="access-section">
                    <div>
                        <strong>Redes Sociais</strong>
                        <a href="%"><FaFacebook size={20} color="#1A65C7"/></a>
                        <a href="%"><FaInstagram size={20} color="#DE7FA6"/></a>
                    </div>
                    <div>
                        <strong>Portal</strong>
                        <Link to='/logindeco'>Deco</Link>
                    </div>
                </section>
                <section className="foot-section">
                    <p>© Copyright</p>
                </section>
            </footer>
        </div>
    )
    
}