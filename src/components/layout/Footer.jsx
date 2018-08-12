import React from 'react';

export default class Footer extends React.Component {

	render() {

		return (
			<footer className="footer bg-dark">
				<div className="container-fluid">
					<p className="text-muted text-center">Created by: {'Designscaster'.toUpperCase()} - {(new Date().getFullYear())}</p>
				</div>
			</footer>
		);
	}
}