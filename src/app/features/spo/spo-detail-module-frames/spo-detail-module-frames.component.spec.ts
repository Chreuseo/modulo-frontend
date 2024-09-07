import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoDetailModuleFramesComponent } from './spo-detail-module-frames.component';

describe('SpoDetailModuleFramesComponent', () => {
  let component: SpoDetailModuleFramesComponent;
  let fixture: ComponentFixture<SpoDetailModuleFramesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpoDetailModuleFramesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoDetailModuleFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
