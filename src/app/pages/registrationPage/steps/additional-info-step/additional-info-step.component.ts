import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { COUNTRIES, GENDERS } from '../../models';
import { nameValidator } from '../../validators';
import { CustomInputComponent } from '../../components/CustomInput/custom-input.component';
import { CustomButtonComponent } from '../../components/CustomButton/custom-button.component';
import { WhiteButtonComponent } from '../../components/WhiteButton/white-button.component';

@Component({
  selector: 'app-additional-info-step',
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent, CustomButtonComponent, WhiteButtonComponent],
  templateUrl: './additional-info-step.component.html',
  styleUrls: ['./additional-info-step.component.css'],
  standalone: true,
})
export class AdditionalInfoStepComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Output() stepChanged = new EventEmitter<number>();

  countries = COUNTRIES;
  genders = GENDERS;
  isMinor = false;

  ngOnInit() {
    const guardianGroup = this.parentForm.get('guardianData') as FormGroup;
    if (!guardianGroup) {
      this.parentForm.addControl('guardianData', new FormGroup({
        name: new FormControl('', [Validators.required, nameValidator]),
        email: new FormControl('', [Validators.required, Validators.email])
      }));
    }

    this.parentForm.get('birthDate')?.valueChanges.subscribe(value => {
      this.checkAge(value);
    });
  }

  checkAge(birthDate: string) {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    this.isMinor = age < 18;

    const guardianGroup = this.parentForm.get('guardianData');
    if (guardianGroup) {
      if (this.isMinor) {
        guardianGroup.enable();
      } else {
        guardianGroup.disable();
        guardianGroup.reset();
      }
    }
  }

  onBirthDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.checkAge(value);
  }

  getControl(path: string): FormControl {
    return this.parentForm.get(path) as FormControl;
  }

  proceed() {
    const addressValid = this.parentForm.get('address')?.valid;
    const birthDateValid = this.parentForm.get('birthDate')?.valid;
    const genderValid = this.parentForm.get('gender')?.valid;

    if (addressValid && birthDateValid && genderValid) {
      this.stepChanged.emit(3);
    } else {
      this.parentForm.get('address')?.markAllAsTouched();
      this.parentForm.get('birthDate')?.markAsTouched();
      this.parentForm.get('gender')?.markAsTouched();
    }
  }

  goBack() {
    this.stepChanged.emit(0);
  }
}
