import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

import './styles.css'

export default class Facebook extends Component {
    
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    }

    componentDidMount(){
        
    }

    componentClicked = () =>{
        console.info('clicked')
    }
    
    responseFacebook = response => {
        if(response.status == 'unknown'){
            return;
        }else{
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url
            })
        }
    }
    
    render(){
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
                <div>    
                    <img src={this.state.picture}></img>
                    <strong style={{marginLeft: '10px'}}>olá, {this.state.name}</strong>  
                </div>
            )
        }else{
            fbContent = (
            <div>
                <FacebookLogin
                appId="351539589159014"
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            </div>)
        }
        
        return(
            <div className='facebook-container'>
                {fbContent}
            </div>
        )
    }
}