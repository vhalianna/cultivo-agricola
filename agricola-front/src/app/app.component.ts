import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // Para [(ngModel)]
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Para conectar con Java
import { SituacionAgricola } from './situacion.model';

@Component({
  selector: 'app-root',
  standalone: true, // ¡Importante! Componente autónomo
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  situacion: SituacionAgricola = new SituacionAgricola();
  resultado: SituacionAgricola | null = null;
  loading = false;
  errorMessage = '';
  resultadosLote: SituacionAgricola[] = [];
  mostrarTabla = false;
  loadingBatch = false;

  // Listas para los desplegables (Selects) - Todo en MAYÚSCULAS
  cultivos = ['MAIZ', 'TRIGO', 'SOJA', 'HORTALIZAS', 'FRUTALES'];
  niveles = ['BAJO', 'NORMAL', 'ALTO'];
  nivelesTemp = ['BAJA', 'MEDIA', 'ALTA'];
  precipitaciones = ['BAJAS', 'NORMALES', 'ALTAS'];
  plagas = ['NINGUNA', 'INSECTOS', 'HONGOS', 'MALEZAS'];
  nutrientes = ['BAJOS', 'ADECUADOS', 'ALTOS'];
  historial = ['BAJO', 'MEDIO', 'ALTO'];
  // LOS 10 ESCENARIOS EXACTOS DEL DOCX (Transcritos a tu modelo)
  escenariosPrueba: SituacionAgricola[] = [
    {
    cultivo: 'MAIZ', ph_suelo: 'BAJO', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'NINGUNA', nutrientes: 'ADECUADOS', historial_plagas: 'BAJO'
    },
    {
    cultivo: 'HORTALIZAS', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'INSECTOS', nutrientes: 'ADECUADOS', historial_plagas: 'MEDIO'
    },
    {
    cultivo: 'TRIGO', ph_suelo: 'NORMAL', temperatura: 'ALTA', humedad_suelo: 'BAJA',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'NINGUNA', nutrientes: 'ALTOS', historial_plagas: 'BAJO'
    },
    {
    cultivo: 'FRUTALES', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'ALTA', precipitaciones: 'ALTAS', plaga: 'NINGUNA', nutrientes: 'ADECUADOS', historial_plagas: 'MEDIO'
    },
    {
    cultivo: 'SOJA', ph_suelo: 'NORMAL', temperatura: 'ALTA', humedad_suelo: 'BAJA',
    humedad_amb: 'BAJA', precipitaciones: 'BAJAS', plaga: 'NINGUNA', nutrientes: 'BAJOS', historial_plagas: 'BAJO'
    },
    {
    cultivo: 'MAIZ', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'MALEZAS', nutrientes: 'ADECUADOS', historial_plagas: 'MEDIO'
    },
    {
    cultivo: 'TRIGO', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'HONGOS', nutrientes: 'ADECUADOS', historial_plagas: 'ALTO'
    },
    {
    cultivo: 'FRUTALES', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'ALTA', precipitaciones: 'ALTAS', plaga: 'HONGOS', nutrientes: 'BAJOS', historial_plagas: 'ALTO'
    },
    {
    cultivo: 'HORTALIZAS', ph_suelo: 'NORMAL', temperatura: 'ALTA', humedad_suelo: 'BAJA',
    humedad_amb: 'NORMAL', precipitaciones: 'BAJAS', plaga: 'INSECTOS', nutrientes: 'BAJOS', historial_plagas: 'ALTO'
    },
    {
    cultivo: 'SOJA', ph_suelo: 'ALTO', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
    humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'NINGUNA', nutrientes: 'ALTOS', historial_plagas: 'ALTO'
    },
    // ... tus 10 escenarios anteriores ...

        // CASO 11: La Trampa de Seguridad (Hongo vs Sequía)
        // Objetivo: Probar si la Regla 20 (Seguridad) realmente gana a la Regla 10 (Sequía).
        // Conflicto: Hay sequía (pide AGUA) pero hay hongos (PROHIBIDO AGUA).
        {
          cultivo: 'VID', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'BAJA',
          humedad_amb: 'ALTA', precipitaciones: 'BAJAS', plaga: 'HONGOS', nutrientes: 'ADECUADOS', historial_plagas: 'BAJO'
        },

        // CASO 12: El Dilema del pH (Acidez + Calor Extremo)
        // Objetivo: Ver si Drools puede aplicar DOS correcciones independientes sin bloquearse.
        // Conflicto: Debe aplicar CAL (R1) y al mismo tiempo corregir RIEGO (R3).
        // Si una regla usa "modify" incorrectamente, podría cancelar a la otra.
        {
          cultivo: 'MAIZ', ph_suelo: 'BAJO', temperatura: 'ALTA', humedad_suelo: 'BAJA',
          humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'NINGUNA', nutrientes: 'ADECUADOS', historial_plagas: 'BAJO'
        },

        // CASO 13: El "Falso Positivo" (Historial Alto sin Plaga)
        // Objetivo: Probar la Jerarquía de Riesgo.
        // Situación: No hay plaga actual, pero el historial es ALTO.
        // ¿El sistema entra en pánico (INTEGRADO) o se mantiene cauto (PREVENTIVO)?
        {
          cultivo: 'SOJA', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
          humedad_amb: 'NORMAL', precipitaciones: 'NORMALES', plaga: 'NINGUNA', nutrientes: 'ADECUADOS', historial_plagas: 'ALTO'
        },

        // ... tus escenarios anteriores ...

            // CASO 14: Conflicto "Hielo vs Sed"
            // Situación: La planta tiene sed (Suelo Seco) pero hace frío (Temp Baja).
            // RIESGO: Si la regla de Sequía gana, regaremos y congelaremos la raíz.
            {
              cultivo: 'MAIZ',
              ph_suelo: 'NORMAL',
              temperatura: 'BAJA',      // <--- Frío
              humedad_suelo: 'BAJA',    // <--- Sequía
              humedad_amb: 'NORMAL',
              precipitaciones: 'BAJAS',
              plaga: 'NINGUNA',
              nutrientes: 'ADECUADOS',
              historial_plagas: 'BAJO'
            },
            // CASO 15: Choque de Jerarquía (Malezas vs Historial)
            {
              cultivo: 'SOJA', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
              humedad_amb: 'NORMAL', precipitaciones: 'NORMALES',
              plaga: 'MALEZAS',        // <--- R7 quiere poner PREVENTIVO
              nutrientes: 'ADECUADOS',
              historial_plagas: 'ALTO' // <--- R16 quiere poner INTEGRADO
            },
            // CASO 16: El "Cóctel Químico"
            // Situación: Plaga activa + Falta de nutrientes.
            // RIESGO: El sistema ordena PESTICIDA y FERTILIZANTE al mismo tiempo.
            // (En la vida real, mezclar ciertos productos puede quemar el cultivo o anular el efecto).
            {
              cultivo: 'HORTALIZAS',
              ph_suelo: 'NORMAL',
              temperatura: 'MEDIA',
              humedad_suelo: 'NORMAL',
              humedad_amb: 'NORMAL',
              precipitaciones: 'NORMALES',
              plaga: 'INSECTOS',     // <--- Requiere Veneno
              nutrientes: 'BAJOS',   // <--- Requiere Fertilizante
              historial_plagas: 'BAJO'
            },
            // ... tus escenarios anteriores ...

                // CASO 17: La "Sobredosis" de Nutrientes
                // Situación: El suelo tiene Nutrientes "ALTOS".
                // PRUEBA: ¿El sistema entiende que "Mucho" no siempre es "Bueno"?
                // RIESGO: Si la regla de fertilización está mal escrita (ej: if nutrientes != ADECUADOS),
                // podría mandar fertilizar y causar toxicidad por exceso.
                {
                  cultivo: 'MAIZ',
                  ph_suelo: 'NORMAL',
                  temperatura: 'MEDIA',
                  humedad_suelo: 'NORMAL',
                  humedad_amb: 'NORMAL',
                  precipitaciones: 'NORMALES',
                  plaga: 'NINGUNA',
                  nutrientes: 'ALTOS',   // <--- Exceso de nutrientes
                  historial_plagas: 'BAJO'
                },

                // CASO 18: El "Veneno Congelado" (Plaga en Helada)
                // Situación: Hay Insectos pero hace Frío Extremo (Temp BAJA).
                // PRUEBA: Ya arreglamos el Riego con frío (R22), ¿pero arreglamos los Pesticidas?
                // RIESGO: Pulverizar químicos a < 5°C es ineficiente y daña la planta (cristalización).
                // ¿El sistema mandará a fumigar igual?
                {
                  cultivo: 'FRUTALES',
                  ph_suelo: 'NORMAL',
                  temperatura: 'BAJA',    // <--- Helada
                  humedad_suelo: 'NORMAL',
                  humedad_amb: 'NORMAL',
                  precipitaciones: 'NORMALES',
                  plaga: 'INSECTOS',      // <--- Plaga activa
                  nutrientes: 'ADECUADOS',
                  historial_plagas: 'BAJO'
                },

              // CASO 19: El Dilema del Calor Húmedo
              {
                cultivo: 'FRUTALES', ph_suelo: 'NORMAL',
                temperatura: 'ALTA',     // <--- R3 pide AUMENTAR FRECUENCIA
                humedad_suelo: 'BAJA',
                humedad_amb: 'ALTA',
                precipitaciones: 'NORMALES',
                plaga: 'HONGOS',         // <--- R20 exige NO REGAR MÁS (MANTENER)
                nutrientes: 'ADECUADOS', historial_plagas: 'BAJO'
              },

                    // CASO 20: El "Efecto Lavado"
                    // Situación: Hay MALEZAS (pide Herbicida) pero LLUEVE mucho.
                    // RIESGO: Contaminación y pérdida de dinero. El sistema NO debe mandar a fumigar.
                    {
                      cultivo: 'SOJA',
                      ph_suelo: 'NORMAL',
                      temperatura: 'MEDIA',
                      humedad_suelo: 'ALTA',
                      humedad_amb: 'ALTA',
                      precipitaciones: 'ALTAS',  // <--- Lluvia fuerte
                      plaga: 'MALEZAS',          // <--- Requiere Herbicida
                      nutrientes: 'ADECUADOS',
                      historial_plagas: 'BAJO'
                    },

                    // CASO 21: La Incoherencia Química (Fertilizante bajo el agua)
                    {
                      cultivo: 'MAIZ', ph_suelo: 'NORMAL', temperatura: 'MEDIA', humedad_suelo: 'NORMAL',
                      humedad_amb: 'NORMAL',
                      precipitaciones: 'ALTAS', // <--- Lluvia fuerte
                      plaga: 'INSECTOS',        // <--- Bloqueado por R26 (Bien)
                      nutrientes: 'BAJOS',      // <--- ¿Bloqueado? (Probablemente No)
                      historial_plagas: 'BAJO'
                    },

                        // CASO 22: El "Techo de Cristal" (Estrés Abiótico Puro)
                        // Situación: Todo está mal (pH, Nutrientes, Historial) pero NO hay plaga.
                        // PRUEBA: ¿Puede el sistema diagnosticar RIESGO ALTO sin ver un bicho?
                        // Si sale BAJO, el sistema subestima problemas de suelo.
                        {
                          cultivo: 'MAIZ',
                          ph_suelo: 'BAJO',         // Malo
                          temperatura: 'MEDIA',
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',         // <--- El factor limitante
                          nutrientes: 'BAJOS',      // Malo
                          historial_plagas: 'ALTO'  // Malo
                        },

                        // CASO 23: El "Sensor Mentiroso" (Inverso al Caso 15)
                        // Situación: Sequía aérea (No llueve) pero Suelo Saturado.
                        // CONFLICTO: ¿Obedece al pronóstico (Regar) o al sensor de suelo (No Regar)?
                        {
                          cultivo: 'SOJA',
                          ph_suelo: 'NORMAL',
                          temperatura: 'ALTA',      // Calor (Pide agua)
                          humedad_suelo: 'ALTA',    // <--- Suelo ya tiene agua
                          humedad_amb: 'BAJA',
                          precipitaciones: 'BAJAS', // <--- No llueve
                          plaga: 'NINGUNA',
                          nutrientes: 'ADECUADOS',
                          historial_plagas: 'BAJO'
                        },

                        // CASO 24: El "Conflicto Preventivo"
                        // Situación: Historial ALTO (Pide acción) en Helada (Prohíbe acción).
                        // PRUEBA: ¿La regla de seguridad R24 bloquea también los tratamientos preventivos?
                        {
                          cultivo: 'VID',
                          ph_suelo: 'NORMAL',
                          temperatura: 'BAJA',      // <--- Helada
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',
                          nutrientes: 'ADECUADOS',
                          historial_plagas: 'ALTO'  // <--- Pide prevención
                        },
                        // CASO 25: El "Cultivo Zombie" (Fallo Sistémico Abiótico)
                            // Situación: Suelo Ácido + Nutrientes Bajos + Sequía.
                            // PERO: Sin Plagas y con Historial Bajo.
                            // CONFLICTO: ¿El sistema marcará RIESGO ALTO por colapso de la planta?
                            // Hipótesis: Dirá RIESGO BAJO (Error de Jerarquía).
                            {
                              cultivo: 'MAIZ',
                              ph_suelo: 'BAJO',        // Mortal
                              temperatura: 'MEDIA',
                              humedad_suelo: 'BAJA',   // Mortal
                              humedad_amb: 'NORMAL',
                              precipitaciones: 'BAJAS',
                              plaga: 'NINGUNA',        // <--- La trampa
                              nutrientes: 'BAJOS',     // Mortal
                              historial_plagas: 'BAJO' // <--- La trampa
                            },
                            // CASO 26: La Tormenta Perfecta (Prueba de Bloqueo Simultáneo)
                                // Situación: Helada + Sequía + Plaga.
                                // CONFLICTO: El sistema debe negar el Agua (por frío) Y negar el Fungicida (por frío).
                                // Si falla, veremos "AUMENTAR_CAUDAL" o "FUNGICIDA".
                                {
                                  cultivo: 'VID',
                                  ph_suelo: 'NORMAL',
                                  temperatura: 'BAJA',      // <--- EL JUEZ (Helada)
                                  humedad_suelo: 'BAJA',    // Pide Agua
                                  humedad_amb: 'NORMAL',
                                  precipitaciones: 'NORMALES',
                                  plaga: 'HONGOS',          // Pide Veneno
                                  nutrientes: 'ADECUADOS',
                                  historial_plagas: 'BAJO'
                                },
                        // CASO 27: La Asimetría del Riego (Herbicida Lavado)
                        // Prueba: ¿El sistema protege los herbicidas igual que protege los fungicidas?
                        // Esperado actual: HERBICIDA + AUMENTAR_CAUDAL (Conflicto técnico).
                        {
                          cultivo: 'SOJA',
                          ph_suelo: 'NORMAL',
                          temperatura: 'MEDIA',
                          humedad_suelo: 'BAJA',    // <--- Pide Riego (R10)
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'BAJAS',
                          plaga: 'MALEZAS',         // <--- Pide Herbicida (R7)
                          nutrientes: 'ADECUADOS',
                          historial_plagas: 'BAJO'
                        },
                        // CASO 28: La Guerra Química (Cal vs Fertilizante)
                        // Prueba: ¿El sistema ordena aplicar todo junto?
                        // Esperado actual: CAL + NECESARIA + RIESGO ALTO.
                        {
                          cultivo: 'MAIZ',
                          ph_suelo: 'BAJO',       // <--- Pide Cal
                          temperatura: 'MEDIA',
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',
                          nutrientes: 'BAJOS',    // <--- Pide Fertilizante
                          historial_plagas: 'BAJO'
                        },
                        // CASO 29: Guerra Química (Cal vs Fertilizante)
                        // Situación: Suelo Ácido (Pide CAL) + Nutrientes Bajos (Pide FERTILIZANTE).
                        // Conflicto: ¿El sistema receta ambos a la vez?
                        {
                          cultivo: 'MAIZ',
                          ph_suelo: 'BAJO',       // Activa R1
                          temperatura: 'MEDIA',
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',
                          nutrientes: 'BAJOS',    // Activa R5
                          historial_plagas: 'BAJO'
                        },
                        // CASO 30: Conflicto Jerárquico (Enmienda vs Historial)
                        // Prueba: ¿La regla de la CAL (R19) respeta el Manejo INTEGRADO?
                        // Esperado: Enmienda CAL, Riesgo ALTO, Manejo INTEGRADO.
                        {
                          cultivo: 'MAIZ',
                          ph_suelo: 'BAJO',        // <--- Activa R1 (Cal) -> Intenta poner PREVENTIVO (R19)
                          temperatura: 'MEDIA',
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',
                          nutrientes: 'ADECUADOS',
                          historial_plagas: 'ALTO' // <--- Activa R11 -> Riesgo ALTO -> Intenta poner INTEGRADO (R16)
                        },
                        // CASO 31: El Olvido Climático (Fertilizante en Helada)
                        // Prueba: Bloqueamos pesticidas con frío, ¿pero fertilizantes?
                        // Resultado Probable: FERTILIZACION NECESARIA (El sistema no lo prohíbe).
                        {
                          cultivo: 'MAIZ',
                          ph_suelo: 'NORMAL',
                          temperatura: 'BAJA',     // <--- Helada
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'NORMAL',
                          precipitaciones: 'NORMALES',
                          plaga: 'NINGUNA',
                          nutrientes: 'BAJOS',     // <--- Pide Fertilizante
                          historial_plagas: 'BAJO'
                        },
                        // CASO 32: Seguridad en Preventivos (Preventivo bajo Lluvia)
                        // Prueba: Frutales con mucha humedad (Pide Fungicida) pero lloviendo.
                        // Esperado: FUNGICIDA bloqueado a MONITOREO.
                        {
                          cultivo: 'FRUTALES',
                          ph_suelo: 'NORMAL',
                          temperatura: 'MEDIA',
                          humedad_suelo: 'NORMAL',
                          humedad_amb: 'ALTA',      // <--- R4 pide FUNGICIDA (Preventivo)
                          precipitaciones: 'ALTAS', // <--- R24 debe bloquearlo
                          plaga: 'NINGUNA',
                          nutrientes: 'ADECUADOS',
                          historial_plagas: 'BAJO'
                        }

    ] as SituacionAgricola[]; // Cast para evitar errores de tipo estrictos si faltan opcionales


  constructor(private http: HttpClient) {}

  getClaseSalience(salience: number): string {
    if (salience >= 2000) return 'bg-danger text-white';
    if (salience >= 1000) return 'bg-warning text-dark';
    if (salience >= 500) return 'bg-info text-dark';
    if (salience > 0) return 'bg-secondary text-white';
    return 'd-none';
  }

  evaluar() {
    this.loading = true;
    this.errorMessage = '';
    this.resultado = null;
    console.log('Situación enviada individual:', this.situacion);
    // Conectamos con el Backend Java corriendo en el puerto 8080
    this.http.post<SituacionAgricola>('http://localhost:8080/api/agricola/diagnosticar', this.situacion)
      .subscribe({
        next: (data) => {
          this.resultado = data;
          this.loading = false;
          console.log('Resultado individual:', data);
        },
        error: (err) => {
          console.error('Error de conexión:', err);
          this.errorMessage = 'No se pudo conectar con el Sistema Experto. ¿Está corriendo el backend Java?';
          this.loading = false;
        }
      });
  }
  // NUEVA FUNCIÓN PARA EL BOTÓN DE LOTES
    ejecutarLote() {
  this.loadingBatch = true;
  this.mostrarTabla = false; // Ocultar mientras carga

      this.http.post<SituacionAgricola[]>('http://localhost:8080/api/agricola/diagnosticar-lote', this.escenariosPrueba)
        .subscribe({
  next: (data) => {
  this.resultadosLote = data;
  this.mostrarTabla = true;
  this.loadingBatch = false;
  },
  error: (err) => {
  console.error('Error en lote:', err);
  this.loadingBatch = false;
  }
  });
  }
}
