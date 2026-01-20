package com.val.drools;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agricola")
@CrossOrigin(origins = "*") // IMPORTANTE: Permite que Angular (puerto 4200) hable con Java (puerto 8080)
public class AgricolaController {

    @Autowired
    private DroolsService droolsService;

    @PostMapping("/diagnosticar")
    public SituacionAgricola diagnosticar(@RequestBody SituacionAgricola situacion) {
        System.out.println("Recibiendo solicitud desde Angular...");
        System.out.println("Datos: " + situacion.getCultivo() + " | " + situacion.getPlaga());

        return droolsService.evaluar(situacion);
    }
}