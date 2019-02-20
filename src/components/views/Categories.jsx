import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/category';
import { Container, Jumbotron } from 'reactstrap';
import SmartTable from '../shared/SmartTable';

class Categories extends React.Component {
	componentDidMount() {

	}

	updateCategory = (...args) => {
		this.props.dispatch(actions.updateCategory(...args));
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

				<SmartTable handleUpdate={this.updateCategory} data={this.props.categories} />
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.userData.categories
	};
}

export default connect(mapStateToProps)(Categories);