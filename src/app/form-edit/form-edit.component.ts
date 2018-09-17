import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlistaFirebaseService } from '../plista-firebase.service';
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.less']
})
export class FormEditComponent implements OnInit {
  validateForm: FormGroup;
  paramsSubscription: Subscription;
  key: string = null;
  record: {
    camp_cpc: number;
    date: string;
    freeClick: boolean;
    key: string;
    network: string;
    PlistaProduct: string;
  };

  parserEuro = (value: string) => value.replace('€ ', '');
  formatterEuro = (value: number) => `€ ${value}`;
  submitForm(): void {
    this.plistaFirebase
      .getPlistaDataRecord(this.key)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private plistaFirebase: PlistaFirebaseService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      camp_cpc: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      freeClick: [null, [Validators.required]],
      network: [null, [Validators.required]],
      PlistaProduct: [null, [Validators.required]]
    });

    // this.key = this.route.snapshot.params['key'];
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.key = params['key'];
    });

    // this.plistaFirebase
    //   .getPlistaDataRecord(this.key)
    //   .subscribe(
    //     response => console.log(response),
    //     error => console.log(error)
    //   );
  }
}
//(this.record = response)