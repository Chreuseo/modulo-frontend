import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoListComponent } from './spo-list.component';

describe('SpoListComponent', () => {
  let component: SpoListComponent;
  let fixture: ComponentFixture<SpoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
