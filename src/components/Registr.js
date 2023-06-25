import React  from "react";

import { NavLink,useNavigate } from 'react-router-dom';

export default function Registr({registr,handleEditInfoTootipClick,handleErrorMassege}){
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
        registr(formValue)
        .then((data)=>{
            handleEditInfoTootipClick();
            //navigate('/sign-in');
            })
        .catch((err)=>{
            handleEditInfoTootipClick();
            handleErrorMassege();
            console.error(err);})

    }

    return(
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <input className="login__input" placeholder="Email"  name="email" type="email" value={formValue.email} onChange={handleChange}></input>
            <input className="login__input" placeholder="Пароль" name="password" type="password" value={formValue.password} onChange={handleChange}></input>
            <button type="submit" className="login__submit"  onClick={handleSubmit}>Зарегистрироваться</button>
            <p className="login__span">Уже зарегестрированы? <NavLink className="login__link"   to='/sign-in'>Войти</NavLink></p>
        </div>
    )
}