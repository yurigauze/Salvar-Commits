package com.exemplo.helloworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exemplo.helloworld.entity.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno,Long>{
    
}
