export class ApiFetch {
  static async get(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.log('error for URL: ', url);
      throw error;
    });

    const json = await response.json();
    if (response.status !== 200) {
      console.log('error for URL: ', url);
      throw new Error(json.message);
    }

    // console.log('event: ', JSON.stringify(json));
    return json;
  }

  static async post(url: string, body: string) {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    }).catch((error) => {
      console.log('error for URL: ', url);
      throw error;
    });

    const json = await response.json();
    if (response.status !== 200) {
      console.log('login error for URL: ', url);
      throw new Error(json.message);
    }

    console.log('json: ', JSON.stringify(json));

    return json;
  }
}
