import OAuth2Client from "./OAuth2Client";

export const Liferay = window.Liferay || {
	OAuth2: {
		getAuthorizeURL: () => 'https://alpha/o/oauth2/authorize',
		getBuiltInRedirectURL: () => 'https://fabian-bouche-liferay-organic-palm-tree-7xgrppw64r2wrvx-3000.preview.app.github.dev/callback',
		getIntrospectURL: () => 'https://alpha/o/oauth2/introspect',
		getTokenURL: () => 'https://alpha/o/oauth2/token',
		getUserAgentApplication: (serviceName) => {},
	},
	OAuth2Client: {
		FromParameters: (options) => {
			return new OAuth2Client({
				authorizeURL: Liferay.OAuth2.getAuthorizeURL(),
				clientId: options.clientId,
				encodedRedirectURL: encodeURIComponent(
						Liferay.OAuth2.getBuiltInRedirectURL()
				),
				homePageURL: options.homePageURL,
				redirectURIs: [
					Liferay.OAuth2.getBuiltInRedirectURL(),
				],
				tokenURL: Liferay.OAuth2.getTokenURL()
			});
		},
		FromUserAgentApplication: (userAgentApplicationId) => {
			return {};
		},
		fetch: (url, options = {}) => {},
	},
	ThemeDisplay: {
		getCompanyGroupId: () => 0,
		getScopeGroupId: () => 0,
		getSiteGroupId: () => 0,
		isSignedIn: () => {
			return false;
		},
	},
	authToken: '',
	Mock: true,
}

export const LiferayConf = window.Liferay === undefined ? {
	friendlyURL: '',
	customElementName: 'fox-remote-app',
	friendlyURLContext: '',
	linkContext: '',
} : {
	friendlyURL: 'fox-remote-app',
	customElementName: 'fox-remote-app',
	friendlyURLContext: '/-/fox-remote-app',
	linkContext: window.Liferay.ThemeDisplay.getLayoutRelativeURL(),
}