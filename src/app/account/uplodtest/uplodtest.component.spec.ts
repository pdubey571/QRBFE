import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodtestComponent } from './uplodtest.component';

describe('UplodtestComponent', () => {
  let component: UplodtestComponent;
  let fixture: ComponentFixture<UplodtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplodtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UplodtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
