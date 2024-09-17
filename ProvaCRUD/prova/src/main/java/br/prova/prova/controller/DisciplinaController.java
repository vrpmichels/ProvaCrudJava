package br.prova.prova.controller;

import br.prova.prova.domain.Curso;
import br.prova.prova.domain.Disciplina;
import br.prova.prova.repository.CursoRepository;
import br.prova.prova.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @PostMapping
    public Disciplina createDisciplina(@RequestBody Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    @GetMapping
    public List<Disciplina> getAllDisciplinas() {
        return disciplinaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disciplina> getDisciplinaById(@PathVariable Long id) {
        Optional<Disciplina> disciplina = disciplinaRepository.findById(id);
        return disciplina.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> updatePessoa(@PathVariable Long id, @RequestBody Curso disciplinaDetails) {
        Optional<Disciplina> disciplina = disciplinaRepository.findById(id);
        if (disciplina.isPresent()) {
            Disciplina updatedDisciplina = disciplina.get();
            updatedDisciplina.setNome(disciplinaDetails.getNome());
            return ResponseEntity.ok(disciplinaRepository.save(updatedDisciplina));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisciplina(@PathVariable Long id) {
        disciplinaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
