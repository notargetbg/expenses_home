import React from 'react';

export default class Footer extends React.Component {

	render() {

		return (
			<div>
				<footer className="footer bg-dark">
					<div className="container-fluid">
						<p className="text-muted text-right">Created by: {'Designscaster'.toUpperCase()} - {(new Date().getFullYear())}</p>
					</div>
				</footer>
			</div>
		);
	}
}