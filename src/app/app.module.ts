import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Modal,PaymentPageComponent } from './payment-page/payment-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule, MatNativeDateModule,  MatInputModule } from '@angular/material';

import { NgxPaginationModule} from 'ngx-pagination';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    PaymentPageComponent,
    Modal
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    MatButtonModule,
    AppRoutingModule,
    FormsModule,
    MatSortModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatSelectModule,  
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,
     MatInputModule,
  ],
  entryComponents:[Modal, PaymentPageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
