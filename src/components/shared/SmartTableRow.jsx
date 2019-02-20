import React from 'react';
import SmartTableItem from './SmartTableItem';
import { Button } from 'reactstrap';

export default class SmartTableRow extends React.Component {
	state = {
		isEditing: false
	}

	toggleItemEditing = () => {
		this.setState({
			isEditing:  !this.state.isEditing,
			...this.props.item
		});
	}

	saveEdit = () => {
		// 1. check
		// 2. dispatch to redux
		// 3. clear local state
	}

	render() {
		const { isEditing } = this.state;

		return (
			<tr onClick={this.toggleItemEditing} >

				{this.props.item.map((entry, i) => (
					<SmartTableItem key={`item-${entry[0]}`} isEditing={isEditing} item={entry} />
				))}

				{isEditing &&
					<td>
						<Button>Save</Button>
					</td>
				}

			</tr>
		);
	};
}