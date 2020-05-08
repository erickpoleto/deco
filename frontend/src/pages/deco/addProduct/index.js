import React, { Component } from 'react';
import {uniqueId} from 'lodash';
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
        
        uploadedFiles: []
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

    handleSubmit = async() => {
        if(this.state.uploadedFiles.length < 3){
            alert("minimo de 3 imagens")
            return;
        }
        if(this.state.prodDesc.length < 10 || this.state.prodTec.length < 10){
            alert("minimo de 20 caracteres por descrição")
            return;
        }
        try{
            this.state.uploadedFiles.forEach( item =>{
                const data = new FormData();
                data.append('file', item.file, item.name);
                await api.post('/createImages', data)
                }
            )
        }catch(e){

        }
    }

    componentDidMount(){
        this.loadCategories()
    }

    loadCategories = async() => {
        const response = await api.get('/indexcategory');
        this.setState({categories:response.data})
    }

    render(){
        const {categories, newCategory, uploadedFiles} = this.state
        return(
            <div className='addproduct-container'>
               <HeaderDeco></HeaderDeco> 
               <main>
                   <h1>Adicionar Produto</h1>
                   <form className='form-addproduct'>
                        <input placeholder='nome do produto' required></input>
                        
                        <h2>Categoria</h2>
                        <div>
                            {categories.map(category =>{
                                return(
                                    <label>
                                        <input type='radio' value={category.name} 
                                            onChange={e=> this.setState({prodCategory: e.target.id})} 
                                            required>
                                        </input>
                                        {category.name}
                                    </label>
                                )
                            })
                            }
                        </div>
                        <span id="span-desc">minimo de 20 letras</span>
                        <textarea placeholder='Descrição'></textarea>
                        <span id="span-tec">minimo de 20 letras</span>
                        <textarea placeholder='Descrição técnica'></textarea>
                        <Upload onUpload={this.handleUpload}></Upload>
                        { !!uploadedFiles.length && (<FileList files={uploadedFiles}></FileList>)}
                        <button type="submit">Adicionar</button>                        
                   </form>
               </main>
            </div>
        )
    }
}