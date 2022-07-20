import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  // <React.StrictMode>
//     {/* <App /> */}
  // </React.StrictMode>
// );//组件加载两次
root.render(<App />);
// ReactDOM.render(
//   <MyLayout>
//     <PathRoute />
//   </MyLayout>,
//   document.getElementById('root')
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);//网站性能指标
