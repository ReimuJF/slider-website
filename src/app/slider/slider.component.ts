import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {


  index: number = 0;
  data: any = [{
    id: 1,
    alt: "сухпаек",
    src: "./assets/images/rectangle.png",
    title: "Cухой Паек Армейский",
    rating: 1,
    tag: "disapointment"
  },
  {
    id: 2,
    alt: "тунец",
    src: "./assets/images/image-2.png",
    title: "Тунец филе натуральный экстра",
    rating: 4,
    tag: "angry"
  },
  {
    id: 3,
    alt: "филе",
    src: "./assets/images/image-4.png",
    title: "Куриное филе бедра",
    rating: 5,
    tag: "alien"
  },
  {
    id: 4,
    alt: "сухпаек",
    src: "./assets/images/rectangle.png",
    title: "Cухой Паек Армейский",
    rating: 1,
    tag: "disapointment"
  },
  {
    id: 5,
    alt: "тунец",
    src: "./assets/images/image-2.png",
    title: "Тунец филе натуральный экстра",
    rating: 4,
    tag: "angry"
  },
  {
    id: 6,
    alt: "филе",
    src: "./assets/images/image-4.png",
    title: "Куриное филе бедра",
    rating: 5,
    tag: "alien"
  }
  ];
  currentData: any;
  prevData: any;
  nextData: any;

  changeData() {
    this.currentData = this.data[this.index];
    this.prevData = this.data[(this.index - 1) < 0 ? this.data.length - 1 : this.index - 1];
    this.nextData = this.data[(this.index + 1) > this.data.length - 1 ? 0 : this.index + 1];
  }

  changeLeft() {
    this.index = (this.index - 1) < 0 ? this.data.length - 1 : this.index - 1;
    this.changeData();
  }

  changeRight() {
    this.index = (this.index + 1) > this.data.length - 1 ? 0 : this.index + 1;
    this.changeData();
   }

  changeRating(value: number) {
    this.currentData.rating = value;
  }
  
  ngOnInit(): void {
    this.changeData();
  }
}
