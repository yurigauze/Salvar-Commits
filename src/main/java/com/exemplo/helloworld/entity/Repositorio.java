/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exemplo.helloworld.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Data;
import java.time.LocalDate;


/**
 *
 * @author yuri_
 */

@Entity
@Data
@Table(name = "repositorio")
public class Repositorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "autor")
    private String autor;
    
    @Column(name = "repositorio")
    private String repositorio;
    
    @Column(name = "link")
    private String link;
   
    @Column(name = "dataInicial")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataInicial;
    
    @Column(name = "dataFinal")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataFinal;
    
    @Column(name = "percentual")
    private String percentual;
    
    @Column(name = "qtdCommits")
    private int qtdCommits;
    
    @Column(name = "resumo")
    private String resumo;

}
