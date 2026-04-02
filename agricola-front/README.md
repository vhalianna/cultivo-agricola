# 🌱 Sistema Experto de Asesoría Agrícola

![Angular](https://img.shields.io/badge/Angular-17-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-green)
![Drools](https://img.shields.io/badge/Drools-Rule%20Engine-orange)
![Status](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)
![UNPA](https://img.shields.io/badge/UNPA-UARG-blue)
![Materia](https://img.shields.io/badge/Materia-Programación%20Lógica%20y%20Funcional-purple)

---

## 📌 Descripción del proyecto

Este proyecto consiste en el desarrollo de un **sistema experto basado en reglas**, orientado a la asesoría agrícola, implementado en el marco de la asignatura **Programación Lógica y Funcional (2025)**.

El sistema modela conocimiento agronómico mediante reglas declarativas, permitiendo **automatizar la toma de decisiones** a partir de variables del entorno, simulando el razonamiento de un especialista.

---

## 🧠 ¿Qué hace el sistema?

A partir de una situación agrícola ingresada por el usuario, el sistema analiza variables como:

* Tipo de cultivo
* pH del suelo
* Temperatura
* Humedad del suelo y ambiente
* Precipitaciones
* Presencia de plagas
* Nivel de nutrientes
* Historial de plagas

Y genera un diagnóstico que incluye:

* 🌡️ Nivel de riesgo
* 🌱 Manejo recomendado
* 💧 Acciones de riego
* 🐛 Control de plagas
* 🌿 Fertilización
* 🧪 Enmienda del suelo
* ⚠️ Alertas

---

## 🔍 Transparencia del razonamiento

El sistema permite visualizar:

* ✔️ Reglas ejecutadas
* 🔢 Orden de ejecución
* ⚡ Prioridad de reglas (salience)

Esto facilita la **interpretabilidad del modelo**, característica clave en sistemas expertos.

---

## 🏗️ Arquitectura del sistema

El sistema está diseñado bajo una arquitectura desacoplada en tres capas:

* 🎨 **Frontend:** Angular
* ⚙️ **Backend:** Spring Boot (API REST)
* 🧠 **Motor de reglas:** Drools

### ✅ Ventajas

* Separación de responsabilidades
* Escalabilidad
* Mantenibilidad
* Flexibilidad para evolución del sistema

---

## ⚙️ Tecnologías utilizadas

* Angular 17.3.17
* TypeScript
* Bootstrap
* Java
* Spring Boot
* Drools (Rule Engine)

---

## 🚀 Ejecución del proyecto

### 📌 Frontend

```bash
ng serve
```

Abrir en navegador:

```
http://localhost:4200/
```

---

### 📌 Backend

(Ejecutar desde el proyecto Spring Boot)

```bash
mvn spring-boot:run
```

---

## 🧩 Generación de componentes (Angular)

```bash
ng generate component nombre-componente
```

Otros:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

## 🏗️ Build del proyecto

```bash
ng build
```

Salida en:

```
dist/
```

---

## 🧪 Pruebas

### Tests unitarios

```bash
ng test
```

### Tests end-to-end

```bash
ng e2e
```

⚠️ Requiere configuración previa de herramienta e2e.

---

## 📊 Funcionalidades principales

* ✔️ Consulta individual de escenarios agrícolas
* 🧪 Laboratorio de simulación de escenarios
* 📋 Visualización de reglas ejecutadas
* ⚡ Identificación de prioridades (salience)
* 🎨 Interfaz visual con codificación por colores

---

## 🧠 Modelo de conocimiento

El sistema se basa en un conjunto de reglas definidas en Drools, donde:

* Las condiciones representan estados del entorno
* Las acciones definen recomendaciones
* Las prioridades (salience) controlan la ejecución

Esto permite construir un sistema **explicable, modular y extensible**.

---

## ⚠️ Consideraciones

* El comportamiento del sistema depende directamente de la base de reglas
* Es fundamental mantener coherencia entre reglas para evitar conflictos
* El orden de ejecución influye en el resultado final

---

## 🔮 Posibles mejoras

* 🤖 Incorporación de técnicas de IA (Machine Learning)
* 🌐 Integración con APIs climáticas
* 📊 Visualización avanzada de datos
* ⚡ Optimización del motor de inferencia
* 📱 Adaptación a dispositivos móviles

---

## 📚 Ayuda adicional

```bash
ng help
```

O visitar:

👉 https://angular.io/cli

---

## 👩‍💻 Autor

**Valeria Eliana Ojeda Muñoz**
Universidad Nacional de la Patagonia Austral (UNPA) – UARG

---

## 📄 Licencia

Este proyecto es de uso académico.
