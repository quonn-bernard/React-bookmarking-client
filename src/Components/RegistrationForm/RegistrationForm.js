import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'


export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target
    
    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess(user)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
          <label htmlFor='RegistrationForm__username'>
            User name
          </label>
          <input
            name='username'
            type='text'
            required
            id='RegistrationForm__username'>
          </input>
  
          <label htmlFor='RegistrationForm__password'>
            Password
          </label>
          <input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </input>
        <button type='submit'>
          Register
        </button>
      </form>
    )
  }
}