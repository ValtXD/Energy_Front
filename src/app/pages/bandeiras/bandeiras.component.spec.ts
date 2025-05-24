import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeirasComponent } from './bandeiras.component';

describe('BandeirasComponent', () => {
  let component: BandeirasComponent;
  let fixture: ComponentFixture<BandeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandeirasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
