const url = "http://localhost:3000/api/Gamers";

export async function login(username: string, password: string) {
  const loginUrl = url + "/login";

  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const json = await response.json();

  return json;
}
