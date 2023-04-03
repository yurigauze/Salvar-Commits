/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exemplo.helloworld.controller;

import com.exemplo.helloworld.entity.Repositorio;
import com.exemplo.helloworld.repository.RepositorioRepository;
import com.exemplo.helloworld.service.RepositorioService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yuri_
 */

@RestController
@RequestMapping("/repositorio/api")
@CrossOrigin
public class RepositorioController {
    
    @Autowired
    private RepositorioService repositorioService;   
    
    // localhost:8080/repositorio - com o verbo get
    @GetMapping
    public List<Repositorio> listarTodos(){
        return repositorioService.listarTodos();
    }

    // localhost:8080/repositorio - com verbo post
    @PostMapping
    public Repositorio salvar(@RequestBody Repositorio repositorio){
        return repositorioService.salvar(repositorio);
    }

    //localhost:8080/repositorio/1 - com o verbo delete
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repositorioService.excluir(id);
    }
    
    
    
}
