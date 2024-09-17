// src/components/CursoList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CursoList = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cursos')
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error('Erro:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/cursos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setCursos(cursos.filter(curso => curso.id !== id)))
      .catch(error => console.error('Erro:', error));
  };

  return (
    <div>
      <h1>Cursos</h1>
      <Link to="/curso/new">Adicionar Novo Curso</Link>
      <Link to="/disciplinas">
        <button>Ir para Disciplinas</button>
      </Link>
      <ul>
        {cursos.map(curso => (
          <li key={curso.id}>
            {curso.nome}
            <button onClick={() => handleDelete(curso.id)}>Excluir</button>
            <Link to={`/curso/edit/${curso.id}`}>Editar</Link>
            <Link to={`/disciplinas?cursoId=${curso.id}`}>
              <button>Ver Disciplinas</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CursoList;
