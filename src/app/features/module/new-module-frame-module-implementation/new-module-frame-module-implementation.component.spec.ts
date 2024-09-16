import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModuleFrameModuleImplementationComponent } from './new-module-frame-module-implementation.component';

describe('NewModuleFrameModuleImplementationComponent', () => {
  let component: NewModuleFrameModuleImplementationComponent;
  let fixture: ComponentFixture<NewModuleFrameModuleImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewModuleFrameModuleImplementationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewModuleFrameModuleImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
