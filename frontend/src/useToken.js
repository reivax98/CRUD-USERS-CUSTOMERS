import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem('token'));
    return userToken?.accessToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    if (userToken === undefined){
      console.log('undefined')
      sessionStorage.clear()}
    else if (userToken && userToken.code === 401){
      alert('Credenciales de acceso incorrectas')
    }
    else
      setToken(userToken.accessToken);
  };
  return {
    setToken: saveToken,
    token
  }
}