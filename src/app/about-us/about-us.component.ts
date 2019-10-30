import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  data =[
    { 'name':'john wick 1', 'description':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, rerum beatae. Possimus architecto eos est. Quod sunt eum placeat quasi consectetur, ipsum odio recusandae odit molestiae dolores enim similique ut?'},
    { 'name':'john wick 2', 'description':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, rerum beatae. Possimus architecto eos est. Quod sunt eum placeat quasi consectetur, ipsum odio recusandae odit molestiae dolores enim similique ut?'},
    { 'name':'john wick 3', 'description':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, rerum beatae. Possimus architecto eos est. Quod sunt eum placeat quasi consectetur, ipsum odio recusandae odit molestiae dolores enim similique ut?'},
  ]
  active=0;
  constructor() { }

  ngOnInit() {
  }

}
