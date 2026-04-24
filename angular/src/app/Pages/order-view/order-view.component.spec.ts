import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewComponent } from './order-view.component';

describe('OrderViewComponent', () => {
  let component: OrderViewComponent;
  let fixture: ComponentFixture<OrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
