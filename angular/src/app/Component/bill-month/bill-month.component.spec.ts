import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillMonthComponent } from './bill-month.component';

describe('BillMonthComponent', () => {
  let component: BillMonthComponent;
  let fixture: ComponentFixture<BillMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillMonthComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
