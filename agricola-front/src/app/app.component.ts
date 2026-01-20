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

  // Listas para los desplegables (Selects) - Todo en MAYÚSCULAS
  cultivos = ['MAIZ', 'TRIGO', 'SOJA', 'HORTALIZAS', 'FRUTALES'];
  niveles = ['BAJO', 'NORMAL', 'ALTO'];
  nivelesTemp = ['BAJA', 'MEDIA', 'ALTA'];
  precipitaciones = ['BAJAS', 'NORMALES', 'ALTAS'];
  plagas = ['NINGUNA', 'INSECTOS', 'HONGOS', 'MALEZAS'];
  nutrientes = ['BAJOS', 'ADECUADOS', 'ALTOS'];
  historial = ['BAJO', 'MEDIO', 'ALTO'];

  constructor(private http: HttpClient) {}

  evaluar() {
    this.loading = true;
    this.errorMessage = '';
    this.resultado = null;

    // Conectamos con el Backend Java corriendo en el puerto 8080
    this.http.post<SituacionAgricola>('http://localhost:8080/api/agricola/diagnosticar', this.situacion)
      .subscribe({
        next: (data) => {
          this.resultado = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error de conexión:', err);
          this.errorMessage = 'No se pudo conectar con el Sistema Experto. ¿Está corriendo el backend Java?';
          this.loading = false;
        }
      });
  }
}
