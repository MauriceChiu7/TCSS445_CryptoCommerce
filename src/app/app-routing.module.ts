import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransfersComponent } from './transfers/transfers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: UserDashboardComponent},
  {path: 'wallet', component: WalletComponent},
  {path: 'transfers', component: TransfersComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'open-orders', component: OpenOrdersComponent},
  {path: 'admin', component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
