import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/userData';
import { Container, Jumbotron } from 'reactstrap';
import SmartTable from '../shared/SmartTable';

class Categories extends React.Component {
	updateCategory = (...fields) => {
		this.props.dispatch(actions.updateCategory(...fields));
	}

	createCategory = (...fields) => {
		this.props.dispatch(actions.createCategory(...fields));
	}

	deleteCategory = (id) => {
		this.props.dispatch(actions.deleteCategory(id));
	}

	dismissError = () => {
		this.props.dispatch(actions.dismissErrorCategory());
	}

	render() {
		const { categories } = this.props;


		if (!categories) {
			return null;
		}

		return (
			<Container>
				<Jumbotron>
					<h1>
						Your Categories
					</h1>
					<h4 className='lead'>
						Edit or add to the list
					</h4>
				</Jumbotron>

				<SmartTable
					handleUpdate={this.updateCategory}
					handleCreate={this.createCategory}
					handleDelete={this.deleteCategory}
					handleErrorDismiss={this.dismissError}
					data={categories}
				/>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories
	};
}

export default connect(mapStateToProps)(Categories);