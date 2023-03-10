import React, { useState } from 'react';
import LiferayLink from '../../../common/services/liferay/LiferayLink';

function HelloWorld(props) {

	const [name, setName] = useState("World");

	let promise = props.client.fetch(
		'https://alpha/o/headless-admin-user/v1.0/my-user-account'
	).then(
		r => {
			console.log('success:', r)
			setName(r.name);
		}
	).catch(
		e => console.log('error:', e)
	);

	return (
		<div className="hello-world">
			<h1>Hello <span className="hello-world-name">{name}</span></h1>
			<ul>
				<li><LiferayLink to="/hello-foo">Foo</LiferayLink></li>
				<li><LiferayLink to="/hello-bar">Bar</LiferayLink></li>
			</ul>
		</div>
	)
}

export default HelloWorld;
