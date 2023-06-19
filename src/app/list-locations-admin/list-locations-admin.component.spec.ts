import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationsAdminComponent } from './list-locations-admin.component';

describe('ListLocationsAdminComponent', () => {
  let component: ListLocationsAdminComponent;
  let fixture: ComponentFixture<ListLocationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLocationsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLocationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
