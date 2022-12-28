import React, { useState, useEffect } from 'react';
import './style.css';
import { Card } from '../../components';

export function Home() {
 
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {

    //Recuperando as informações via API
    /*
    fetch('https://api.github.com/users/DiogoBarrosCode')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
    */

    //Recuperando as informações via API de forma assíncrona
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/DiogoBarrosCode');
      const data = await response.json();
      //console.log("Dados ===> ", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();

  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='foto de perfil' ></img>
        </div>
      </header>
      <input 
            type="text"
            placeholder="Digite o nome..."
            onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
        ))
      }
    </div>
  )
}
