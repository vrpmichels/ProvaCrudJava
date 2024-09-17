// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CursoList from './components/CursoList';
import CursoForm from './components/CursoForm';
import DisciplinaList from './components/DisciplinaList';
import DisciplinaForm from './components/DisciplinaForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CursoList />} />
        <Route path="/curso/new" element={<CursoForm />} />
        <Route path="/curso/edit/:id" element={<CursoForm />} />
        <Route path="/disciplinas" element={<DisciplinaList />} />
        <Route path="/disciplina/new" element={<DisciplinaForm />} />
        <Route path="/disciplina/edit/:id" element={<DisciplinaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
