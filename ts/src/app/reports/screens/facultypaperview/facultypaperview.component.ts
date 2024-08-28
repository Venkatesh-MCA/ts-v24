import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FacultypapersService } from '../../../core/services/facultypapers.service';
@Component({
  selector: 'app-facultypaperview',
  templateUrl: './facultypaperview.component.html',
  styleUrls: ['./facultypaperview.component.css']
})
export class FacultypaperviewComponent {
  uuid:any;
  questions:any;
  constructor(private _facultypaperservice: FacultypapersService, private route: ActivatedRoute, private router: Router) {
    this.uuid = route.snapshot.params['uid'];

    this._facultypaperservice.gettemplate(this.uuid).subscribe(data => {
      console.log(data)
      this.questions = data[0].questions;
      
      
    });

  }
}
