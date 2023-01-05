import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//import { HttpService } from './services/http.service';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDetailsComponent } from './shared/view-details/view-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFilterPipe,
    ViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
