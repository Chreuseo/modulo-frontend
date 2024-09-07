import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoDetailTextComponent } from './spo-detail-text.component';

describe('SpoDetailTextComponent', () => {
  let component: SpoDetailTextComponent;
  let fixture: ComponentFixture<SpoDetailTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpoDetailTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoDetailTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
