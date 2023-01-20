import React from 'react';
import { Link } from "react-router-dom";

const HelloBar = () => (
	<div className="hello-bar">
		<h1>Hello Bar</h1>
		<ul>
			<li><Link to="/hello-foo">Foo</Link></li>
			<li><Link to="/">World</Link></li>
		</ul>
	</div>
);

export default HelloBar;