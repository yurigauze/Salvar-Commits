package com.exemplo.helloworld.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.helloworld.entity.Aluno;
import com.exemplo.helloworld.service.AlunoService;

@RestController
@RequestMapping("/alunos")
@CrossOrigin
public class AlunoController {
    
    @Autowired
    private AlunoService alunoService;
    
    // localhost:8080/alunos - com o verbo get
    @GetMapping
    public List<Aluno> listarTodos(){
        return alunoService.listarTodos();
    }

    // localhost:8080/alunos - com verbo post
    @PostMapping
    public Aluno salvar(@RequestBody Aluno aluno){
        return alunoService.salvar(aluno);
    }

    //localhost:8080/alunos/1 - com o verbo delete
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable("id") Long id){
        alunoService.excluir(id);
    }
}
