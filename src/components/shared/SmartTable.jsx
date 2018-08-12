import React from 'react';
import { Table } from 'reactstrap';
import EntryModel from '../../core/EntryModel.js';

export default class SmartTable extends React.Component {
	state = {
		expenses: []
	}
	
	createEntries = (data) => {
		const expenses = data.map(d => {
			return new EntryModel('expenses', d.name, d.amount, d.category, '', d.date);
		});
		this.setState(expenses);
	}

	render() {

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope='row'>1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope='row'>2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope='row'>3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}