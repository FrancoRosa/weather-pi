const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Weather alerts</strong>{' by '} 
            <a href="https://www.traegergrills.com/" target="_blank"><i class="fas fa-microchip footer-icon"></i>Mitch</a>{' & '}
            <a href="https://github.com/francorosa" target="_blank"><i class="fab fa-github footer-icon"></i>Franco</a>.
          </p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;