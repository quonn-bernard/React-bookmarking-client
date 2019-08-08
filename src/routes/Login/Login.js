import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import appContext from '../../appContext/appContext';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = appContext;

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/`
    history.push(destination)
  }

  
  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          updater={this.props.update}
          contextValues={this.props}
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}