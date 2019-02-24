import React from 'react';

export default class Footer extends React.Component {

	render() {

		const creatorName = 'Designscaster'.toUpperCase();
		const currentYear = new Date().getFullYear();

		return (
			<footer className='footer bg-dark'>
				<div className='container-fluid'>
					<p className='text-muted text-center'>Created by: {creatorName} - {currentYear}</p>
				</div>
			</footer>
		);
	}
}