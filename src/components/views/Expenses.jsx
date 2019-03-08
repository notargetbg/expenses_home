import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import * as actions from '../../store/actions/userData';
import { connect } from 'react-redux';
import SmartTable from '../shared/SmartTable';

class Expenses extends React.Component {
	updateExpenses = (...fields) => {
		this.props.dispatch(actions.updateExpenses(...fields));
	}

	createExpenses = (...fields) => {
		this.props.dispatch(actions.createExpenses(...fields));
	}

	deleteExpenses = (id) => {
		this.props.dispatch(actions.deleteExpenses(id));
	}

	dismissError = () => {
		this.props.dispatch(actions.dismissErrorExpenses());
	}

	render() {
		const { expenses, categories } = this.props;

		if (!expenses) {
			return null;
		}

		const relationalData = {
			type: 'categoryID',
			items: categories.items.map(item => {
				return {
					id: item.id,
					name: item.name
				};
			})
		};

		return (
			<Container>
				<Jumbotron>
					<h1>
						Your Expenses
					</h1>
					<h4 className='lead'>
						Edit or add to the list
					</h4>
				</Jumbotron>

				<SmartTable
					data={this.props.expenses}
					relationalData={relationalData}
					handleUpdate={this.updateExpenses}
					handleCreate={this.createExpenses}
					handleDelete={this.deleteExpenses}
					handleErrorDismiss={this.dismissError}
				/>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		expenses: state.expenses,
		categories: state.categories
	};
}

export default connect(mapStateToProps)(Expenses);