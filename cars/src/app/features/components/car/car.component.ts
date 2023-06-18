import { Component, Input, OnInit } from '@angular/core';
import { CarDetails } from '../../models/car-details.interface';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  @Input() car!: CarDetails;

  constructor() { }

  ngOnInit(): void {
  }

  openVideo(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }

}
