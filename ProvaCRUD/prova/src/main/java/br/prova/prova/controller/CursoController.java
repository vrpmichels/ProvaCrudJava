package br.prova.prova.controller;

import br.prova.prova.domain.Curso;
import br.prova.prova.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/curso")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    @PostMapping
    public Curso createCurso(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    @GetMapping
    public List<Curso> getAllCursos() {
        return cursoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getCursoById(@PathVariable Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        return curso.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
        Optional<Curso> curso = cursoRepository.findById(id);
        if (curso.isPresent()) {
            Curso updatedCurso = curso.get();
            updatedCurso.setNome(cursoDetails.getNome());
            updatedCurso.setCargaHoraria(cursoDetails.getCargaHoraria());
            updatedCurso.setDataInicio(cursoDetails.getDataInicio());
            return ResponseEntity.ok(cursoRepository.save(updatedCurso));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePessoa(@PathVariable Long id) {
        cursoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}