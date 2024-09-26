import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoPage } from './todo';
import { MainPage } from './main';
import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';
import { NotFoundPage } from './not-found';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'sign-in', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'todo', component: TodoPage },
  { path: '**', component: NotFoundPage } // 404 페이지
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }