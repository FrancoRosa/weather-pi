const LocationValue = ({ heading, value, truncate }) => (
  <div class="level-item has-text-centered">
    <div>
      <p class="heading has-text-link">{heading}</p>
      <p class={`title ${truncate && "truncate"}`}>{value}</p>
    </div>
  </div>
)

export default LocationValue;