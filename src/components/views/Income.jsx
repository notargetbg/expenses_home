import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/userData';
import { Container, Jumbotron } from 'reactstrap';
import SmartTable from '../shared/SmartTable';

class Income extends React.Component {
	updateIncome = (...fields) => {
		this.props.dispatch(actions.updateIncome(...fields));
	}

	createIncome = (...fields) => {
		this.props.dispatch(actions.createIncome(...fields));
	}

	deleteIncome = (id) => {
		this.props.dispatch(actions.deleteIncome(id));
	}

	render() {
		const { income } = this.props;

		if (!income) {
			return null;
		}

		return (
			<Container>
				<Jumbotron>
					<h1>Your Income</h1>
					<h4 className='lead'>Edit or add to the list</h4>
				</Jumbotron>

				<SmartTable
					handleUpdate={this.updateIncome}
					handleCreate={this.createIncome}
					handleDelete={this.deleteIncome}
					data={this.props.income}
				/>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		income: state.income
	};
}

export default connect(mapStateToProps)(Income);
