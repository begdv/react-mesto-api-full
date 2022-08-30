import React from 'react';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');  

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin({
      email,
      password,
    });
  } 

  return (
    <section className="sign">
      <div className="sign__container">
        <form className="form login-form" name="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="form__title form__title_type_sign">Вход</h2>
          <input 
            type="text" 
            className="form__input form__input_type_sign form__input_field_login-email" 
            id="login-email"
            name="email" 
            placeholder="Email" 
            minLength="2" 
            maxLength="40" 
            required
           value={email}
            onChange={handleChangeEmail}
          />
          <span className="form__input-error  form__input-error_field_login-email"></span>
          <input 
            type="password" 
            className="form__input form__input_type_sign form__input_field_login-password" 
            id="login-password" 
            name="password" 
            placeholder="Пароль" 
            minLength="2" 
            maxLength="40" 
            required
            value={password}
            onChange={handleChangePassword}        
          />
          <span className="form__input-error  form__input-error_field_login-password"></span>
          <button className="form__button form__button_type_sign form__button-login" type='submit'>Войти</button>
        </form> 
      </div>       
    </section>
  )  
}  