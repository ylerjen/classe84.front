import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundPage } from 'app/pages/not-found/not-found.page';

const routes = [
    {
        path: '**',
        component: NotFoundPage
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        NotFoundPage
    ],
    exports: [
        RouterModule
    ]
})
export class ErrorRoutingModule { }
