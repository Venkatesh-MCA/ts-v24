import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class managementScreensComponent {
  isHidden: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const firstChild = this.activatedRoute.firstChild;

        // Check if firstChild exists and has a routeConfig
        if (firstChild && firstChild.routeConfig) {
          const routePath = firstChild.routeConfig.path;
          // this.isHidden = firstChild.routeConfig.path == 'quesanalysis/:papercode/:suc';
          // this.isHidden = firstChild.routeConfig.path === 'questionpaper/:papercode';
          // this.isHidden = firstChild.routeConfig.path === 'pptpaper/:papercode/:subject';
          // this.isHidden = firstChild.routeConfig.path === 'ppthintspaper/:papercode/:subject';
          // this.isHidden = firstChild.routeConfig.path === 'questionpaper/:papercode';
          // this.isHidden = firstChild.routeConfig.path === 'hintspaper/:papercode';
          this.isHidden = (
            routePath === 'quesanalysis/:papercode/:suc' ||
            routePath === 'questionpaper/:papercode' ||
            routePath === 'pptpaper/:papercode/:subject' ||
            routePath === 'ppthintspaper/:papercode/:subject' ||
            routePath === 'questionpaper/:papercode' ||
            routePath === 'hintspaper/:papercode' ||
            routePath === 'videolist/:papercode/:subject'
          );
        } else {
          // Handle the case where firstChild or routeConfig is null
          this.isHidden = false; // or assign the default value you prefer
        }
      });
  }
}
