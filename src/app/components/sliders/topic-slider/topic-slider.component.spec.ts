import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSliderComponent } from './topic-slider.component';

describe('TopicSliderComponent', () => {
  let component: TopicSliderComponent;
  let fixture: ComponentFixture<TopicSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
