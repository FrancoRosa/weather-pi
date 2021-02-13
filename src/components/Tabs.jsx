import { connect } from "react-redux";
import { setTab } from "../actions";

const Tabs = ({setTab}) => {
  const activateTab = event => {
    deactivateTabs();
    const element = event.target.tagName == 'A' ? event.target : event.target.parentElement;
    const tabName = element.id.split('_')[1];
    setTab(tabName);
    element.parentElement.classList.add('is-active');
  };

  const deactivateTabs = () => {
    const activeTabs = document.querySelectorAll('.is-active');
    activeTabs.forEach(tab => {
      tab.classList.remove('is-active');
    })
  }

  return (
    <div className="tabs is-centered is-boxed">
      <ul>
        <li className="is-active">
          <a onClick={activateTab} id="tab_now">
            <i className="fas fa-clock tab-icon"></i>
            <span className="tab-name">Now</span>
          </a>
        </li>
        <li>
          <a onClick={activateTab} id="tab_forecast">
            <i className="fas fa-calendar-times tab-icon"></i>
            <span className="tab-name">Forecast</span>
          </a>
        </li>
        <li>
          <a onClick={activateTab} id="tab_alert">
            <i className="fas fa-exclamation-triangle tab-icon"></i>
            <span className="tab-name">Alerts</span>
          </a>
        </li>
        <li>
          <a onClick={activateTab} id="tab_location">
            <i className="fas fa-map-marker-alt tab-icon"></i>
            <span className="tab-name">Location</span>
          </a>
        </li>
      </ul>
    </div>
  )
};
const mapDispatchToProps = dispatch => ({
  setTab: tab => dispatch(setTab(tab))
})

export default connect(null, mapDispatchToProps)(Tabs);
