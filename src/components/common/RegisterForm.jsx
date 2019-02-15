import React from 'react';
import {  Form, FormGroup, Label, Input, Button, Spinner, FormFeedback } from 'reactstrap';

export default class LoginForm extends React.Component {

	state = {
		email: '',
		password: '',
		passwordRepeat: ''
	};

	handleEmailChange = (e) => {
		this.setState({email: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handlePasswordRepeatChange = (e) => {
		this.setState({passwordRepeat: e.target.value});
	}

	handleRegister = (e) => {
		const { email, password, passwordRepeat } = this.state;
		e.preventDefault();

		if (this.props.isUserLoggedIn) {
			return;
		}

		this.props.handleRegister(email, password, passwordRepeat);
	}

	hasError = (error, field) => {
		if (!error || !error.fields) {
			return false;
		}
		console.log(error.fields[field] ? true : false)
		return error.fields[field] ? true : false;
	}

	render() {
		const { registerPending, error } = this.props;
		const spinnerStyle = { width: '2rem', height: '2rem' };

		console.log(error);



		return (
			<Form>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input invalid={this.hasError(error, 'email')} type='email' id='email' onChange={this.handleEmailChange} />
					{this.hasError(error, 'email') &&
						<FormFeedback>{error.fields.email.msg}</FormFeedback>
					}
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input invalid={this.hasError(error, 'password')} type='password' id='password' onChange={this.handlePasswordChange} />
					{this.hasError(error, 'password') &&
						<FormFeedback>{error.fields.password.msg}</FormFeedback>
					}
				</FormGroup>

				<FormGroup>
					<Label for='passwordConfirmation'>Confirm password</Label>
					<Input invalid={this.hasError(error, 'passwordConfirmation')} type='password' id='passwordConfirmation' onChange={this.handlePasswordRepeatChange} />
					{this.hasError(error, 'passwordConfirmation') &&
						<FormFeedback>{error.fields.passwordConfirmation.msg}</FormFeedback>
					}
				</FormGroup>

				{error &&
					<div className='invalid-feedback form-error'>
						{error.message && error.message}
					</div>
				}

				{!registerPending &&
					<Button onClick={this.handleRegister}>Register</Button>
				}
				{registerPending &&
					<Spinner style={spinnerStyle} type='grow' />
				}
			</Form>
		);
	}
};