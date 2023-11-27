import { Component, Input, OnDestroy ,Output, AfterViewInit, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges, OnDestroy,OnInit, AfterViewInit{

  img: string = '';

  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change just img => ', this.img);
  }

  @Input() alt: string = "";

  @Output() loaded = new EventEmitter<string>();

  counter = 0;
  counterFn: number | undefined;

  constructor(){
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', 'imgValue =>', this.img);
  }

  ngOnInit(): void {
    console.log('ngOnInit', 'imgValue =>', this.img);
    this.counterFn = window.setInterval(() =>{
      this.counter += 1;
      console.log('run counter')
    }, 1000)
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);
  }

  imageDeafult = './assets/images/placeholder-img.png';
  imgError(){
    this.img = this.imageDeafult;
  }

  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
