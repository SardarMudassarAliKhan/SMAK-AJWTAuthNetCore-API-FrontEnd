import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Navbar/header/header.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { HomeComponent } from './Home/home/home.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
