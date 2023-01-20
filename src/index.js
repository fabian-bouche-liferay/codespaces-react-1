import React from 'react';
import ReactDOM from 'react-dom';

import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";

import {Liferay} from './common/services/liferay/liferay';
import HelloBar from './routes/hello-bar/pages/HelloBar';
import HelloFoo from './routes/hello-foo/pages/HelloFoo';
import HelloWorld from './routes/hello-world/pages/HelloWorld';

import './common/styles/index.scss';

import * as serviceWorker from './serviceWorker';

const ELEMENT_ID = 'fox-remote-app';
const FRIENDLY_URL = 'fox-remote-app';

let routeContext;
let friendlyURLContext;
let linkContext;

if(Liferay.Mock) {
	routeContext = "";
	friendlyURLContext = "/";
	linkContext = routeContext;
} else {
	routeContext = Liferay.ThemeDisplay.getLayoutRelativeURL();
	friendlyURLContext = "/-/" + FRIENDLY_URL + "/";
	linkContext = routeContext + friendlyURLContext;
}

const App = ({route}) => {
	if (route === 'hello-bar') {
		return <HelloBar />;
	}

	if (route === 'hello-foo') {
		return <HelloFoo />;
	}

	return (
		<HelloWorld />
	);
};

const router = createBrowserRouter([
	{
		path: "hello-bar",
		element:
			<App
				route="hello-bar"
		  />,
	},	
	{
		path: "hello-foo",
		element:
			<App
				route="hello-foo"
		  />,
	},	
	{
		path: "",		
		element:
			<App
				route="/"
		  />,
	}
], {basename: linkContext});

class WebComponent extends HTMLElement {
	constructor() {
		super();
/*
		this.oAuth2Client = Liferay.OAuth2Client.FromUserAgentApplication(
			'easy-oauth-application-user-agent'
		);
*/
	}

	connectedCallback() {
		ReactDOM.render(
			<RouterProvider router={router} fallbackElement={<h1>Toto</h1>} />,
			this
		);

	}
}

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}

serviceWorker.register();