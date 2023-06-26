import React  from "react";
import {useNavigate} from 'react-router-dom';
export default function Login({authorization,handleLogged,handleEditInfoTootipClick,isLoggetIn}){
    const navigate=useNavigate()
    const [formValue,setFormValue]=React.useState({
        email:'',
        password:''
    });
    const handleChange=(evt)=>{
        const {name,value}=evt.target;
        setFormValue({...formValue,
            [name]:value
        })
    }
    const handleSubmit=(evt)=>{
        evt.preventDefault();
        authorization(formValue).then((data)=>{
            handleLogged();
            navigate('/mesto-auth')
            console.log(data)}).catch((err)=>{
                handleEditInfoTootipClick();
                console.error(err)});
       
    }
    return(
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form onSubmit={handleSubmit} className="popup__content">
            <input className="login__input" placeholder="Email"  name="email" type="email"  value={formValue.email} onChange={handleChange}></input>
            <input className="login__input" placeholder="Пароль" name="password" type="password" value={formValue.password} onChange={handleChange}></input>
            <button type="submit" className="login__submit" >Войти</button></form>
        </div>
    )
}