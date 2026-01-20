export class SituacionAgricola {
  // Entradas (Valores por defecto IGUALES al Java)
  cultivo: string = 'MAIZ';
  ph_suelo: string = 'NORMAL';
  temperatura: string = 'MEDIA';
  humedad_suelo: string = 'NORMAL';
  humedad_amb: string = 'NORMAL';
  precipitaciones: string = 'NORMALES';
  plaga: string = 'NINGUNA';
  nutrientes: string = 'ADECUADOS';
  historial_plagas: string = 'BAJO';

  // Salidas (Opcionales porque vienen null al principio)
  enmienda_suelo?: string;
  control_plaga?: string;
  riego?: string;
  fertilizacion?: string;
  riesgo?: string;
  manejo?: string;
  alerta?: string;
}
