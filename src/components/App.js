import Alerts from './Alerts';
import Clock from './Clock';
import CurrentConditions from './CurrentConditions';
import Forecast from './Forecast';

const App = () => {
  return (
    <div>
      <Clock />
      <CurrentConditions />
      <Forecast />
      <Alerts />
    </div>
  );
}

export default App;
