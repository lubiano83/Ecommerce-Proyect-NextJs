import React from 'react';

const RegisterList = async() => {

    const users = await fetch("http://localhost:3000/api/auth/users", { cache: "no-cache" }).then(res => res.json());

  return (
    <div>
        
    </div>
  )
}

export default RegisterList;