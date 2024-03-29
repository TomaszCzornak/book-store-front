import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
