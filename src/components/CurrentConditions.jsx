const CurrentConditions = () => {
  return (
    <div className="weather__container">
      <h1>Current Conditions:</h1>
      <table className="weather__table">
        <tbody>
          <tr><th>Temperature:</th><td>8F</td></tr>
          <tr><th>Condition:</th><td>Sunny</td></tr>
          <tr><th>Humidity:</th><td>48%</td></tr>
          <tr><th>WindSpeed:</th><td>48%</td></tr>
          <tr><th>Barometer:</th><td>48%</td></tr>
          <tr><th>Dewpoint:</th><td>48%</td></tr>
          <tr><th>Visibility:</th><td>48%</td></tr>
          <tr><th>WindChill:</th><td>48%</td></tr>
        </tbody>
      </table>
      <h3>Forecast:</h3>
      <p>Mostly sunny and cold, with a high near -5. Wind chill values as low as -31. West wind 5 to 10 mph</p>
      <h3>LastUpdate:</h3>
      <p>M7 Feb 11:35 am CST</p>
    </div>
  );
}

export default CurrentConditions;
