export interface ReglaEjecutada {
  orden: number;
  nombre: string;
  salience: number;
}

export class SituacionAgricola {
  // Entradas
  cultivo: string = 'MAIZ';
  ph_suelo: string = 'NORMAL';
  temperatura: string = 'MEDIA';
  humedad_suelo: string = 'NORMAL';
  humedad_amb: string = 'NORMAL';
  precipitaciones: string = 'NORMALES';
  plaga: string = 'NINGUNA';
  nutrientes: string = 'ADECUADOS';
  historial_plagas: string = 'BAJO';

  // Salidas
  enmienda_suelo?: string;
  control_plaga?: string;
  riego?: string;
  fertilizacion?: string;
  riesgo?: string;
  manejo?: string;
  alerta?: string;

  // Reglas disparadas
  reglasDisparadas?: ReglaEjecutada[];
}
