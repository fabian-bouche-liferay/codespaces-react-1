import React from 'react';
import LiferayLink from '../../../common/services/liferay/LiferayLink';

const HelloBar = () => (
	<div className="hello-bar">
		<h1>Hello Bar</h1>
		<ul>
			<li><LiferayLink to="/hello-foo">Foo</LiferayLink></li>
			<li><LiferayLink to="/">World</LiferayLink></li>
		</ul>
	</div>
);

export default HelloBar;