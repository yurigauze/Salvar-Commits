/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.exemplo.helloworld.repository;

import com.exemplo.helloworld.entity.Repositorio;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author yuri_
 */
public interface RepositorioRepository extends JpaRepository<Repositorio,Long>{
    
}
