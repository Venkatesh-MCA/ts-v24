import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service'; 
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(public loader: LoaderService) { }
}
