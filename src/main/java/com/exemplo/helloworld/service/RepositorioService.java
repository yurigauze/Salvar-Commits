/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exemplo.helloworld.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.exemplo.helloworld.entity.Repositorio;
import com.exemplo.helloworld.repository.RepositorioRepository;

/**
 *
 * @author yuri_
 */
@Service
public class RepositorioService {
    
    @Autowired
    private RepositorioRepository repositorioRepository;

    public List<Repositorio> listarTodos(){
        return repositorioRepository.findAll();
    }

    public Repositorio salvar(Repositorio repositorio){
        return repositorioRepository.saveAndFlush(repositorio);
    }

    public Repositorio atualizar(Repositorio repositorio) {
        return repositorioRepository.saveAndFlush(repositorio);
    }

    public void excluir(Long id){
        Repositorio repositorio = repositorioRepository.findById(id).get();
        repositorioRepository.delete(repositorio);
    }
    
}
