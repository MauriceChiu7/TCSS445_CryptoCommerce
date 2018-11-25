import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { GlobalService } from './services/global.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UserDashboardComponent,
    WalletComponent,
    TransactionsComponent,
    TransfersComponent,
    OpenOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
