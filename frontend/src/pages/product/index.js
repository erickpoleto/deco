import React, { Component } from 'react';
import {FaChevronLeft} from 'react-icons/fa'
import ImageGallery from 'react-image-gallery';

import api from '../../services/api'
import './css/styles.css'
import './css/dialog.css'

export default class Product extends Component {
    state={
        product: {},
        image: [],
    }

    componentDidMount(){
        this.loadProduct();
    }
    
    loadProduct = async() => {
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`)

        this.setState({product:response.data, 
            image: response.data.idImage.map(item=>{return {original: item.url, thumbnail: item.url}})})
    }

    openDialog = (e) => {
        const dialog = document.querySelector('.consult-dialog')
        
        if(e.target.value == 'Solicitar'){
            dialog.classList.add('consult-dialog--open')
        }else{
            dialog.classList.remove('consult-dialog--open')
        }
    }

    openFormContact = (e) => {
        const dialogList = document.querySelector('.consult-dialog-list');
        dialogList.classList.add('consult-dialog-list--close')
        if(e.target.id == 'back'){
            document.querySelector('.consult-dialog-body form').classList.remove('call-form--open');
            dialogList.classList.remove('consult-dialog-list--close')
        }
        if(e.target.id == 'call'){
            document.querySelector('.call-form').classList.add('call-form--open')
        }
    }

    render(){
        const {product, image} = this.state
        console.info(image)
        return(
            <div className='product-container'>
                <section onKeyUp={e=>{
                    if(e.keyCode==27 && 
                        document.querySelector('.consult-dialog').classList.contains('consult-dialog--open')){
                    document.querySelector('.consult-dialog').classList.remove('consult-dialog--open');
                }}} className="productinfo-section">
                    <div className="image-div">
                        <ImageGallery lazyLoad={true} items={image}/>
                    </div>
                    <div className="consult-info">
                        <h2>{product.name}</h2>
                        <span>
                            <strong>Quantidade</strong>
                            <select>
                                <option value='1'>1</option>
                                <option value='1'>2</option>
                                <option value='1'>3</option>
                                <option value='more'>outros</option>
                            </select>
                        </span>
                        <button className="btn-sol-consult" onClick={this.openDialog} value="Solicitar">Solicitar Consultoria</button>
                        <div className='consult-dialog' role='dialog' aria-labelledby="dialog-tittle">
                            <div className='consult-dialog-body'>
                                <button className="btn-exit-back" id='back' onClick={this.openFormContact}>--</button>
                                <button className="btn-exit-dialog" onClick={this.openDialog}>X</button>
                                <div className='consult-dialog-list'>
                                    <h3 id="dialog-tittle">qual forma de contato você prefere?</h3>
                                    <ul>
                                        <li id='call' onClick={this.openFormContact}>Ligação</li>
                                        <li>Whatsapp</li>
                                        <li>Email</li>
                                    </ul>
                                </div>
                                <form className="call-form">
                                    <h3>Ligação</h3>
                                    <label>Nome</label>
                                    <input type='text' placeholder='seu nome'></input>
                                    <label>Número</label>
                                    <span>
                                        <input type='text' placeholder="ddd"></input>
                                        <input type='text' placeholder='seu numero'></input>
                                    </span>
                                    <button>Enviar!</button>
                                </form>
                            </div>
                            <div className='consult-dialog-overlay'></div>
                        </div>
                        <nav>
                            <ul>
                                <li>descrição</li>
                                <li>tecnico</li>
                            </ul>
                        </nav>
                        <div className="desc-div">
                            <p>{product.desc} lorem lore lorem lorem lorem lreom</p>
                            <p style={{display:"none"}}>{product.tec}</p>
                        </div>
                    </div>
                </section>
                <section className="comments-section">

                </section>
            </div>
        )
    }
}