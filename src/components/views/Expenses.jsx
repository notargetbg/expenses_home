import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import SmartTable from '../shared/SmartTable';

class Expenses extends React.Component {
	state = {

	}

	componentDidMount() {

	}

	render() {
		const { expenses } = this.props;

		if (!expenses) {
			return null;
		}

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

				<SmartTable data={this.props.expenses} />
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		expenses: state.expenses
	};
}

export default connect(mapStateToProps)(Expenses);