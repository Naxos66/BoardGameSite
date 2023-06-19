import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationsEncoursAdminComponent } from './list-locations-encours-admin.component';

describe('ListLocationsEncoursAdminComponent', () => {
  let component: ListLocationsEncoursAdminComponent;
  let fixture: ComponentFixture<ListLocationsEncoursAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLocationsEncoursAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLocationsEncoursAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
