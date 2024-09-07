import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpoComponent } from './new-spo.component';

describe('NewSpoComponent', () => {
  let component: NewSpoComponent;
  let fixture: ComponentFixture<NewSpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
