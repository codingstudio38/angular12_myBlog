import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearchBoxComponent } from './header-search-box.component';

describe('HeaderSearchBoxComponent', () => {
  let component: HeaderSearchBoxComponent;
  let fixture: ComponentFixture<HeaderSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
