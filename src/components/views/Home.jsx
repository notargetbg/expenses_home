import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Home extends React.Component {

	state = {
		email: '',
		password: '',
		isAuthenticated: false,
		token: null
	};

	handleEmailChange = (e) => {
		this.setState({email: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handleLogin = (e) => {
		e.preventDefault();

		fetch('http://localhost:5000/api/auth/login', {
			method: 'POST',
			headers: {
				// "Content-Type": "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `email=${this.state.email}&password=${this.state.password}`
		})
			.then(response => response.json())
			.then(response => {
				if (response.token) {
					this.setState({
						token: response.token,
						isAuthenticated: true
					});
				}
			})
			.catch(err => {
				console.log(err);
			});

	}

	render() {
		const { isAuthenticated } = this.state;

		return (
			<Container fluid className='home-container'>
				{isAuthenticated &&
					<Row>
						<Col>
							<Link to='/statement/income' className='main-category main-category--income'>Income</Link>
						</Col>
						<Col>
							<Link to='/statement/expenses' className='main-category main-category--expenses'>Expenses</Link>
						</Col>
					</Row>
				}
				{!isAuthenticated &&
					<Row className='text-center'>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label for='email'>Email</Label>
								<Input type='email' id='email' onChange={this.handleEmailChange} />
							</FormGroup>
							<FormGroup>
								<Label for='password'>Password</Label>
								<Input type='password' id='password' onChange={this.handlePasswordChange} />
							</FormGroup>
							<Button onClick={() => this.props.dispatch(actions.test2())}>Login</Button>
						</Form>
					</Row>
				}
			</Container>
		);
	}
}

export default connect()(Home);