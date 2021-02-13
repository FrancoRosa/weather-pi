import Alerts from './Alerts';
import Clock from './Clock';
import CurrentConditions from './CurrentConditions';
import Forecast from './Forecast';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Clock />
      <CurrentConditions />
      <Forecast />
      <Alerts />
      <Footer />
    </div>
  );
}

export default App;
