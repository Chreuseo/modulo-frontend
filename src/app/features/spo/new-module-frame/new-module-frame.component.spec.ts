import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModuleFrameComponent } from './new-module-frame.component';

describe('NewModuleFrameComponent', () => {
  let component: NewModuleFrameComponent;
  let fixture: ComponentFixture<NewModuleFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewModuleFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewModuleFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
