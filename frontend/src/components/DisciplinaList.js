// src/components/DisciplinaList.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DisciplinaList = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursoNome, setCursoNome] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const cursoId = query.get('cursoId');

  useEffect(() => {
    const url = cursoId
      ? `http://localhost:8080/disciplinas?cursoId=${cursoId}`
      : 'http://localhost:8080/disciplinas';
    
    fetch(url)
      .then(response => response.json())
      .then(data => setDisciplinas(data))
      .catch(error => console.error('Erro:', error));

    if (cursoId) {
      fetch(`http://localhost:8080/cursos/${cursoId}`)
        .then(response => response.json())
        .then(data => setCursoNome(data.nome))
        .catch(error => console.error('Erro ao carregar curso:', error));
    }
  }, [cursoId]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/disciplinas/${id}`, {
      method: 'DELETE',
    })
      .then(() => setDisciplinas(disciplinas.filter(d => d.id !== id)))
      .catch(error => console.error('Erro:', error));
  };

  return (
    <div>
      <h1>Disciplinas {cursoNome && `do Curso: ${cursoNome}`}</h1>
      <Link to="/disciplina/new">Adicionar Nova Disciplina</Link>
      <ul>
        {disciplinas.map(disciplina => (
          <li key={disciplina.id}>
            {disciplina.nome}
            <button onClick={() => handleDelete(disciplina.id)}>Excluir</button>
            <Link to={`/disciplina/edit/${disciplina.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplinaList;
