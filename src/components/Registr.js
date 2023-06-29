import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Registr({
  registr,
  handleEditInfoTootipClick,
  handleErrorMassege,
  handleOKMassege,
}) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    registr(formValue)
      .then((data) => {
        handleOKMassege();
      })
      .catch((err) => {
        handleErrorMassege();
        console.error(err);
      })
      .finally(() => {
        handleEditInfoTootipClick();
      });
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="popup__content">
        <input
          className="login__input"
          placeholder="Email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
        ></input>
        <input
          className="login__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button type="submit" className="login__submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__span">
        Уже зарегестрированы?{" "}
        <NavLink className="login__link" to="/sign-in">
          Войти
        </NavLink>
      </p>
    </div>
  );
}
