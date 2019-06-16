import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { ProfileService, payload, transPayLoad } from './profile.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
// import { TRANSACTIONS } from '../models/mock-transaction';
import { Transactions } from '../models/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent implements OnInit {

    userProfile:payload;
    transaction: Transactions[];
    userTrans: Transactions[];
    displayedColumns: string[] = ['TransactionId', 'Ticker', 'Transaction Date', 'Transaction Type', 'Number of Shares'];
    profileForm    =  new FormGroup({
          FirstName      :  new FormControl(''),
          LastName       :  new FormControl(''),
          Email          :  new FormControl(''),
          Gender         :  new FormControl(''),
          DateOfBirth    :  new FormControl(''),
          Address        :  new FormControl(''),
          City           :  new FormControl(''),
          State          :  new FormControl(''),
          PostCode       :  new FormControl(''),
          MobileNumber   :  new FormControl('')
  });


  constructor(
      private profile: ProfileService,
      private authservice: AuthenticationService,
    ) { }

    ngOnInit() {
      // this.userTrans = TRANSACTIONS;
      this.authservice.getProfileInfo().subscribe(data => {
        // console.log(data);
        // console.log(data['userData']);
        console.log(JSON.parse(data['Transactions']));

        this.userProfile = JSON.parse(data['userData']);
        // this.userTrans = JSON.parse(data['Transactions']);
        this.userTrans = JSON.parse(data['Transactions'])
        console.log(this.userTrans)
      });
  }
  onSubmit() {
      console.log(this.profileForm.getRawValue());

  }

}
