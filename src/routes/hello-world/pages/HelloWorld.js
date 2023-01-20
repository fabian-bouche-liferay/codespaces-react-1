import React from 'react';
import { Link } from "react-router-dom";

const HelloWorld = () => (
	<div className="hello-world">
		<h1>Hello <span className="hello-world-name">World</span></h1>
		<ul>
			<li><Link to="/hello-foo">Foo</Link></li>
			<li><Link to="/hello-bar">Bar</Link></li>
		</ul>
	</div>
);

export default HelloWorld;