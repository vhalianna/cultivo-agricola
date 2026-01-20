package com.val.drools;

public class SituacionAgricola {

    // =========================================================
    // Constantes (evitan typos y unifican vocabulario del dominio)
    // =========================================================

    // Valores comunes
    public static final String NINGUNA = "NINGUNA";
    public static final String NINGUNO = "NINGUNO";
    public static final String NO = "NO";
    public static final String SI = "SI";

    // Cultivos
    public static final String MAIZ = "MAIZ";
    public static final String TRIGO = "TRIGO";
    public static final String SOJA = "SOJA";
    public static final String HORTALIZAS = "HORTALIZAS";
    public static final String FRUTALES = "FRUTALES";

    // Niveles
    public static final String BAJO = "BAJO";
    public static final String MEDIO = "MEDIO";
    public static final String ALTO = "ALTO";

    // Plagas
    public static final String INSECTOS = "INSECTOS";
    public static final String HONGOS = "HONGOS";
    public static final String MALEZAS = "MALEZAS";

    // Enmienda
    public static final String CAL = "CAL";

    // Control de plaga
    public static final String PESTICIDA = "PESTICIDA";
    public static final String FUNGICIDA = "FUNGICIDA";
    public static final String HERBICIDA = "HERBICIDA";
    public static final String INSECTICIDA = "INSECTICIDA";

    // Riego
    public static final String NORMAL = "NORMAL";
    public static final String MANTENER = "MANTENER";
    public static final String AUMENTAR_FRECUENCIA = "AUMENTAR_FRECUENCIA";
    public static final String AUMENTAR_CAUDAL = "AUMENTAR_CAUDAL";

    // Fertilización
    public static final String NECESARIA = "NECESARIA";
    public static final String NO_NECESARIA = "NO_NECESARIA";

    // Manejo (jerarquía)
    public static final String CONVENCIONAL = "CONVENCIONAL";
    public static final String PREVENTIVO = "PREVENTIVO";
    public static final String INTEGRADO = "INTEGRADO";

    // =========================================================
    // Atributos de Entrada (Condiciones / Óvalos)
    // =========================================================
    private String cultivo;
    private String ph_suelo;
    private String temperatura;
    private String humedad_suelo;
    private String humedad_amb;
    private String precipitaciones;
    private String plaga;
    private String nutrientes;
    private String historial_plagas;

    // =========================================================
    // Atributos de Salida (Hechos Generados)
    // =========================================================
    private String enmienda_suelo = NINGUNA;
    private String control_plaga = NINGUNO;
    private String riego = NORMAL;
    private String fertilizacion = NO_NECESARIA;
    private String riesgo = BAJO;
    private String manejo = CONVENCIONAL;
    private String alerta = NO;

    public SituacionAgricola() {
        // Constructor vacío requerido/recomendado para Drools
    }

    // =========================================================
    // Normalización (evita que "maiz", " MAIZ " rompan las reglas)
    // =========================================================
    private static String norm(String v) {
        if (v == null) return null;
        String out = v.trim();
        return out.isEmpty() ? null : out.toUpperCase();
    }

    /**
     * Opcional: si cargás valores desde UI/archivo y querés asegurarte que
     * todo quede en mayúsculas sin espacios antes de insertar en la sesión.
     */
    public void normalizarEntradas() {
        this.cultivo = norm(this.cultivo);
        this.ph_suelo = norm(this.ph_suelo);
        this.temperatura = norm(this.temperatura);
        this.humedad_suelo = norm(this.humedad_suelo);
        this.humedad_amb = norm(this.humedad_amb);
        this.precipitaciones = norm(this.precipitaciones);
        this.plaga = norm(this.plaga);
        this.nutrientes = norm(this.nutrientes);
        this.historial_plagas = norm(this.historial_plagas);
    }

    // =========================================================
    // Getters y Setters - ENTRADA
    // =========================================================
    public String getCultivo() {
        return cultivo;
    }

    public void setCultivo(String cultivo) {
        this.cultivo = norm(cultivo);
    }

    public String getPh_suelo() {
        return ph_suelo;
    }

    public void setPh_suelo(String ph_suelo) {
        this.ph_suelo = norm(ph_suelo);
    }

    public String getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(String temperatura) {
        this.temperatura = norm(temperatura);
    }

    public String getHumedad_suelo() {
        return humedad_suelo;
    }

    public void setHumedad_suelo(String humedad_suelo) {
        this.humedad_suelo = norm(humedad_suelo);
    }

    public String getHumedad_amb() {
        return humedad_amb;
    }

    public void setHumedad_amb(String humedad_amb) {
        this.humedad_amb = norm(humedad_amb);
    }

    public String getPrecipitaciones() {
        return precipitaciones;
    }

    public void setPrecipitaciones(String precipitaciones) {
        this.precipitaciones = norm(precipitaciones);
    }

    public String getPlaga() {
        return plaga;
    }

    public void setPlaga(String plaga) {
        this.plaga = norm(plaga);
    }

    public String getNutrientes() {
        return nutrientes;
    }

    public void setNutrientes(String nutrientes) {
        this.nutrientes = norm(nutrientes);
    }

    public String getHistorial_plagas() {
        return historial_plagas;
    }

    public void setHistorial_plagas(String historial_plagas) {
        this.historial_plagas = norm(historial_plagas);
    }

    // =========================================================
    // Getters y Setters - SALIDA
    // =========================================================
    public String getEnmienda_suelo() {
        return enmienda_suelo;
    }

    public void setEnmienda_suelo(String enmienda_suelo) {
        // salida: no normalizo a la fuerza por si en el futuro agregás códigos,
        // pero dejo consistencia de mayúsculas igual.
        this.enmienda_suelo = norm(enmienda_suelo);
    }

    public String getControl_plaga() {
        return control_plaga;
    }

    public void setControl_plaga(String control_plaga) {
        this.control_plaga = norm(control_plaga);
    }

    public String getRiego() {
        return riego;
    }

    public void setRiego(String riego) {
        this.riego = norm(riego);
    }

    public String getFertilizacion() {
        return fertilizacion;
    }

    public void setFertilizacion(String fertilizacion) {
        this.fertilizacion = norm(fertilizacion);
    }

    public String getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(String riesgo) {
        this.riesgo = norm(riesgo);
    }

    public String getManejo() {
        return manejo;
    }

    public void setManejo(String manejo) {
        this.manejo = norm(manejo);
    }

    public String getAlerta() {
        return alerta;
    }

    public void setAlerta(String alerta) {
        this.alerta = norm(alerta);
    }

    // =========================================================
    // Utilidad para debugging
    // =========================================================
    @Override
    public String toString() {
        return "SituacionAgricola{" +
                "cultivo='" + cultivo + '\'' +
                ", ph_suelo='" + ph_suelo + '\'' +
                ", temperatura='" + temperatura + '\'' +
                ", humedad_suelo='" + humedad_suelo + '\'' +
                ", humedad_amb='" + humedad_amb + '\'' +
                ", precipitaciones='" + precipitaciones + '\'' +
                ", plaga='" + plaga + '\'' +
                ", nutrientes='" + nutrientes + '\'' +
                ", historial_plagas='" + historial_plagas + '\'' +
                ", enmienda_suelo='" + enmienda_suelo + '\'' +
                ", control_plaga='" + control_plaga + '\'' +
                ", riego='" + riego + '\'' +
                ", fertilizacion='" + fertilizacion + '\'' +
                ", riesgo='" + riesgo + '\'' +
                ", manejo='" + manejo + '\'' +
                ", alerta='" + alerta + '\'' +
                '}';
    }
}
