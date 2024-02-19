import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { MyPagePage } from './pages/my-page/my-page.page';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'my-page',
        component: MyPagePage
    }
];
