import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdvancedSearchComponent} from './home/cashier-opened/advanced-search/advanced-search.component';
import {ArticlesFamilyViewComponent} from './home/cashier-opened/articles-family/articles-family-view.component';
import {CashierClosedComponent} from './home/cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './home/cashier-opened/cashier-opened.component';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './home/cashier-opened/shopping-cart/shopping-cart.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UsersComponent} from './home/users/users.component';
import {CashierCloseDialogComponent} from './home/cashier-opened/cashier-close-dialog.component';
import {DbSeedDialogComponent} from './home/admins/db-seed-dialog.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: CashierClosedComponent.URL, component: CashierClosedComponent},
      {path: CashierOpenedComponent.URL, component: CashierOpenedComponent},
      {path: UsersComponent.URL, component: UsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static COMPONENTS = [
    AdvancedSearchComponent,
    ArticlesFamilyViewComponent,
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    ShoppingCartComponent,
    UsersComponent,
    WelcomeComponent,
  ];

  static DIALOG_COMPONENT = [
    CashierCloseDialogComponent,
    DbSeedDialogComponent
  ];
}
