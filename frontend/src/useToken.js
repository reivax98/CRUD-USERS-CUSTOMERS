import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem('token'));
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken, token
  }
}