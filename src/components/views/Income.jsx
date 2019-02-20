import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import SmartTable from '../shared/SmartTable';

class Income extends React.Component {
	state = {

	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		const { income } = this.props;

		if (!income) {
			return null;
		}


		return (
			<Container>
				<Jumbotron>
					<h1>
						Your Income
					</h1>
					<h4 className='lead'>
						Edit or add to the list
					</h4>
				</Jumbotron>

				<SmartTable data={this.props.income} />
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		income: state.userData.income
	};
}

export default connect(mapStateToProps)(Income);