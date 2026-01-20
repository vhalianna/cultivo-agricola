package com.val.drools;

public class SituacionAgricola {

    // ==========================================
    // Atributos de Entrada (Condiciones / Óvalos)
    // ==========================================
    private String cultivo;
    private String ph_suelo;
    private String temperatura;
    private String humedad_suelo;
    private String humedad_amb;
    private String precipitaciones;
    private String plaga;
    private String nutrientes;
    private String historial_plagas;

    // ==========================================
    // Atributos de Salida (Hechos Generados)
    // ==========================================
    private String enmienda_suelo = "NINGUNA";
    private String control_plaga = "NINGUNO";
    private String riego = "NORMAL";
    private String fertilizacion = "NO_NECESARIA";
    private String riesgo = "BAJO";
    private String manejo = "CONVENCIONAL";
    private String alerta = "NO";

    public SituacionAgricola() {
        // Constructor vacío requerido/recomendado para Drools
    }

    // ==========================================
    // Getters y Setters - ENTRADA
    // ==========================================
    public String getCultivo() {
        return cultivo;
    }

    public void setCultivo(String cultivo) {
        this.cultivo = cultivo;
    }

    public String getPh_suelo() {
        return ph_suelo;
    }

    public void setPh_suelo(String ph_suelo) {
        this.ph_suelo = ph_suelo;
    }

    public String getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(String temperatura) {
        this.temperatura = temperatura;
    }

    public String getHumedad_suelo() {
        return humedad_suelo;
    }

    public void setHumedad_suelo(String humedad_suelo) {
        this.humedad_suelo = humedad_suelo;
    }

    public String getHumedad_amb() {
        return humedad_amb;
    }

    public void setHumedad_amb(String humedad_amb) {
        this.humedad_amb = humedad_amb;
    }

    public String getPrecipitaciones() {
        return precipitaciones;
    }

    public void setPrecipitaciones(String precipitaciones) {
        this.precipitaciones = precipitaciones;
    }

    public String getPlaga() {
        return plaga;
    }

    public void setPlaga(String plaga) {
        this.plaga = plaga;
    }

    public String getNutrientes() {
        return nutrientes;
    }

    public void setNutrientes(String nutrientes) {
        this.nutrientes = nutrientes;
    }

    public String getHistorial_plagas() {
        return historial_plagas;
    }

    public void setHistorial_plagas(String historial_plagas) {
        this.historial_plagas = historial_plagas;
    }

    // ==========================================
    // Getters y Setters - SALIDA
    // ==========================================
    public String getEnmienda_suelo() {
        return enmienda_suelo;
    }

    public void setEnmienda_suelo(String enmienda_suelo) {
        this.enmienda_suelo = enmienda_suelo;
    }

    public String getControl_plaga() {
        return control_plaga;
    }

    public void setControl_plaga(String control_plaga) {
        this.control_plaga = control_plaga;
    }

    public String getRiego() {
        return riego;
    }

    public void setRiego(String riego) {
        this.riego = riego;
    }

    public String getFertilizacion() {
        return fertilizacion;
    }

    public void setFertilizacion(String fertilizacion) {
        this.fertilizacion = fertilizacion;
    }

    public String getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(String riesgo) {
        this.riesgo = riesgo;
    }

    public String getManejo() {
        return manejo;
    }

    public void setManejo(String manejo) {
        this.manejo = manejo;
    }

    public String getAlerta() {
        return alerta;
    }

    public void setAlerta(String alerta) {
        this.alerta = alerta;
    }

    // ==========================================
    // Utilidad para debugging
    // ==========================================
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
