import { Switch, Route } from 'wouter';
import Home from './pages/Home';
import Biography from './pages/Biography';
import Resources from './pages/Resources';
import NotFound from './pages/not-found';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/galiana-soler" component={Biography} />
      <Route path="/recursos" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
