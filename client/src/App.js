import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Favorites from './views/Favorites';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
