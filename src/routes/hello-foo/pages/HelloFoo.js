import React from 'react';
import { Link } from "react-router-dom";

const HelloFoo = () => (
	<div className="hello-foo">
		<h1>Hello Foo!</h1>
		<ul>
			<li><Link to="/">World</Link></li>
			<li><Link to="/hello-bar">Bar</Link></li>
		</ul>
	</div>
);

export default HelloFoo;