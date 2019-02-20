import React from 'react';
import { Table } from 'reactstrap';
import SmartTableRow from './SmartTableRow';

export default class SmartTable extends React.Component {

	render() {
		const { data } = this.props;

		const items = data.map(item => {
			return Object.entries(item).filter(x => x[0] !== 'userID');
		});

		if (items.length === 0) {
			return 'loading...';
		}

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{items[0].map(x => <th key={x[0]}>{x[0]}</th>)}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<SmartTableRow handleUpdateRow={this.props.handleUpdate} item={item} key={`item-${item[1]}`} />
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}