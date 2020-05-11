import React, { Component } from 'react';

import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import ImageGallery from 'react-image-gallery';

import Facebook from '../../components/Facebook/index.js'

import api from '../../services/api'

import {history, useHistory} from 'react-router-dom'

import './styles.css'
import './css/dialog.css'

export default class Product extends Component {

    constructor(props){
        super(props);
    }

    state={
        product: {},
        image: [],
        comments: [],
        infoComments: {},
        comment: "",
        infoUser: {},
        page: 1
    }

    componentDidMount(){
        this.loadProduct();
        this.loadComments();
    }

    loadProduct = async() => {
        const { id } = this.props.match.params;
        const response = await api.get(`/product/${id}`)
        this.setState({product:response.data, 
            image: response.data.imageId.map(item=>{return {original: item.url, thumbnail: item.url}}),
        })
        console.info(this.state.comments)
    }

    loadComments = async(pageNumber=1) => {
        const { id } = this.props.match.params;
        const comments = await api.get(`/indexcomment/${id}?page=${pageNumber}`);
        const {docs, ...infoComments} = comments.data
        this.setState({comments: docs, infoComments, page:pageNumber});
    }

    prevPage = () => {
        const { page, infoComments} = this.state;
        if(infoComments.pages === 1 || infoComments.page === "1"){
            return;
        }
        const pageNumber = page - 1
        this.loadComments(pageNumber)
    }
    nextPage = () => {
        const { page, infoComments} = this.state;
        if (page === infoComments.pages) {
            return;
        }
        const pageNumber = page + 1
        this.loadComments(pageNumber);
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
            document.querySelector('.call-form').classList.remove('call-form--open')
            document.querySelector('.email-form').classList.remove('email-form--open')
            document.querySelector('.whats-form').classList.remove('whats-form--open')
            document.querySelector('.btn-exit-back').classList.remove('btn-exit-back--open')
            dialogList.classList.remove('consult-dialog-list--close')
        }
        
        if(e.target.id == 'call'){
            document.querySelector('.call-form').classList.add('call-form--open')
            document.querySelector('.btn-exit-back').classList.add('btn-exit-back--open')
        }
        if(e.target.id == 'whats'){
            document.querySelector('.whats-form').classList.add('whats-form--open')
            document.querySelector('.btn-exit-back').classList.add('btn-exit-back--open')
        }
        if(e.target.id == 'email'){
            document.querySelector('.email-form').classList.add('email-form--open')
            document.querySelector('.btn-exit-back').classList.add('btn-exit-back--open')
        }
    }

    changeDesc = (e) => {
        if(e.target.id == 'tec' && !e.target.classList.contains('active-desc')){
            document.querySelector('#desc').classList.remove('active-desc');
            document.querySelector('.p-desc').classList.remove('active-desc-p');
            document.querySelector('.p-tec').classList.add('active-desc-p');
            e.target.classList.add('active-desc');
        }
        if(e.target.id == 'desc' && !e.target.classList.contains('active-desc')){
            document.querySelector('#tec').classList.remove('active-desc');
            document.querySelector('.p-tec').classList.remove('active-desc-p');
            document.querySelector('.p-desc').classList.add('active-desc-p');
            e.target.classList.add('active-desc');
        }
    }

    updateUserState = (item) => {
        this.setState({infoUser:item})
    }

    submitCommentHandler = async(e) => {
        e.preventDefault();
        if(this.state.infoUser.email === undefined){
            alert("você precisa estar logado com facebook para comentar");
            return;
        }
        if(this.state.comment.length < 10){
            document.querySelector('.comment-empity-alert')
            .classList.add('comment-empity-alert--active')
            return;
        }
        const data = {
            username: this.state.infoUser.name,
            email: this.state.infoUser.email,
            comment: this.state.comment,
            picture: this.state.infoUser.picture,
            productId: this.state.product._id
        }
        try{
            const response = await api.post('/newcomment', data);
            alert("comentario enviado")
            window.location.reload()
        }catch(e){
            if(e.response.status === 405){
                alert('você só pode comentar 10 vezes neste produto')
            }
            else{
                console.info('algo deu errado')
            }
        }
    }

    removeComment = async(e) => {
        try{
            const reponse = await api.delete(`/deletecomment/${e.target.id}`)
            alert('comentario removido')
            window.location.reload()
        }catch(e){
            console.info(e)
        }
    }

    render(){
        const {product, image, comments, infoComments} = this.state;
        return(
            <div className='product-container'>
                <section onKeyUp={e=>{
                    if((e.keyCode==27) && 
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

                                <button className="btn-exit-back" id='back' onClick={this.openFormContact}></button>
                                <button className="btn-exit-dialog" onClick={this.openDialog}>X</button>

                                <div className='consult-dialog-list'>
                                    <h3 id="dialog-tittle">qual forma de contato você prefere?</h3>
                                    <ul>
                                        <li id='call' onClick={this.openFormContact}>Ligação</li>
                                        <li id='whats' onClick={this.openFormContact}>Whatsapp</li>
                                        <li id='email' onClick={this.openFormContact}>Email</li>
                                    </ul>
                                </div>
                                <form className="call-form">
                                    <h3>Ligação</h3>
                                    <label>Seu Nome</label>
                                    <input type='text' placeholder='seu nome' required></input>
                                    <label>Número</label>
                                    <span>
                                        <input type='text' placeholder="ddd" required></input>
                                        <input type='text' placeholder='seu numero' required></input>
                                    </span>
                                    <button>Enviar!</button>
                                </form>
                                <form className="whats-form">
                                    <h3>Whatsapp</h3>
                                    <label>Seu Nome</label>
                                    <input type='text' placeholder='seu nome' required></input>
                                    <label>Seu Número</label>
                                    <span>
                                        <input type='text' placeholder="ddd" required></input>
                                        <input type='text' placeholder='seu numero' required></input>
                                    </span>
                                    <button>Enviar!</button>
                                </form>
                                <form className="email-form">
                                    <h3>Email</h3>
                                    <label>Seu Nome</label>
                                    <input type='text' placeholder='seu nome' required></input>
                                    <label>Seu Email</label>
                                    <input type='text' placeholder='seu Email' required></input>
                                    <button>Enviar!</button>
                                </form>
                            </div>
                            <div className='consult-dialog-overlay'></div>
                        </div>
                        <nav>
                            <ul>
                                <li id='desc' className='active-desc' onClick={this.changeDesc}>descrição</li>
                                <li id='tec' onClick={this.changeDesc}>técnico</li>
                            </ul>
                        </nav>
                        <div className="desc-div">
                            <p className='p-desc active-desc-p'>{product.desc} lorem lore lorem lorem lorem lreom</p>
                            <p className='p-tec'>{product.tec}</p>
                        </div>
                    </div>
                </section>
                <section className="comments-section">
                    <div className="leavecomment-div">
                        <Facebook updateUserState={this.updateUserState}></Facebook>
                        <h4>Deixe um comentário</h4>
                        <span className="comment-empity-alert"><p>Para Enviar, a caixa precisa estar preenchida com pelo menos 10 caracteres</p></span>
                        <form onSubmit={this.submitCommentHandler} className="leavecomment-form">
                            <textarea onChange={e => this.setState({comment:e.target.value})} className='leavecomment-textarea'></textarea>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className="comments-div">
                        <h2>Comentários</h2>
                        <div className='commentsleaved-div'>
                            {comments.map(comment => {
                                return(
                                    <div className="usercomment-div">
                                    <div>
                                        <h5><img src={comment.picture}></img> {comment.username}</h5>
                                        <p>{comment.comment}</p>
                                    </div>
                                    {this.state.infoUser.email === comment.email && ( 
                                        <div>
                                            <button onClick={this.removeComment} id={comment._id}  className="button-comment"></button>
                                        </div>    
                                        
                                    )}
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className="actions">
                            <button disabled={this.state.page === 1} onClick={this.prevPage}><FaChevronLeft size={30}></FaChevronLeft></button>
                            <p>Página {this.state.page} de {infoComments.pages}</p>    
                            <button disabled={this.state.page === infoComments.pages} onClick={this.nextPage}><FaChevronRight size={30}></FaChevronRight></button>    
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}