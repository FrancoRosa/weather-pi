const Tabs = () => {
  return (
    <div class="tabs is-centered is-boxed">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon is-small tab-icon"><i class="fas fa-clock"></i></span>
            <span className="tab-name">Now</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small tab-icon"><i class="fas fa-calendar-times"></i></span>
            <span className="tab-name">Forecast</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small tab-icon"><i class="fas fa-exclamation-triangle"></i></span>
            <span className="tab-name">Alerts</span>
          </a>
        </li>
      </ul>
    </div>
  )
};

export default Tabs;
