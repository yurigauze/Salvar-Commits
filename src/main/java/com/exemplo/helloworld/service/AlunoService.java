package com.exemplo.helloworld.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exemplo.helloworld.entity.Aluno;
import com.exemplo.helloworld.repository.AlunoRepository;

@Service
public class AlunoService {
    
    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> listarTodos(){
        return alunoRepository.findAll();
    }

    public Aluno salvar(Aluno aluno){
        return alunoRepository.saveAndFlush(aluno);
    }

    public Aluno atualizar(Aluno aluno) {
        return alunoRepository.saveAndFlush(aluno);
    }

    public void excluir(Long id){
        Aluno aluno = alunoRepository.findById(id).get();
        alunoRepository.delete(aluno);
    }

}
