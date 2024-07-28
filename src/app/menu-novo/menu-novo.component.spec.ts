import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNovoComponent } from './menu-novo.component';

describe('MenuNovoComponent', () => {
  let component: MenuNovoComponent;
  let fixture: ComponentFixture<MenuNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNovoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
