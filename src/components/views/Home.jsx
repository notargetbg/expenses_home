import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Home extends React.Component {

	state = {
		email: '',
		password: '',
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
			this.props.dispatch(
				actions.userLogin(this.state.email, this.state.password)
			);
		}
	}

	render() {
		const { isUserLoggedIn } = this.props.user;

		return (
			<Container fluid className='home-container'>
				{isUserLoggedIn &&
					<Row>
						<Col>
							<Link to='/statement/income' className='main-category main-category--income'>Income</Link>
						</Col>
						<Col>
							<Link to='/statement/expenses' className='main-category main-category--expenses'>Expenses</Link>
						</Col>
					</Row>
				}
				{!isUserLoggedIn &&
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
							<Button onClick={this.handleLogin}>Login</Button>
						</Form>
					</Row>
				}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {user: state.user};
};

export default connect(mapStateToProps)(Home);