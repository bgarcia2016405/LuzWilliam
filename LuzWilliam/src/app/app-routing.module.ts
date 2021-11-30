import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componenet/inicio/inicio.component';
import { TablaComponent } from './component/tabla/tabla.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'tabla', component: TablaComponent},
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
