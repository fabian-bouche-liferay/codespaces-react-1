import React from 'react';
import LiferayLink from '../../../common/services/liferay/LiferayLink';

const HelloFoo = () => (
	<div className="hello-foo">
		<h1>Hello Foo!</h1>
		<ul>
			<li><LiferayLink to="/">World</LiferayLink></li>
			<li><LiferayLink to="/hello-bar">Bar</LiferayLink></li>
		</ul>
	</div>
);

export default HelloFoo;