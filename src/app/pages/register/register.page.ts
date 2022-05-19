import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public config: User;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.config = this.activatedRoute.snapshot.data.register;
  }

  public onSubmit(event: FormGroup){
    console.log(event)
  }

}
