import { connect } from "react-redux";

const Footer = ({ rpi }) => {
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
      <p className={`rpi-logo ${rpi ? 'has-text-success' : 'has-text-danger'}`} >
        <i className='fab fa-raspberry-pi'></i>
      </p>
    </footer>
  )
};

const mapStateToProps = state => ({
  rpi: state.rpi
})

export default connect(mapStateToProps)(Footer);