import React from 'react';
import {  Form, FormGroup, Label, Input, Button, Spinner, FormFeedback } from 'reactstrap';

export default class LoginForm extends React.Component {

	state = {
		email: '',
		password: '',
		passwordRepeat: '',
		hasAttemptedRegister: false,
		arePasswordsEqual: null
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

	validatePasswordFields = (password, passwordRepeat) => {
		const MIN_LENGTH = 2;
		if ( password.length >= MIN_LENGTH && passwordRepeat.length >= MIN_LENGTH && password === passwordRepeat) {
			return this.compareFields(password, passwordRepeat);
		}
		return false;
	}

	compareFields = (a, b) => {
		if (a === b) {
			this.setState({arePasswordsEqual: true});
			return true;
		}
		this.setState({arePasswordsEqual: false});
		return false;
	};

	handleRegister = (e) => {
		const { email, password, passwordRepeat } = this.state;
		e.preventDefault();

		if (this.props.isUserLoggedIn) {
			return;
		}

		if (this.validatePasswordFields(password, passwordRepeat)) {
			this.setState({arePasswordsEqual: true});
			this.props.handleRegister(email, password, passwordRepeat);
		} else {
			this.setState({arePasswordsEqual: false});
		}

		this.setState({hasAttemptedRegister: true});
	}

	render() {
		const { registerPending, error } = this.props;
		const { arePasswordsEqual, hasAttemptedRegister } = this.state;
		const spinnerStyle = { width: '2rem', height: '2rem' };

		return (
			<Form>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input type='email' id='email' onChange={this.handleEmailChange} />
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input invalid={hasAttemptedRegister && !arePasswordsEqual} valid={hasAttemptedRegister && arePasswordsEqual} type='password' id='password' onChange={this.handlePasswordChange} />
				</FormGroup>

				<FormGroup>
					<Label for='passwordRepeat'>Password Repeat</Label>
					<Input invalid={hasAttemptedRegister && !arePasswordsEqual} valid={hasAttemptedRegister && arePasswordsEqual} type='password' id='passwordRepeat' onChange={this.handlePasswordRepeatChange} />
					{hasAttemptedRegister &&
						<FormFeedback>Passwords must match</FormFeedback>
					}
				</FormGroup>

				{error &&
					<div className='invalid-feedback form-error'>
						{error.payload.message}
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