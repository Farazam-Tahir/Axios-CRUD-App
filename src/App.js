import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Create from './Components/Create';
import Home from './Components/Home';
import Update from './Components/Update';
import Read from './Components/Read';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/create' Component={Create} />
          <Route path='/update/:id' Component={Update} />
          <Route path='/read/:id' Component={Read} />
        </Routes>
      </Router>

          </div>
  );
}

export default App;
