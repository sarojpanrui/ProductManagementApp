import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsellingProductComponent } from './topselling-product.component';

describe('TopsellingProductComponent', () => {
  let component: TopsellingProductComponent;
  let fixture: ComponentFixture<TopsellingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopsellingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopsellingProductComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
