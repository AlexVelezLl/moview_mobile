import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EskeletonWatchlistComponent } from './eskeleton-watchlist.component';

describe('EskeletonWatchlistComponent', () => {
  let component: EskeletonWatchlistComponent;
  let fixture: ComponentFixture<EskeletonWatchlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EskeletonWatchlistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EskeletonWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
