import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Admin } from '@app/admin/admin.service';

const routes: Routes = [
  Admin.childRoutes([
    // Admin Page
    {
      path: 'finance',
      loadChildren: () => import('./pages/list-product/list-product.module').then((m) => m.ListProductModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
