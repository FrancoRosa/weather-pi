import Alerts from './Alerts';
import Clock from './Clock';
import CurrentConditions from './CurrentConditions';
import Forecast from './Forecast';
import Footer from './Footer';
import Tabs from './Tabs';

const App = () => {
  return (
    <div>
      <Clock />
      <Tabs />
      <CurrentConditions />
      <Forecast />
      <Alerts />
      <Footer />
    </div>
  );
}

export default App;
