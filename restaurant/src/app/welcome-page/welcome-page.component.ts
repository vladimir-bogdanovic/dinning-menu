import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {
  constructor(private navService: NavigationService) {}

  toMenu() {
    this.navService.navigation('menu');
  }

  goToAboutPage() {
    this.navService.navigation('about');
  }
}
