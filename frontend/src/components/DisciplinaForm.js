// src/components/DisciplinaForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DisciplinaForm = () => {
  const [disciplina, setDisciplina] = useState({ nome: '', curso: { id: '' } });
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Carregar lista de cursos
    fetch('http://localhost:8080/cursos')
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error('Erro ao carregar cursos:', error));

    if (id) {
      fetch(`http://localhost:8080/disciplinas/${id}`)
        .then(response => response.json())
        .then(data => setDisciplina(data))
        .catch(error => console.error('Erro ao carregar disciplina:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/disciplinas/${id}` : 'http://localhost:8080/disciplinas';
    
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplina),
    })
      .then(() => navigate('/disciplinas'))
      .catch(error => console.error('Erro:', error));
  };

  return (
    <div>
      <h1>{id ? 'Editar' : 'Nova'} Disciplina</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={disciplina.nome}
            onChange={e => setDisciplina({ ...disciplina, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Curso:</label>
          <select
            value={disciplina.curso.id}
            onChange={e => setDisciplina({ ...disciplina, curso: { id: parseInt(e.target.value) } })}
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default DisciplinaForm;
