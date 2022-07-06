import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreadcrumpsComponent } from './breadcrumbs.component';

const routes: Routes = [
    {
        path: '',
        component: BreadcrumpsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BreadcrumpsComponentRoutingModule {}
