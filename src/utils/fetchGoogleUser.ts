interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export async function fetchGoogleUser(accessToken: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`,
  );

  return response.json() as Promise<GoogleUser>;
}
