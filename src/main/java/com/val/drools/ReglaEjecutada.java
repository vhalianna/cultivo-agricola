package com.val.drools;

public class ReglaEjecutada {

    private int orden;
    private String nombre;
    private int salience;

    public ReglaEjecutada() {
    }

    public ReglaEjecutada(int orden, String nombre, int salience) {
        this.orden = orden;
        this.nombre = nombre;
        this.salience = salience;
    }

    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getSalience() {
        return salience;
    }

    public void setSalience(int salience) {
        this.salience = salience;
    }

    @Override
    public String toString() {
        return "ReglaEjecutada{" +
                "orden=" + orden +
                ", nombre='" + nombre + '\'' +
                ", salience=" + salience +
                '}';
    }
}