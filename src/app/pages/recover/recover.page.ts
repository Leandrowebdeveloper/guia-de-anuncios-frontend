import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  public config: User;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.config = this.activatedRoute.snapshot.data.recover;
  }

  public onSubmit(event: FormGroup){
    console.log(event)
  }

}
