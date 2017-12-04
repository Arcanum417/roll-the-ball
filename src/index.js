import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import NoCompactingLayout from './1-basic';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



//ReactDOM.render(<NoCompactingLayout />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
