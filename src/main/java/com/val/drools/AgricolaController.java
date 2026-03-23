package com.val.drools;

import java.util.List;
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
        return droolsService.evaluar(situacion);
    }

    // --- AGREGA ESTE BLOQUE NUEVO ---
    @PostMapping("/diagnosticar-lote")
    public List<SituacionAgricola> diagnosticarLote(@RequestBody List<SituacionAgricola> lote) {
        System.out.println("Recibiendo lote de " + lote.size() + " casos...");
        return droolsService.evaluarLote(lote);
    }
}