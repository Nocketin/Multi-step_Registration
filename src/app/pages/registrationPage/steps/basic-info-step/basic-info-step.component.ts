import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { COUNTRIES } from '../../models';
import { CustomButtonComponent } from '../../components/CustomButton/custom-button.component';
import { CustomInputComponent } from '../../components/CustomInput/custom-input.component';
import { WhiteButtonComponent } from '../../components/WhiteButton/white-button.component';

const PHONE_MASKS: { [key: string]: string } = {
  'RU': '+7 (999) 999-99-99',
  'BY': '+375 (29) 999-99-99',
  'KZ': '+7 (799) 999-99-99',
  'UA': '+380 (99) 999-99-99',
  'US': '+1 (999) 999-9999',
  'DE': '+49 (999) 999-9999',
  'FR': '+33 (999) 999-999',
  'GB': '+44 (999) 999-9999',
  'CA': '+1 (999) 999-9999',
  'AU': '+61 (999) 999-999'
};

@Component({
  selector: 'app-basic-info-step',
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent, CustomInputComponent, WhiteButtonComponent],
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.css'],
  standalone: true,
})
export class BasicInfoStepComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Output() stepChanged = new EventEmitter<number>();
  
  countries = COUNTRIES;
  selectedCountry: string = '';
  phoneMask: string = '';
  showPhone: boolean = false;

  ngOnInit() {
    this.parentForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedCountry = country;
      this.phoneMask = PHONE_MASKS[country] || '';
      this.showPhone = !!country;

      if (!country) {
        this.parentForm.get('phone')?.reset();
      }
    });
  }

  getControl(path: string): FormControl {
    return this.parentForm.get(path) as FormControl;
  }

  proceed() {
    const emailValid = this.parentForm.get('email')?.valid;
    const nameValid = this.parentForm.get('name')?.valid;
    const countryValid = this.parentForm.get('country')?.valid;

    if (emailValid && nameValid && countryValid) {
      this.stepChanged.emit(2);
    } else {
      this.parentForm.get('email')?.markAsTouched();
      this.parentForm.get('name')?.markAsTouched();
      this.parentForm.get('country')?.markAsTouched();
    }
  }

  goBack() {
    this.stepChanged.emit(0);
  }
}
