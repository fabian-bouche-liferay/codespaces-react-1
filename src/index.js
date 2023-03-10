import React from 'react';
import ReactDOM from 'react-dom';


import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";

import {Liferay} from './common/services/liferay/liferay';
import {LiferayConf} from './common/services/liferay/liferay';
import HelloBar from './routes/hello-bar/pages/HelloBar';
import HelloFoo from './routes/hello-foo/pages/HelloFoo';
import HelloWorld from './routes/hello-world/pages/HelloWorld';

import Callback from './common/services/liferay/Callback';

import './common/styles/index.scss';

import * as serviceWorker from './serviceWorker';

let client = Liferay.OAuth2Client.FromParameters({
	clientId: "fox-remote-app",
	homePageURL: "https://alpha"
});

/*
let promise = client.fetch(
	'https://alpha/o/headless-admin-user/v1.0/my-user-account'
  ).then(
	r => console.log('success:', r)
  ).catch(
	e => console.log('error:', e)
  );
*/

const App = ({route}) => {

	if (route === 'callback') {
		return <Callback client={client} />;
	}

	if (route === 'hello-bar') {
		return <HelloBar />;
	}

	if (route === 'hello-foo') {
		return <HelloFoo />;
	}

	return (
		<HelloWorld client={client} />
	);
};

const router = createBrowserRouter([
	{
		path: "/callback",		
		element:
			<App
				route="callback"
		  />,
	},	
	{
		path: LiferayConf.friendlyURLContext + "/hello-bar",
		element:
			<App
				route="hello-bar"
		  />,
	},	
	{
		path: LiferayConf.friendlyURLContext + "/hello-foo",
		element:
			<App
				route="hello-foo"
		  />,
	},	
	{
		path: LiferayConf.friendlyURLContext + "/",		
		element:
			<App
				route="/"
		  />,
	},	
	{
		path: "",		
		element:
			<App
				route="/"
		  />,
	}
], {basename: LiferayConf.linkContext});

class WebComponent extends HTMLElement {

	connectedCallback() {
		ReactDOM.render(
			<RouterProvider router={router} />,
			this
		);

	}
}

if (!customElements.get(LiferayConf.customElementName)) {
	customElements.define(LiferayConf.customElementName, WebComponent);
}

serviceWorker.register();