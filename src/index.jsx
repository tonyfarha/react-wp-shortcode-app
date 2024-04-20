import { render } from '@wordpress/element';
import { HelloWorld, Counter } from './Apps';

const apps = {
    'HelloWorld': HelloWorld,
    'Counter': Counter
};

const containerID = window.pluginData.containerID;
const App = apps[window.pluginData.app];

render(<App />, document.getElementById(containerID));
