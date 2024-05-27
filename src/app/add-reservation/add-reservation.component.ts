import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent {
  reservationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.reservationForm = this.fb.group({
      userName: ['', Validators.required],
      reservationDate: ['', Validators.required],
      reservationType: ['', Validators.required],
      participants: ['', [Validators.required, Validators.min(1)]],
      langueFr: [false],
      langueEn: [false],
      langueEs: [false],
      besoinMicro: [false],
      besoinProjecteur: [false],
      tableauBlanc: [false],
      stylos: [false],
      bouteillesEau: [false]
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // Effectuez l'action d'enregistrement ici (par exemple, envoyer les données au serveur)
      console.log(this.reservationForm.value);
      // Redirigez vers la liste des réservations après l'enregistrement
      this.router.navigate(['/reservations']);
    }
  }

  onCancel() {
    this.router.navigate(['/reservations']);
  }
}
