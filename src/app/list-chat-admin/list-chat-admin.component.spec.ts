import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatAdminComponent } from './list-chat-admin.component';

describe('ListChatAdminComponent', () => {
  let component: ListChatAdminComponent;
  let fixture: ComponentFixture<ListChatAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChatAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
