import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize'

import api from '../../../services/api'
import HeaderDeco from '../../../components/Headerdeco'

import Upload from '../components/Upload'
import {FileList} from '../components/FileList/index.js'

import "./styles.css";

export default class addProduct extends Component {

    state ={
        prodName: "",
        prodCategory : '',
        prodDesc: "",
        prodTec: "",

        categories: [],
        
        uploadedFiles: [],
        filesId: []
    }

    componentDidMount(){
        this.loadCategories()
    }

    loadCategories = async() => {
        const response = await api.get('/indexcategory');
        this.setState({categories:response.data})
    }

    handleImageError = () => {
        var error = false;
        var uploadedError = false
        this.state.uploadedFiles(file => {
            if(file.error === true){
                return error = true;
            }    
            if(file.uploaded === false){
                return uploadedError = true
            }    
        })
    }

    handleSubmit = async(e) => {

        e.preventDefault();
        if(this.state.uploadedFiles.length < 2){
            alert("minimo de 2 imagens")
            return;
        }
        
        if(this.state.prodDesc.length < 10 || this.state.prodTec.length < 10){
            alert("minimo de 20 caracteres por descrição")
            return;
        }
        if(this.state.prodCategory < 1){
            alert('categoria obrigatória');
            return;
        }
        try{
            
            await this.processUpload();

            const data = {
                name: this.state.prodName,
                category: this.state.prodCategory,
                desc: this.state.prodDesc,
                tec: this.state.prodTec,
                imageId: this.state.filesId
            }
            const response = await api.post('/newproduct', data)
            alert('itens enviados')
            this.setState({prodName:"", prodCategory:"", prodDesc:"", prodTec:"", filesId:[], uploadedFiles:[]});

        }catch(e){
            console.info(e)
            alert('algo deu errado')
        }
    }

    handleUpload = files => {
        const uploadedFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }))

        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });
    }

    updateFile = (id, data) => {
        this.setState({uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data} : uploadedFile;
        })})
    }

    processUpload = async() => {
        for(const uploadedFile of this.state.uploadedFiles){
            const data = new FormData();
            data.append("file", uploadedFile.file, uploadedFile.name);
            await api.post('/createimages', data, {
                onUploadProgress: e => {
                    const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                    this.updateFile(uploadedFile.id, {
                        progress,
                    })
                }
            }).then((response)=>{
                this.state.filesId.push(response.data.image._id)
                this.updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data.image._id,
                    url: response.data.image.url
                })
            }).catch(()=>{
                this.updateFile(uploadedFile.id, {
                    error: true
                })
            });
        }
    }

    render(){
        const {categories, newCategory, uploadedFiles} = this.state
        return(
            <div className='addproduct-container'>
               <HeaderDeco></HeaderDeco> 
               <main onbeforeunload={e => "lost"}>
                   <h1>Adicionar Produto</h1>
                   <form onSubmit={this.handleSubmit} className='form-addproduct'>
                        <input placeholder='nome do produto' value={this.state.prodName} onChange={e=>this.setState({prodName: e.target.value})} required></input>
                        <h2>Categoria</h2>
                        <div>
                            {categories.map(category =>{
                                return(
                                    <label>
                                        <input name='category' type='radio' value={category.name} 
                                            onChange={e=> this.setState({prodCategory: e.target.value})} 
                                            required>
                                        </input>
                                        {category.name}
                                    </label>
                                )
                            })
                            }
                        </div>
                        <textarea placeholder='Descrição' value={this.state.prodDesc} onChange={e=>this.setState({prodDesc: e.target.value})}></textarea>
                        <textarea placeholder='Descrição técnica' value={this.state.prodTec} onChange={e=>this.setState({prodTec: e.target.value})}></textarea>
                        <Upload onUpload={this.handleUpload}></Upload>
                        { !!uploadedFiles.length && (<FileList files={uploadedFiles}></FileList>)}
                        <button type="submit">Adicionar</button>                        
                   </form>
               </main>
            </div>
        )
    }
}