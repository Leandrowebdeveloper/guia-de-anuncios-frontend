import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/guard/auth.guard';
import { UserResolver } from './guard/resolve.guard';
import { UserPage } from './user.page';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: UserPage,
        resolve: {
            user: UserResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPageRoutingModule {}
