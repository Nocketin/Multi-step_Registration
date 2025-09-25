import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStepComponent } from './choose-step.component';

describe('ChooseStepComponent', () => {
  let component: ChooseStepComponent;
  let fixture: ComponentFixture<ChooseStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
