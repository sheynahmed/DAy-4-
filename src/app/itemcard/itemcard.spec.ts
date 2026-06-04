import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Itemcard } from './itemcard';

describe('Itemcard', () => {
  let component: Itemcard;
  let fixture: ComponentFixture<Itemcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Itemcard],
    }).compileComponents();

    fixture = TestBed.createComponent(Itemcard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
