import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFrameDetailComponent } from './module-frame-detail.component';

describe('ModuleFrameDetailComponent', () => {
  let component: ModuleFrameDetailComponent;
  let fixture: ComponentFixture<ModuleFrameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleFrameDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleFrameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
