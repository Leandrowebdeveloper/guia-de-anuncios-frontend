import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public config: User;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.config = this.activatedRoute.snapshot.data.login;
  }

  public onSubmit(event: FormGroup){
    console.log(event)
  }
}
