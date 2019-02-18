import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

export default class ControlTabs extends React.Component {

	render() {
		return (
			<Nav navbar>
				<NavItem>
					<NavLink to='/income' tag={RouterLink}>Income</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to='/expenses' tag={RouterLink}>Expenses</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to='/categories' tag={RouterLink}>Categories</NavLink>
				</NavItem>
			</Nav>
		);
	}
};