import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../components/CustomButton/custom-button.component';
import { WhiteButtonComponent } from '../../components/WhiteButton/white-button.component';
import { COUNTRIES, GENDERS } from '../../models';

@Component({
  selector: 'app-confirmation-step',
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent, WhiteButtonComponent],
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.css'],
  standalone: true
})
export class ConfirmationStepComponent {
  @Input() parentForm!: FormGroup;
  @Output() stepChanged = new EventEmitter<number>();
  @Output() registrationCompleted = new EventEmitter<void>();



  get canComplete(): boolean {
    return this.parentForm.get('acceptTerms')?.value === true && 
           this.parentForm.get('acceptPrivacy')?.value === true;
  }

  completeRegistration() {
    const acceptTermsValid = this.parentForm.get('acceptTerms')?.valid;
    const acceptPrivacyValid = this.parentForm.get('acceptPrivacy')?.valid;

    if (acceptTermsValid && acceptPrivacyValid) {
      this.registrationCompleted.emit();
    } else {
      this.parentForm.get('acceptTerms')?.markAsTouched();
      this.parentForm.get('acceptPrivacy')?.markAsTouched();
    }
  }

  goBack() {
    this.stepChanged.emit(2);
  }
}
