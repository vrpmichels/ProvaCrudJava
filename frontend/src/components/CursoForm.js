import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CursoForm = () => {
  const [curso, setCurso] = useState({ nome: '', cargaHoraria: 0, dataInicio: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/cursos/${id}`)
        .then(response => response.json())
        .then(data => setCurso(data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/cursos/${id}` : 'http://localhost:8080/cursos';
    
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso),
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>{id ? 'Editar' : 'Novo'} Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={curso.nome}
            onChange={e => setCurso({ ...curso, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Carga Horária:</label>
          <input
            type="number"
            value={curso.cargaHoraria}
            onChange={e => setCurso({ ...curso, cargaHoraria: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={curso.dataInicio}
            onChange={e => setCurso({ ...curso, dataInicio: e.target.value })}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CursoForm;
