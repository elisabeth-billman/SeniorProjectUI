import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api.service'; // Import ApiService

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to the imports array
    AppRoutingModule,
    FormsModule
  ],
  providers: [ApiService], // Register ApiService as a provider
  bootstrap: [AppComponent]
})
export class AppModule { }


