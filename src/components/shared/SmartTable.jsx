import React from 'react';
import { Table } from 'reactstrap';

export default class SmartTable extends React.Component {
	render() {
		const { data } = this.props;

		const entries = data.map(item => {
			return {
				name: item.name,
				amount: item.amount,
				category: item.category,
				description: item.description,
				date: item.date
			};
		});

		if (entries.length === 0) {
			return 'loading...';
		}
		const tableHeadings = Object.keys(entries[0]);

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{tableHeadings.map(x => <th key={x}>{x}</th>)}
						</tr>
					</thead>
					<tbody>
						{entries.map((item, i) => (
							<tr key={`item-${i}`}>
								{tableHeadings.map(heading => <td key={heading}>{item[heading]}</td>)}
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}