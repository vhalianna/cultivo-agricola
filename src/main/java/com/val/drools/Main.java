package com.val.drools;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.event.rule.AfterMatchFiredEvent;
import org.kie.api.event.rule.DefaultAgendaEventListener;



public class Main {
    public static void main(String[] args) {

        KieServices ks = KieServices.Factory.get();
        KieContainer kc = ks.getKieClasspathContainer();

        System.out.println("KieBases disponibles: " + kc.getKieBaseNames());
        System.out.println("KieSessions en KBaseAgricola: " + kc.getKieSessionNamesInKieBase("KBaseAgricola"));

        KieSession kSession = kc.newKieSession("KSesionAgricola");

        SituacionAgricola s = new SituacionAgricola();
        s.setCultivo("MAIZ");
        s.setPh_suelo("BAJO");
        s.setTemperatura("MEDIA");
        s.setHumedad_suelo("NORMAL");
        s.setHumedad_amb("NORMAL");
        s.setPrecipitaciones("NORMALES");
        s.setPlaga("NINGUNA");
        s.setNutrientes("ADECUADOS");
        s.setHistorial_plagas("BAJO");

        kSession.insert(s);
        System.out.println("Reglas en la base de conocimiento: " + kc.getKieBase("KBaseAgricola").getKiePackage("rules").getRules().size());
        //int fired = kSession.fireAllRules();
        kSession.addEventListener(new DefaultAgendaEventListener() {
            @Override
            public void afterMatchFired(AfterMatchFiredEvent event) {
                System.out.println("DISPARÓ -> " + event.getMatch().getRule().getName());
            }
        });
        int fired = kSession.fireAllRules(50);
        System.out.println("Reglas disparadas (max 50): " + fired);

        System.out.println("Reglas disparadas: " + fired);
        System.out.println("Resultado final: " + s);

        kSession.dispose();


    }
}
