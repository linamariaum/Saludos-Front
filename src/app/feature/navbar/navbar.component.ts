import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .example-spacer {
      flex: 1 1 auto;
    }`
  ],
  providers : [AuthService]
})
export class NavbarComponent {
  name = 'Saludos App';
  user$: Observable<any> = this.authService.afAuth.user

  constructor(private authService: AuthService, private router: Router) { }

  async onGoogleLogin() {
    try {
      await this.authService.loginGoogle();
      const n = await this.authService.getCurrentUser()
      sessionStorage.setItem('name', n.displayName);
    } catch (error) {
      console.log(error)
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      sessionStorage.removeItem('name');
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error)
    }
  }
}
