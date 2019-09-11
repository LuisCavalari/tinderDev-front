import React,{ useState } from 'react';
import logo from '../assets/logo.svg';
import api from '../services/api'
import './Login.css';


export default function Login({history}) {
    const [username,setUsername] = useState('');

     async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/dev',{
            username
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <form className="login-form"
            onSubmit = {handleSubmit}
            >
                <img src={logo} className="login-logo" alt="Logo tindev" />
                <input 
                value = {username}
                onChange = {e => setUsername(e.target.value)}
                
                type="text" 
                className="login-input" 
                placeholder="Digite o usuario do github" 
                />
                <button className="login-submit" type="submit" >Entrar</button>
            </form>

        </div>
    );
}