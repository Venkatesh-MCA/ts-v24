import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualgroupstrengthComponent } from './virtualgroupstrength.component';

describe('VirtualgroupstrengthComponent', () => {
  let component: VirtualgroupstrengthComponent;
  let fixture: ComponentFixture<VirtualgroupstrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualgroupstrengthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualgroupstrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
