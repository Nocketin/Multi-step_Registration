import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SocialType, SOCIAL_PROVIDERS } from '../../models';

@Component({
  selector: 'app-choose-step',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './choose-step.component.html',
  styleUrls: ['./choose-step.component.css'],
  standalone: true,
})
export class ChooseStepComponent {
  @Input() parentForm!: FormGroup;
  @Output() socialProviderSelected = new EventEmitter<SocialType>();
  @Output() stepChanged = new EventEmitter<number>();

  socialProviders = SOCIAL_PROVIDERS;

  selectMethod(method: 'email' | 'social') {
    this.parentForm.patchValue({ method });
    
    if (method === 'email') {
      this.stepChanged.emit(1);
    }
  }

  selectSocialProvider(provider: string) {
    this.parentForm.patchValue({ method: 'social' });
    
    this.socialProviderSelected.emit(provider as SocialType);
    
    this.stepChanged.emit(2);
  }
}
