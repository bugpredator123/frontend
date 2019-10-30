import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm:FormGroup;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name' : new FormControl(null,[Validators.required,Validators.min(3)]),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'subject' : new FormControl(null,[Validators.required,Validators.min(5)]),
      'message' : new FormControl(null,[Validators.required,Validators.min(10),Validators.max(300)])
    });
  }

  submit(){
    this.dataService.save(this.contactForm.value).subscribe(
      (res)=>{
        console.log("Request Sent");
        alert("We will contact you soon!!");
        this.contactForm.reset();
      },
      (err)=>{console.log(err);
        this.contactForm.reset();
      }
    );
  }
}
