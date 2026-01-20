package com.val.drools;


import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class Main {
    public static void main(String[] args) {

        KieServices ks = KieServices.Factory.get();
        KieContainer container = ks.getKieClasspathContainer();

        System.out.println("KieBases detectadas: " + container.getKieBaseNames());
        System.out.println("KieSessions detectadas: " + container.getKieSessionNamesInKieBase("kbase"));

        KieSession session = container.newKieSession("ksession-rules");

        if (session == null) {
            throw new IllegalStateException(
                    "No se pudo crear la KieSession 'ksession-rules'. " +
                            "Revisá kmodule.xml en src/main/resources/META-INF y que el nombre coincida."
            );
        }

        session.insert("Hola Drools");
        session.fireAllRules();
        session.dispose();
    }
}
