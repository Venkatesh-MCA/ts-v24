import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoformComponent } from './videoform.component';

describe('VideoformComponent', () => {
  let component: VideoformComponent;
  let fixture: ComponentFixture<VideoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
