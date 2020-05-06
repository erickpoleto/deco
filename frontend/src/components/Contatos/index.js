import React from 'react'

import './styles.css'
import {FaHeadset, FaWhatsapp, FaEnvelope} from 'react-icons/fa'

import {Link} from 'react-router-dom'

export default function Contatos(){

    const openContatos = () => {
        const contatosDiv = document.querySelector('.contatos')
        if(contatosDiv.classList.contains('contatos--open')){
            contatosDiv.classList.remove('contatos--open')
        }else{
            contatosDiv.classList.add('contatos--open')
        }
    }

    return(
        <div className="contatos-container">
            <div className='contatos-div'>
                <div className='contatos'>
                    <strong>contatos</strong>
                    <span>
                        <p>whatsapp</p>
                        <p><Link style={{color:'white'}}><FaWhatsapp></FaWhatsapp></Link></p>
                    </span>
                    <span>
                        <p>Ligue</p>
                        <p><Link>51999811810</Link></p>
                    </span>
                    <form>
                        <strong><FaEnvelope color="#0e6ae2" size={25}></FaEnvelope></strong>
                        <input  type='text' placeholder="seu nome"></input>
                        <input type="text" placeholder="seu numero"></input>
                        <textarea placeholder="sua mensagem"></textarea>
                    </form>
                </div>
                <button onClick={openContatos}><FaHeadset size={30}></FaHeadset>contatos</button>
            </div>
        </div>
    )

}