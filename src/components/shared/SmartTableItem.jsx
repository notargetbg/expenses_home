import React from 'react';
import { Input } from 'reactstrap';

export default class SmartTableItem extends React.Component {
	state = {
		key: this.props.item[0],
		value: this.props.item[1],
	}

	handleInput = (e) => {
		if (this.state.key === 'id') {
			return;
		}
		this.setState({value: e.target.value});
	}

	handleClick = (e) => {
		e.stopPropagation();
	}

	render() {
		const { item, isEditing } = this.props;

		return (
			<td>
				{isEditing && this.state.key !== 'id' && this.state.value &&
					<Input placeholder={item[0]} onClick={this.handleClick} onChange={this.handleInput} value={this.state.value} />
				}
				{!isEditing &&
					<span>
						{item[1]}
					</span>
				}
			</td>
		);
	}
};