package com.val.drools;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Service;
import java.lang.reflect.Method;
import org.kie.api.definition.rule.Rule;

@Service
public class DroolsService {

    private final KieContainer kContainer;

    public DroolsService() {
        KieServices ks = KieServices.Factory.get();
        this.kContainer = ks.getKieClasspathContainer();
    }
    // Ponemos un límite de 100 ciclos. Si pasa de 100, es un bucle y corta forzosamente.
    public SituacionAgricola evaluar(SituacionAgricola situacion) {
        KieSession kSession = kContainer.newKieSession("KSesionAgricola");
        final int[] contador = {1};

        kSession.addEventListener(new org.kie.api.event.rule.DefaultAgendaEventListener() {
            @Override
            public void afterMatchFired(org.kie.api.event.rule.AfterMatchFiredEvent event) {
                Rule rule = event.getMatch().getRule();
                String nombre = rule.getName();
                int salience = obtenerSalienceReal(rule);

                System.out.println("DEBUG -> Regla disparada: " + nombre);
                System.out.println("DEBUG -> Clase concreta de rule: " + rule.getClass().getName());
                System.out.println("DEBUG -> Salience obtenido: " + salience);

                situacion.getReglasDisparadas().add(
                        new ReglaEjecutada(contador[0]++, nombre, salience)
                );
            }
        });
        System.out.println("Entrada individual recibida: " + situacion);

        kSession.insert(situacion);
        int totalReglas = kSession.fireAllRules(100);

        System.out.println("Total de reglas disparadas: " + totalReglas);
        System.out.println("Reglas disparadas individual: " + situacion.getReglasDisparadas());

        if (totalReglas >= 100) {
            System.err.println("⚠️ ALERTA: Bucle infinito detectado en cultivo: " + situacion.getCultivo());
        }

        kSession.dispose();
        System.out.println("Reglas disparadas individual: " + situacion.getReglasDisparadas());
        return situacion;
    }

    public java.util.List<SituacionAgricola> evaluarLote(java.util.List<SituacionAgricola> lote) {
        System.out.println(">>> Iniciando procesamiento de lote..."); // Log de confirmación
        for (SituacionAgricola situacion : lote) {
            evaluar(situacion);
        }
        return lote;
    }

    private int obtenerSalienceReal(Rule rule) {
        try {
            Method metodo = rule.getClass().getMethod("getSalience");
            Object valor = metodo.invoke(rule);

            if (valor instanceof Number) {
                return ((Number) valor).intValue();
            }

            if (valor != null) {
                return Integer.parseInt(valor.toString().trim());
            }

        } catch (Exception e) {
            System.out.println("DEBUG -> No se pudo obtener salience para " + rule.getName());
            e.printStackTrace();
        }
        return 0;
    }
}