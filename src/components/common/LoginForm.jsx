import React from 'react';
import {  Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

export default class LoginForm extends React.Component {

	state = {
		email: '',
		password: '',
		error: null
	};

	handleEmailChange = (e) => {
		this.setState({email: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handleLogin = (e) => {
		e.preventDefault();

		if (!this.props.isUserLoggedIn) {
			this.props.handleLogin(this.state.email, this.state.password);
		}
	}

	render() {
		const { isLoginPending, error } = this.props;
		const spinnerStyle = { width: '2rem', height: '2rem' };

		return (
			<Form onSubmit={this.handleLogin}>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input type='email' id='email' onChange={this.handleEmailChange} />
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input type='password' id='password' onChange={this.handlePasswordChange} />
				</FormGroup>

				{error &&
					<div className='invalid-feedback form-error'>
						{error.message && error.message}
					</div>
				}

				{!isLoginPending &&
					<Button onClick={this.handleLogin}>Login</Button>
				}
				{isLoginPending &&
					<Spinner style={spinnerStyle} type='grow' />
				}
			</Form>
		);
	}
};