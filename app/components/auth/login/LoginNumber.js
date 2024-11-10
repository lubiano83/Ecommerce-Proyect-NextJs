import React from 'react';

const LoginList = async() => {

    const userLogged = await fetch("http://localhost:3000/api/auth/sessions", { cache: "no-cache"}).then(res => res.json());
    
  return (
    <div>Usuarios Logeados: {userLogged.users}</div>
  )
}

export default LoginList;