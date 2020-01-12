import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Router } from "@angular/router";

export interface DialogData {
  isValid: boolean;
}

export interface payment_column {
  paymentId: Number;
  orderDate: String;
  merchatId: Number;
  customerEmail: String;
  amount: Number;
  paymentStatus: String;
}

@Component({
  selector: "app-payment-page",
  templateUrl: "./payment-page.component.html",
  styleUrls: ["./payment-page.component.scss"]
})
export class PaymentPageComponent implements OnInit {
  date = new FormControl(new Date());
  searchText;
  p: number = 1;
  drop;
  now;
  start: Date;
  end_date = new FormControl(new Date());
  copy_data = [];
  backup = [];
  id = [];
  sortedData: payment_column[];
  end_date_2 = new Date();

// the json data
  payments = [
    {
      paymentId: 435456,
      orderDate: "05/11/2015",
      merchatId: 3245,
      customerEmail: "varun@gmail.com",
      amount: 234.56,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 435466,
      orderDate: "06/21/2015",
      merchatId: 3289,
      customerEmail: "rahul@gmail.com",
      amount: 122.66,
      paymentStatus: "Failed"
    },
    {
      paymentId: 435459,
      orderDate: "02/23/2015",
      merchatId: 4567,
      customerEmail: "alok@gmail.com",
      amount: 4567.33,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 435476,
      orderDate: "04/06/2015",
      merchatId: 3245,
      customerEmail: "rohit@gmail.com",
      amount: 23345,
      paymentStatus: "Success"
    },
    {
      paymentId: 112345,
      orderDate: "08/24/2015",
      merchatId: 3245,
      customerEmail: "sapna@gmail.com",
      amount: 567.96,
      paymentStatus: "Refunded"
    },
    {
      paymentId: 345654,
      orderDate: "05/11/2015",
      merchatId: 3245,
      customerEmail: "kamal@gmail.com",
      amount: 2434.43,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 435451,
      orderDate: "03/10/2015",
      merchatId: 3245,
      customerEmail: "shrey@gmail.com",
      amount: 729.56,
      paymentStatus: "Dropped"
    },
    {
      paymentId: 435486,
      orderDate: "03/16/2015",
      merchatId: 3245,
      customerEmail: "amar@gmail.com",
      amount: 3947.57,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 435493,
      orderDate: "03/18/2015",
      merchatId: 3245,
      customerEmail: "amar123@gmail.com",
      amount: 497.57,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 435593,
      orderDate: "06/18/2015",
      merchatId: 3245,
      customerEmail: "sudipt@gmail.com",
      amount: 2999,
      paymentStatus: "Initiated"
    },
    {
      paymentId: 436493,
      orderDate: "07/18/2015",
      merchatId: 3245,
      customerEmail: "kriti@gmail.com",
      amount: 5000,
      paymentStatus: "Dropped"
    },
    {
      paymentId: 536493,
      orderDate: "07/24/2015",
      merchatId: 3245,
      customerEmail: "varund@gmail.com",
      amount: 3897.44,
      paymentStatus: "Dropped"
    },
    {
      paymentId: 436423,
      orderDate: "02/18/2015",
      merchatId: 3245,
      customerEmail: "srk@gmail.com",
      amount: 5037.45,
      paymentStatus: "Dropped"
    },
    {
      paymentId: 436893,
      orderDate: "07/25/2015",
      merchatId: 3245,
      customerEmail: "gaurav123@gmail.com",
      amount: 5670,
      paymentStatus: "Dropped"
    },
    {
      paymentId: 345678,
      orderDate: "03/14/2015",
      merchatId: 3245,
      customerEmail: "bhas12er@gmail.com",
      amount: 32435.5,
      paymentStatus: "Success"
    }
  ];


  constructor(public dialog: MatDialog) {
    this.sortedData = this.payments;
  }

  ngOnInit() {
    // If there is any changes in the payment json file
    if (localStorage.getItem("payment_data") != null) {
      const payment_data = localStorage.getItem("payment_data");
      this.payments = JSON.parse(payment_data);
      this.sortedData = this.payments;
    }

    this.now = new FormControl(new Date());
    this.backup = this.payments;
  }

  // For Filter dropdown
  payment_status = [
    { value: "All", viewValue: "All" },
    { value: "Initiated", viewValue: "Initiated" },
    { value: "Failed", viewValue: "Failed" },
    { value: "Success", viewValue: "Success" },
    { value: "Refunded", viewValue: "Refunded" },
    { value: "Dropped", viewValue: "Dropped" }
  ];

  dropdown(evt) {
    if (evt == "All") {
      this.payments = this.backup;
    } else {
      this.copy_data = this.backup.filter(payment => {
        if (payment.paymentStatus == evt) return true;
        return false;
      });
      this.payments = this.copy_data;
    }
  }

  
 
// For Pagination
  onPageChange() {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth"
    });
  }


  // Date Filter Logic
  async date_filter(start) {
    this.payments = [];
    this.copy_data = [];
    const date = new Date(this.end_date_2);
    var start_date = await Number(Date.parse(start));
    var end_date = await Number(date);
    this.copy_data = await this.backup.filter(payment => {
      var date_check = Number(Date.parse(payment.orderDate));
      if (date_check >= start_date && date_check <= end_date) return true;
      return false;
    });
    this.payments = await this.copy_data;
  }


// Sorting of the each column
sortData(sort: Sort) {
  const data = this.payments;
  if (!sort.active || sort.direction === "") {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === "asc";
    switch (sort.active) {
      case "paymentId":
        return this.compare(a.paymentId, b.paymentId, isAsc);
      case "orderDate":
        return this.compare(a.orderDate, b.orderDate, isAsc);
      case "merchatId":
        return this.compare(a.merchatId, b.merchatId, isAsc);
      case "customerEmail":
        return this.compare(a.customerEmail, b.customerEmail, isAsc);
      case "amount":
        return this.compare(a.amount, b.amount, isAsc);
      case "paymentStatus":
        return this.compare(a.paymentStatus, b.paymentStatus, isAsc);
      default:
        return 0;
    }
  });
}

compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



// For Muiltiple/Single deletion
  checkboxfn(evt, data) {
    if (evt.checked) {
      this.id.push(evt.source.value);
    }
    if (!evt.checked) {
      for (let x of this.id) {
        if (~~x == data.paymentId) {
          this.id.splice(this.id.indexOf(x), 1);
        }
      }
    }
  }

  delete() {
    for (let x of this.id) {
      for (let y of this.payments) {
        if (~~x == y.paymentId) {
          this.payments.splice(this.payments.indexOf(y), 1);
        }
      }
    }
    localStorage.setItem("payment_data", JSON.stringify(this.payments));
  }

  new() {
    this.dialog.open(Modal, {
      width: "500px",
      data: {
        dataKey: "",
        alldata: this.payments,
        type: "new"
      }
    });
  }


  // For Edit option of the transaction

  edit(data) {
    this.dialog.open(Modal, {
      width: "500px",
      data: {
        dataKey: data,
        alldata: this.payments,
        type:"update"
      }
    });
  }

  
}

@Component({
  selector: "modal",
  templateUrl: "modal.html",
  styleUrls: ["./payment-page.component.scss"]
})
export class Modal implements OnInit {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  payment_status = [
    { value: "All", viewValue: "All" },
    { value: "Initiated", viewValue: "Initiated" },
    { value: "Failed", viewValue: "Failed" },
    { value: "Success", viewValue: "Success" },
    { value: "Refunded", viewValue: "Refunded" },
    { value: "Dropped", viewValue: "Dropped" }
  ];
  data: any;
  paymentId;
  date;
  merchantid;
  userEmailID;
  amount: Number;
  drop: any;
  all_data: any;
  amnt;
  type;
  new={};
  new_date = new Date()
  newdate: string;
  

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public payment: any
  ) {
    dialogRef.disableClose = true;
  }
  async ngOnInit() {
    this.type = await this.payment.type;
    this.all_data = await this.payment.alldata;
    if(this.type == "update") {
      this.data = await this.payment.dataKey;      
      this.userEmailID = await this.data.customerEmail;
      this.amount = await this.data.amount;
      this.paymentId = await this.data.paymentId;
      this.merchantid = await this.data.merchatId;
      this.drop = await this.data.paymentStatus;
      this.date = await this.data.orderDate;
    }
  }
  dropdown_modal(val) {
    this.drop = val;
  }

  close() {
    this.dialogRef.close();
  }

  async done() {

    if(this.type == "update") {
      for (let x of this.all_data) {
        if (~~this.paymentId == ~~x.paymentId) {
          x.orderDate = this.date;
          x.merchatId = ~~this.merchantid;
          x.customerEmail = this.userEmailID;
          x.amount = ~~this.amount;
          x.paymentStatus = this.drop;
        }
      }
    }
    else {

      console.log("inside new")
      this.newdate= await (this.new_date.getMonth() + 1) + '/' +this.new_date.getDate() + '/' +  this.new_date.getFullYear()
     this.new = await {
        "paymentId": ~~this.paymentId,
        "orderDate": this.newdate,
        "merchatId": ~~this.merchantid,
        "customerEmail": this.userEmailID,
        "amount": ~~this.amount,
        "paymentStatus": this.drop
      }
      console.log(this.new)
      this.all_data = await this.all_data.concat(this.new);
      console.log(this.all_data)
    }
    
    await localStorage.setItem("payment_data", JSON.stringify(this.all_data));
    await this.dialogRef.close();
    await this.router
      .navigateByUrl("/payment-page", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/payment-page"]);
      });
  }
}
