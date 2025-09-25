import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChooseStepComponent } from '../steps/choose-step/choose-step.component';
import { BasicInfoStepComponent } from '../steps/basic-info-step/basic-info-step.component';
import { AdditionalInfoStepComponent } from '../steps/additional-info-step/additional-info-step.component';
import { ConfirmationStepComponent } from '../steps/confirmation-step/confirmation-step.component';
import { MOCK_SOCIAL_DATA, SocialType } from '../models';
import { nameValidator } from '../validators';

@Component({
  selector: 'app-registration-shell',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChooseStepComponent,
    BasicInfoStepComponent,
    AdditionalInfoStepComponent,
    ConfirmationStepComponent,
  ],
  templateUrl: './registration-shell.component.html',
  styleUrls: ['./registration-shell.component.css'],
  standalone: true,
})
export class RegistrationShellComponent implements OnInit {
  form!: FormGroup;
  currentStep = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      method: ['', Validators.required],

      socialData: this.fb.group({
        provider: [''],
        email: [''],
        name: [''],
        country: [''],
        phone: [''],
      }),

      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, nameValidator]],
      country: ['', Validators.required],
      phone: [''],

      address: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required]
      }),
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],

      acceptTerms: [false, Validators.requiredTrue],
      acceptPrivacy: [false, Validators.requiredTrue],
      subscribeNewsletter: [false]
    });

    try {
      const savedData = localStorage.getItem('registrationData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.form.patchValue(parsedData);
        console.log('Data restored from localStorage');
      }
    } catch (error) {
      console.error('Error restoring from localStorage:', error);
    }
  }

  onSocialProviderSelected(provider: SocialType) {
    const socialData = MOCK_SOCIAL_DATA[provider];
    
    this.form.patchValue({
      method: 'social',
      socialData: socialData,
    });
  }

  onStepChanged(step: number) {
    this.currentStep = step;
    console.log('Current Form', this.form.value);
  }

  onRegistrationCompleted() {
    const formData = this.form.value;
    console.log('Registration completed:', formData);

    try {
      localStorage.setItem('registrationData', JSON.stringify(formData));
      console.log('Data saved to localStorage successfully');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    alert('Registration completed successfully!');

    this.form.reset();
    this.currentStep = 0;
  }

  
}
