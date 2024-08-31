import { render } from '@wordpress/element';
import { HelloWorld, Counter, NotFound } from './Apps';

const apps = {
  HelloWorld,
  Counter,
  NotFound
};

const containerID = window.pluginData.containerID;
const App = apps[window.pluginData.app] || NotFound;

render(<App />, document.getElementById(containerID));
