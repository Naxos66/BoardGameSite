import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-modifier-location',
  templateUrl: './modifier-location.component.html',
  styleUrls: ['./modifier-location.component.scss']
})
export class ModifierLocationComponent implements OnInit {
  locationForm!: FormGroup;
  locationId!: any;
  location!: Location;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    if (this.locationId) {
      this.db.object<Location>(`LOCATIONS/${this.locationId}`).valueChanges().subscribe((location) => {
        if (location) {
          this.location = location;
          this.locationForm.patchValue(this.location);
        }
      });
    }
  }

  initForm(): void {
    this.locationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      photo: ['', Validators.required],
    });

  }
  updateLocation(): void {
    const updatedLocation: Location = this.locationForm.value;
    this.db.object(`LOCATIONS/${this.locationId}`).update(updatedLocation);
  }

  resetForm(): void {
    if (this.location) {
      this.locationForm.patchValue(this.location);
    } else {
      this.locationForm.reset();
    }
  }
}

