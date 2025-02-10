import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexTestComponent } from './flex-test.component';

describe('FlexTestComponent', () => {
  let component: FlexTestComponent;
  let fixture: ComponentFixture<FlexTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
