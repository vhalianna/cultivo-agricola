package com.val.drools;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Service;

@Service
public class DroolsService {

    private final KieContainer kContainer;

    public DroolsService() {
        // Cargamos la base de conocimiento UNA sola vez al iniciar (Mejora rendimiento)
        KieServices ks = KieServices.Factory.get();
        this.kContainer = ks.getKieClasspathContainer();
    }

    public SituacionAgricola evaluar(SituacionAgricola situacion) {
        // 1. Abrir sesión (usando el nombre definido en kmodule.xml)
        KieSession kSession = kContainer.newKieSession("KSesionAgricola");

        // 2. Insertar hecho
        kSession.insert(situacion);

        // 3. Disparar reglas
        kSession.fireAllRules();

        // 4. Limpiar
        kSession.dispose();

        // 5. Devolver el objeto ya modificado por las reglas
        return situacion;
    }
}