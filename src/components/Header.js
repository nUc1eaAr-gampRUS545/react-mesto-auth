function Header({element,flag,userData}) {
  
  return (
    <header className="header">
      <div className="header__logo"></div>
      {flag ? element : <div className="header__container"> <p className='header__link'>{userData.data.email} </p> {element}</div>}
    </header>
  );
}
export default Header;
