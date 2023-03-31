import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsAllComponent } from './locations-all.component';

describe('LocationsAllComponent', () => {
  let component: LocationsAllComponent;
  let fixture: ComponentFixture<LocationsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
