import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent {
  sessionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.sessionForm = this.fb.group({
      sessionName: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      sessionType: ['', Validators.required],
      projecteur: [false],
      tableauBlanc: [false],
      ordinateurs: [false],
      bouteillesEau: [false]
    });
  }

  onSubmit() {
    if (this.sessionForm.valid) {
      // Effectuez l'action d'enregistrement ici (par exemple, envoyer les données au serveur)
      console.log(this.sessionForm.value);
      // Redirigez vers la liste des sessions après l'enregistrement
      this.router.navigate(['/sessions']);
    }
  }

  onCancel() {
    this.router.navigate(['/sessions']);
  }
}
