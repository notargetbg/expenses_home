import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {

		return (
			<Navbar color="dark" dark fixed="top" expand="md">
				<NavbarBrand tag={Link} to='/'>{'Expense tracker'.toUpperCase()}</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to='/about'>About</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Statistics</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Reports</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}