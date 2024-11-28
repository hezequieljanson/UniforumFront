import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGroupsComponent } from './recent-groups.component';

describe('RecentGroupsComponent', () => {
  let component: RecentGroupsComponent;
  let fixture: ComponentFixture<RecentGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
