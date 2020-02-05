import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { SpecialThanksComponent } from './special-thanks/special-thanks.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { SubmitComponent } from './submit/submit.component';
import { ReviewListPageComponent } from './review-list-page/review-list-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'game/:id', component: GameComponent },
  { path: 'games', component: GamesComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'guidelines', component: GuidelinesComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'special-thanks', component: SpecialThanksComponent },
  { path: 'reviews', component: ReviewListPageComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}