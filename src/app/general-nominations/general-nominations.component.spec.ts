import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNominationsComponent } from './general-nominations.component';

describe('GeneralNominationsComponent', () => {
  let component: GeneralNominationsComponent;
  let fixture: ComponentFixture<GeneralNominationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralNominationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
