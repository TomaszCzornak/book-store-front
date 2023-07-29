import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [],
  exports: [MatToolbarModule, MatIconModule, MatButtonModule, MatFormFieldModule],
})
export class MaterialModule {}
