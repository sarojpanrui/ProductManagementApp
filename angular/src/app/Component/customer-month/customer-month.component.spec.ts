import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMonthComponent } from './customer-month.component';

describe('CustomerMonthComponent', () => {
  let component: CustomerMonthComponent;
  let fixture: ComponentFixture<CustomerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMonthComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
