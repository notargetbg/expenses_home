import React from 'react';
import { Table } from 'reactstrap';
import EntryModel from '../../core/EntryModel.js';

export default class SmartTable extends React.Component {
	render() {
		const { data, type } = this.props;

		if (data.length === 0) {
			return 'loading...';
		}
		const tableHeadings = Object.keys(data[0]);

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{tableHeadings.map(x => <th>{x}</th>)}
						</tr>
					</thead>
					<tbody>
						{data.map(x => (
							<tr>
								{tableHeadings.map(heading => <td>{x[heading]}</td>)}
							</tr>
						))}												
					</tbody>
				</Table>
			</div>
		);
	}
}