const Tabs = () => {
  return (
    <div class="tabs is-centered is-boxed">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon is-small"><i class="fa fa-image"></i></span>
            <span>Pictures</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-music"></i></span>
            <span>Music</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-film"></i></span>
            <span>Videos</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-file-alt"></i></span>
            <span>Documents</span>
          </a>
        </li>
      </ul>
    </div>
  )
};

export default Tabs;
