import './App.css';
import { Provider } from "react-redux";
import PathRoute from './router'
import store from './store';

function App() {
  return (
    <Provider store={store}>   
      <PathRoute />
    </Provider>
  );
}

export default App;
