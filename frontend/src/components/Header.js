import { Routes, Route, useLocation, Link } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

export default function Header(props) {
  const {isLoggedIn, email} = props;
  const location = useLocation();
  return (
    <header className="header page__header"> 
      <a className="header__logo" href="#" title="Сервис Mesto"></a>
      <Routes>
        <Route 
          index
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <span className="header__info">{email}</span>
              <Link onClick={() => props.onSignOut()} className="header__link" to="/signin">Выйти</Link>
            </ProtectedRoute>
          }
        />
          <Route 
            path="signin"
            element={
              <Link className="header__link" to="/signup">Регистрация</Link>
            } 
          />
          <Route 
            path="signup"
            element={
              <Link className="header__link" to="/signin">Войти</Link>
            } 
          />         
      </Routes>    
    </header> 
  );
}  