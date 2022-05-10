import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
import './index.css';

// import ReactDOM from "react-dom"
import {BrowserRouter} from 'react-router-dom'
import MyLayout from './components/core/layout';
import PathRoute from './router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  
    {/* <PathRoute /> */}
    {/* <Layout>
        <PathRoute />
      </Layout> */}
  </React.StrictMode>
);
// ReactDOM.render(
//   <MyLayout>
//     <PathRoute />
//   </MyLayout>,
//   document.getElementById('root')
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
