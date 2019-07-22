import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='RegistrationPage'>
        {TokenService.hasAuthToken() && <Redirect to='/' />}
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    )
  }
}