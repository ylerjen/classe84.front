import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
],
declarations: [],
providers: [],
bootstrap: [],
exports: [
    RouterModule
]
})
export class AdminRoutingModule { }
