import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Portal from './components/UserPortal/Portal'
import LoginLanding from "./components/UserLogin/LoginLanding"


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Portal" component={Portal} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Login" component={LoginLanding} />
        <Route component={NotFound}/>
      </Switch>

    </div>
  );
}

export default App;
