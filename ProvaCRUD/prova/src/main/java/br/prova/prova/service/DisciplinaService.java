package br.prova.prova.service;

import br.prova.prova.domain.Curso;
import br.prova.prova.domain.Disciplina;
import br.prova.prova.repository.CursoRepository;
import br.prova.prova.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository repository;

    public Disciplina salvar(Disciplina disciplina){
        disciplina = repository.save(disciplina);
        return disciplina;
    }


    public List<Disciplina> listar(){
        return repository.findAll();
    }

    public Boolean excluir(Long id){
        try {
            repository.deleteById(id);
        }catch (Exception e ){
            return false;

        }
        return true;
    }

    public Disciplina alterar(Disciplina disciplina){
        if(Objects.nonNull(disciplina.getId())){
            disciplina = repository.save(disciplina);
        }
        return disciplina;
    }

}
