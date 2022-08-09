function Footer() {
  
  const dateNow = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy;&nbsp;{dateNow.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;