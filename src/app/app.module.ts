import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AccountsModule } from './accounts/accounts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AccountsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ],
  providers: [
    provideClientHydration(),
  ],
  exports:[
    CoreModule,
    RouterModule,
    AccountsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
