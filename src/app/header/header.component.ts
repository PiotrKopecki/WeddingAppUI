import { Component } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import { RoutingService } from '../_service/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private routingService: RoutingService
  ){}

  logout() {
    localStorage.removeItem(LoginComponent.isLoggedIn);
    this.routingService.openLoginPage();
  }
}
