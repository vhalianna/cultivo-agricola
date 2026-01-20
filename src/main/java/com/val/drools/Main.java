package com.val.drools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        // Esto levanta el servidor Tomcat en el puerto 8080
        SpringApplication.run(Main.class, args);
        System.out.println(">>> SISTEMA EXPERTO ONLINE: http://localhost:8080/api/agricola/diagnosticar");
    }
}