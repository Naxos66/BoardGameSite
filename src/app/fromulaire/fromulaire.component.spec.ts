import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromulaireComponent } from './fromulaire.component';

describe('FromulaireComponent', () => {
  let component: FromulaireComponent;
  let fixture: ComponentFixture<FromulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromulaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
