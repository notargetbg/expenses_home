import React from 'react';
import { Container, Row } from 'reactstrap';
import SmartTable from '../shared/SmartTable.jsx';
import { DummyData } from '../../core/dummy-data.js';
import EntryModel from '../../core/EntryModel.js';

export default class StatementType extends React.Component {
	state = {
		expenses: [],
		income: []
	}

	componentDidMount() {
		const statementType = this.props.match.params.type;
		this.createEntries(DummyData, statementType);

		fetch('http://localhost:5000/express_backend')
			.then(response => response.json())
			.then(response => console.log(response));
	}

	createEntries = (data, type) => {
		const entries = data.map(d => {
			return new EntryModel(type, d.name, d.amount, d.category, '', d.date);
		});
		this.setState({[type]: entries});
	};

	render() {
		const statementType = this.props.match.params.type;

		return (
			<Container fluid className='category-container'>
				<Row cols={12}>
					<SmartTable type={statementType} data={this.state[statementType]} />
				</Row>
			</Container>
		);
	}
}