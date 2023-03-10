import React from 'react';

function Callback(props) {

	const searchParams = new URLSearchParams(window.location.search);
	let code = searchParams.get('code');

	props.client.exchangeCode(code);

	return (
		<div className="callback">
			<h1>Callback</h1>
			<p>Lorem ipsum</p>
		</div>
	)
}

export default Callback;