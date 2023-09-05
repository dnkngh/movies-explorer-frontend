class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authHeaders = null;
  };

  setAuthHeader(token) {
    this._authHeaders = {
      ...this._headers,
      authorization: `Bearer ${token}`
    };
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  };

  getUserMovies() {
    return this._request(
      this._baseUrl + 'movies',
      {
        method: 'GET',
        headers: this._authHeaders,
      },
    );
  };

  saveUserMovie(data) {
    return this._request(
      this._baseUrl + `movies`,
      {
        method: 'POST',
        headers: this._authHeaders,
        body: JSON.stringify(data),
      },
    );
  };

  deleteMovie(id) {
    return this._request(
      this._baseUrl + `movies/${id}`,
      {
        method: 'DELETE',
        headers: this._authHeaders,
      },
    );
  };

  register(data) {
    return this._request(
      this._baseUrl + `signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    );
  };

  login(data) {
    return this._request(
      this._baseUrl + `signin`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    );
  };

  // checkToken(token) {
  //   return this._request(
  //     this._baseUrl + 'users/me',
  //     {
  //       method: 'GET',
  //       headers: this._authHeaders,
  //     },
  //   );
  // };

  getUserInfo() {
    return this._request(
      this._baseUrl + 'users/me',
      {
        method: 'GET',
        headers: this._authHeaders,
      },
    );
  };

  setUserInfo(data) {
    return this._request(
      this._baseUrl + 'users/me',
      {
        method: 'PATCH',
        headers: this._authHeaders,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      },
    );
  };
}

const mainApi = new MainApi({
  baseUrl: 'https://api.dnknghmovies.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
