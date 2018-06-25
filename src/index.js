import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './recursos/css/bootstrap.min.css'
import './recursos/css/estilo.css'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
