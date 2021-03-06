import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Review } from 'src/app/models/interfaces.model';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.scss'],
})
export class CardReviewComponent implements OnInit {
  @Input() review: Review;

  constructor(private nav: NavController) {}

  ngOnInit() {}
}
