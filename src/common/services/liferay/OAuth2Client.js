import pkceChallenge from 'pkce-challenge';

class OAuth2Client {
	#authorizeURL;
	#clientId;
	#encodedRedirectURL;
	#homePageURL;
	#redirectURIs;
	#challenge;
	#tokenURL;

	constructor(options) {
		this.#authorizeURL = options.authorizeURL;
		this.#clientId = options.clientId;
		this.#encodedRedirectURL = options.encodedRedirectURL;
		this.#homePageURL = options.homePageURL;
		this.#redirectURIs = options.redirectURIs;
		this.#tokenURL = options.tokenURL;
	}

	async fetch(url, options) {
		const oauth2Client = this;

		return oauth2Client._fetch(url, options).then((response) => {
			if (response.ok) {
				const contentType = response.headers.get('content-type');
				if (
					contentType &&
					contentType.indexOf('application/json') !== -1
				) {
					return response.json();
				}
				else {
					return Promise.resolve(response);
				}
			}

			return Promise.reject(response);
		});
	}

	_redirect(challenge, sessionKey) {
		const oauth2Client = this;
		document.location = `${oauth2Client.#authorizeURL}?client_id=${oauth2Client.#clientId}&code_challenge=${challenge.code_challenge}&code_challenge_method=S256&redirect_uri=${oauth2Client.#encodedRedirectURL}&response_type=code`;
	}

	async _fetch(resource, options) {
		const oauth2Client = this;

		let resourceUrl = resource instanceof Request ? resource.url : resource.toString();

		if (
			resourceUrl.includes('//') &&
			!resourceUrl.startsWith(oauth2Client.#homePageURL)
		) {
			throw new Error(
				`This client only supports calls to ${oauth2Client.#homePageURL}`
			);
		}

		if (!resourceUrl.startsWith(oauth2Client.#homePageURL)) {
			if (resourceUrl.startsWith('/')) {
				resourceUrl = resourceUrl.substring(1);
			}

			resourceUrl = `${oauth2Client.#homePageURL}/${resourceUrl}`;
		}

		const tokenData = await oauth2Client._getOrRequestToken();

		resource =
			resource instanceof Request
				? {...resource, url: resourceUrl}
				: resourceUrl;

		return await fetch(resource, {
			headers: {
				Authorization: `Bearer ${tokenData.access_token}`,
			},
			...options,
		});
	}

	_getOrRequestToken() {
		const oauth2Client = this;
		const sessionKey = `${oauth2Client.#clientId}`;

		return new Promise((resolve) => {
			const cachedTokenData = sessionStorage.getItem(sessionKey);

			if (cachedTokenData !== null && cachedTokenData !== undefined) {
				resolve(JSON.parse(cachedTokenData));
				return;
			}

			resolve(oauth2Client._requestTokenRedirect(sessionKey));
		});
	}

	_requestTokenRedirect(sessionKey) {
		const oauth2Client = this;
		oauth2Client.#challenge = pkceChallenge(128);
		sessionStorage.setItem("challenge", JSON.stringify(oauth2Client.#challenge));
		sessionStorage.setItem("redirect", document.location);
		return oauth2Client._redirect(oauth2Client.#challenge, sessionKey);
	}

	exchangeCode(code) {
		const oauth2Client = this;
		this._requestToken(code).then(data => {
			sessionStorage.setItem(oauth2Client.#clientId, JSON.stringify(data));
			document.location = sessionStorage.getItem("redirect");
		});
	}

	async _requestToken(code) {
		const oauth2Client = this;
		
		oauth2Client.#challenge = JSON.parse(sessionStorage.getItem("challenge"));
        console.log(oauth2Client.#challenge);

		const response = await fetch(oauth2Client.#tokenURL, {
			body: new URLSearchParams({
				client_id: oauth2Client.#clientId,
				code,
				code_verifier: this.#challenge.code_verifier,
				grant_type: 'authorization_code',
				redirect_uri: oauth2Client.#redirectURIs[0],
			}),
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
			mode: 'cors',
		});

		if (response.ok) {
			return response.json();
		}

		return await Promise.reject(response);
	}
}

export default OAuth2Client;