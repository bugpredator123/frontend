import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages=null;
  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    this.dataService.getMessage().subscribe(
      (res)=>{
        this.messages = res;
      },
      (err)=>console.log(err)
    );
  }
  ngAfterViewInit(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
}
