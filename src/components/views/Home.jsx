import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

	render() {

		return (
			<Container fluid className='home-container'>
				<Row>
					<Col>
						<Link to='/statement/income' className='main-category main-category--income'>Income</Link>
					</Col>
					<Col>
						<Link to='/statement/expenses' className='main-category main-category--expenses'>Expenses</Link>
					</Col>
				</Row>
			</Container>
		);
	}
}