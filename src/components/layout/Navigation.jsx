import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Button
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import ControlTabs from '../shared/ControlTabs.jsx';

class Navigation extends React.Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logout = () => {
		this.props.dispatch(actions.userLogout());
		this.props.history.push('/');
	}

	render() {

		return (
			<Navbar color='dark' dark fixed='top' expand='md'>
				<NavbarBrand tag={Link} to='/'>{'Expense tracker'.toUpperCase()}</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<ControlTabs />
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink tag={Link} to='/about'>About</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='#'>Statistics</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='#'>Reports</NavLink>
						</NavItem>
						{this.props.user.isUserLoggedIn &&
						<NavItem>
							<NavLink href='#' onClick={this.logout} className='nav-logout-btn'>
								<Button size='sm'>Logout</Button>
							</NavLink>
						</NavItem>
						}
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

function mapStateToProps(state) {
	return {user: state.user};
};

export default withRouter(connect(mapStateToProps)(Navigation));