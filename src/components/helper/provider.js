// 简单的Provider组件
import React, { Component,Children } from 'react';
import PropTypes from  "prop-types" 


export default class Provider extends React.Component {
  static  childContextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props){
      super(props)
      this.store = {...props}
  }

  getChildContext(){
    return {store:this.store}
  }

  render(){
      return (
      <div>
          {this.props.children}
      </div>)
  }  
}
