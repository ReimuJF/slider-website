import {Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppService} from "./app.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppService, CommonModule, RouterOutlet, NgOptimizedImage, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  index = 0;
  itemsProd: any[] = [];
  itemsWhy: any[] = [];
  currentOrder: any[] = [];
  loaderShowed = true;
  loader = true;

  orderImageStyle: any;
  mainImageStyle: any;

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  })
  currencyArray = [
    {currency: '$', coefficient: 1},
    {currency: '₽', coefficient: 92.16},
    {currency: 'BYN', coefficient: 3.30},
    {currency: '€', coefficient: 0.93},
    {currency: '¥', coefficient: 7.14}
  ];
  currency = this.currencyArray[this.index].currency;
  coefficient = this.currencyArray[this.index].coefficient

  constructor( private fb: FormBuilder, private appService: AppService) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.orderImageStyle = {transform: `translate(-${((e.clientX * 0.05) / 16)}px,-${((e.clientY * 0.1) / 16)}px)` };
    this.mainImageStyle = {transform: `translate(-${((e.clientX * 0.05) / 16)}px,-${((e.clientY * 0.1) / 16)}px)` };
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.prepareDataForForm(burger);
    }
  }

  prepareDataForForm(burger: any) {

    if (this.currentOrder.hasOwnProperty(burger.title)) {
      this.currentOrder[burger.title].count++;
      this.currentOrder[burger.title].price += Number(burger.price);
    } else {
      this.currentOrder[burger.title] = {count: 1, price: Number(burger.price)};
    }
    this.feelForm();
  }

  feelForm() {
    let currentOrderForPrint: any[] = [];
    for (let i in this.currentOrder) {
      currentOrderForPrint.push(`${i} ${this.currentOrder[i].count} шт. (${+this.currentOrder[i].price.toFixed(1)} ${this.currency})`);
    }

    this.form.patchValue({"order": currentOrderForPrint.join(', ')});
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.form.reset();
              for (let i in this.currentOrder) {
                delete this.currentOrder[i];
              }
            },
            error: (response) => {
              alert(response.error.message);
            },
          }
        );
    }
  }

  changeCurrency() {
    //this.index++;
    this.currency = this.currencyArray[++this.index % this.currencyArray.length].currency;
    this.coefficient = this.currencyArray[this.index % this.currencyArray.length].coefficient;
    this.itemsProd.forEach((item) => {
      item.price = +(item.basePrice * this.coefficient).toFixed(1);
      if (this.currentOrder.hasOwnProperty(item.title)) {
        this.currentOrder[item.title].price = +(item.price * this.currentOrder[item.title].count).toFixed(1);
      }
    })
    this.feelForm();
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaderShowed = false;
    }, 2000);
    setTimeout(() => {
      this.loader = false;
    }, 3000);
    this.appService.getItemsProd().subscribe((data: any[]) => {
      this.itemsProd = data;
    });
    this.appService.getItemsWhy().subscribe((data: any[]) => {
      this.itemsWhy = data;
    });

  }

}



