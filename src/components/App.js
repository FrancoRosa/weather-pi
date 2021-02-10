import Alerts from './Alerts';
import Clock from './Clock';
import CurrentConditions from './CurrentConditions';
import Forecast from './Forecast';

const App = () => {
  return (
    <div className="App">
      <Clock />
      <CurrentConditions />
      <Forecast />
      <Alerts />
    </div>
  );
}

export default App;
