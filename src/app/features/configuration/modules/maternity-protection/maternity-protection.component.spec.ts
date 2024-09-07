import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityProtectionComponent } from './maternity-protection.component';

describe('MaternityProtectionComponent', () => {
  let component: MaternityProtectionComponent;
  let fixture: ComponentFixture<MaternityProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaternityProtectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaternityProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
