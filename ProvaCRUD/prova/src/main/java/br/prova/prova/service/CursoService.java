package br.prova.prova.service;

import br.prova.prova.domain.Curso;
import br.prova.prova.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
public class CursoService {

    @Autowired
    private CursoRepository repository;

    public Curso salvar(Curso curso){
        curso = repository.save(curso);
        return curso;
    }


    public List<Curso> listar(){
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

    public Curso alterar(Curso curso){
        if(Objects.nonNull(curso.getId())){
            curso = repository.save(curso);
        }
        return curso;
    }

}
