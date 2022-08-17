import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewBlogComponent } from './my-new-blog.component';

describe('MyNewBlogComponent', () => {
  let component: MyNewBlogComponent;
  let fixture: ComponentFixture<MyNewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNewBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
