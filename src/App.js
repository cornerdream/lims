// import logo from './logo.svg';
import './App.css';
import MyLayout from './components/core/layout'
import PathRoute from './router';

import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <MyLayout> */}
        <PathRoute />
      {/* </MyLayout> */}
    </div>
    </Provider>
  );
}

export default App;