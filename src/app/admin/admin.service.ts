import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/auth';
import { AdminComponent } from './admin.component';

/**
 * Provides helper methods to create routes.
 */
export class Admin {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: AdminComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      // Reuse AdminComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}
