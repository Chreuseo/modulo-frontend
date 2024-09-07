import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoDetailOverviewComponent } from './spo-detail-overview.component';

describe('SpoDetailComponent', () => {
  let component: SpoDetailOverviewComponent;
  let fixture: ComponentFixture<SpoDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpoDetailOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
