import logo from '../images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';

function Header({
  isLoggedIn,
  onLogout,
  userEmail,
  onLoginClick,
  onRegistrationClick
}) {

  const location = useLocation();
 
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Mesto Russia" />

        {!isLoggedIn && (
          <nav className="header__nav">
            {location.pathname==='/sign-up' &&
              <NavLink className="header__link" to="/sign-in" onClick={onLoginClick}>Войти</NavLink>
            }
            {location.pathname==='/sign-in' &&
              <NavLink className="header__link" to="/sign-up" onClick={onRegistrationClick}>Регистрация</NavLink>
            }
          </nav>
        )}

        {isLoggedIn && (          
          <div className="header__profile">
            <address className="header__user-mail">{userEmail && userEmail}</address>
            <button className="header__button" onClick={onLogout}>Выйти</button>
          </div>
        )}
        
      </div>
    </header>
  );
}

export default Header;