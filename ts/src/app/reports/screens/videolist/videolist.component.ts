import { Component } from '@angular/core';
import { PapersService } from '../../../core/services/papers.service'; 
import { VideoformService  } from '../../../core/services/videoform.service'; 

import { ActivatedRoute } from '@angular/router';
import { imagepath } from '../../../../environments/environment';
@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent {
  selectpapercode:any;
  selectedsubject:any;
  qpaper:any;
  qdata:any;
  constructor(private _papersService: PapersService, private _videoformService:VideoformService, private route: ActivatedRoute) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.selectedsubject = route.snapshot.params['subject'];
    this._papersService.getpaper(this.selectpapercode).subscribe(paperdata => {
      this.qpaper = paperdata[0].question_paper;
      this.qdata = this.qpaper.filter((e:any) => e.subject_master_name == this.selectedsubject);
      // console.log(this.qdata)
       var qids=this.qdata.map((e:any)=>e.question_master_id)
       
       var qidsstring=qids.join(', '); // Joins array elements with a comma and space
       //// console.log(qidsstring);
       this._videoformService.videolist(qidsstring).subscribe(data => {
       // console.log(data)
        if(data.data==0){
          this.qdata;
        }
        // else if(data.msg=="Success"){
        //   for(var s=0;s<this.qdata.length;s++){
        //     this.qdata[s].url=data.videlist.filter((e:any)=>e.qid==this.qdata[s].question_master_id)
        //   }

            
        // }
       });
    });
  }
}
