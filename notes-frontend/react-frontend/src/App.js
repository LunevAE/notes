import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListNotesComponent from './components/ListNotesComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateNoteComponent from './components/CreateNoteComponent';
import ViewNoteComponent from './components/ViewNoteComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path = "/" exact component= {ListNotesComponent}></Route>
              <Route path = "/notes" component= {ListNotesComponent}></Route>
              <Route path = "/add-note/:id" component= {CreateNoteComponent}></Route>
              <Route path = "/view-note/:id" component= {ViewNoteComponent}></Route>
            </Switch>
          </div>
        <FooterComponent />
      </Router>

    </div>
  );
}

export default App;
