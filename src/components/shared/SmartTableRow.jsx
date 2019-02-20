import React from 'react';
import SmartTableItem from './SmartTableItem';
import { Button } from 'reactstrap';

export default class SmartTableRow extends React.Component {
	state = {
		isEditing: {}
	}

	toggleItemEditing = (id) => (e) => {
		const itemState = this.state.isEditing[id];
		this.setState({
			isEditing: {
				...this.state.isEditing,
				[id]: typeof itemState === 'undefined' ? true : !itemState
			}
		});
	}

	render() {
		const { isEditing } = this.state;
		const { item } = this.props;

		console.log(item)

		return (
			<tr onClick={this.toggleItemEditing(item.find(x => x[0] === 'id')[1])} >

				{this.props.item.map((entry, i) => (
					<SmartTableItem key={`item-${entry[0]}`} isEditing={isEditing[item.find(x => x[0] === 'id')[1]]} item={entry} />
				))}

				<td>
					<Button>Save</Button>
				</td>

			</tr>
		);
	};
}