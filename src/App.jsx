import React, { useState } from 'react';
import './App.css';

import Title from './components/Title';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  const newUser = async () => {
    try {
      const respuesta = await fetch('https://randomuser.me/api/?gender=female');
      const { results } = await respuesta.json();
      const newUser = { ...results[0], activo: true };
      setUsers([newUser, ...users]);
    } catch (error) {
      console.error('Error al obtener nuevos usuarios:', error);
    }
  };

  const cambiarActivo = (id) => {
    const newUsers = users.map((user) => {
      if (user.login.uuid === id) {
        return { ...user, activo: !user.activo };
      }
      return user;
    });
    setUsers(newUsers);
  };

  const deleteUsers = () => {
    const newUsers = users.filter((user) => !user.activo);
    setUsers(newUsers);
  };

  return (
    <>
      <Title newUser={newUser} deleteUsers={deleteUsers} />
      <div className='container'>
        <UsersList users={users} cambiarActivo={cambiarActivo} />
      </div>
    </>
  );
}

export default App;
