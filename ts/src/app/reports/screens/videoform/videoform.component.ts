import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../../../core/services/papers.service';
import { VideoformService } from '../../../core/services/videoform.service';


@Component({
  selector: 'app-videoform',
  templateUrl: './videoform.component.html',
  styleUrls: ['./videoform.component.css']
})
export class VideoformComponent {
  selectpapercode: any;
  selectedsubject: any; subjectdata: any; resp: any; pathnames: any; subject: string = '';
  constructor(private _papersService: PapersService, private _videoformService: VideoformService, private route: ActivatedRoute, private router: Router) {
    this.selectpapercode = route.snapshot.params['papercode'];
    this.selectedsubject = route.snapshot.params['subject'];
    //this._videoformService.folderpaths(this.selectpapercode).subscribe(paths => {

    this.pathnames = ["\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-CHEMISTRY (1).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-CHEMISTRY (1).pptx", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-CHEMISTRY (2).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (1).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (1).pptx", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (2).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (3).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (4).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (5).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS (6).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS-7.mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-MATHEMATICS.mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-PHYSICS (1).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-PHYSICS (1).pptx", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/230510301130602-PHYSICS (2).mp4", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/@eaDir", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/@eaDir\/230510301130602-CHEMISTRY (1).pptx@SynoEAStream", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/@eaDir\/230510301130602-MATHEMATICS (1).pptx@SynoEAStream", "\/home\/devteam\/nfs\/AbhyasVideos\/SourceVideos\/230510301130602\/@eaDir\/230510301130602-PHYSICS (1).pptx@SynoEAStream"]
    //// console.log(this.pathnames)
    //});

    this._videoformService.videoproecessexists(this.selectpapercode, this.selectedsubject).subscribe(data => {
      // console.log(data)
      if (data.length != 0) {
        // console.log(data[0].details);
        this.resp = data[0].details;
        for (var i = 0; i < this.resp.length; i++) {
          this.resp[i].starttime_old = this.secondtohms_start(i, this.resp[i].starttime)
          this.resp[i].endtime_old = this.secondtohms_end(i, this.resp[i].endtime)
        }
        // console.log(this.resp);
      } else {
        // console.log('No record found')
        this.createform(this.selectpapercode, this.selectedsubject)
      }

    });

  }
  createform(p: any, s: any) {
    this._papersService.getpaper(p).subscribe(paper => {
      // console.log(paper);

      this.subjectdata = paper[0].question_paper.filter((e: any) => e.subject_master_name == s)
      // console.log(this.subjectdata);

      var setobj = [];
      for (var i = 0; i < this.subjectdata.length; i++) {
        this.subjectdata[i].topic_master_name = this.subjectdata[i].topic_master_name.replace("\n", "");


        setobj[i] = {
          "Questionorder": parseInt(this.subjectdata[i].Questionorder),
          "question_master_id": parseInt(this.subjectdata[i].question_master_id),
          "topic_master_name": this.subjectdata[i].topic_master_name,
          "starttime": '',
          "endtime": '',
          "rawvideofilename": '',
          "outputfiename": '',
          "processstatus": 'null',
          "starttime_old": "00:00:00",
          "endtime_old": "00:00:00"
        }
      }
      // console.log(setobj)
      var sendobj = { "setobj": setobj, "papercode": p, "subject": p }
      this._videoformService.videoproecess(sendobj).subscribe(data => {
        if (data.Message == "Success") {
          this.resp = data.Data.details;
          for (var i = 0; i < this.resp.length; i++) {
            this.resp[i].starttime_old = this.secondtohms_start(i, this.resp[i].starttime)
            this.resp[i].endtime_old = this.secondtohms_end(i, this.resp[i].endtime)
          }
          // console.log(this.resp);
        }
      });
    });

  }
  submitdata() {
    var sendobj = { "setobj": this.resp, "papercode": this.selectpapercode, "subject": this.selectedsubject }
    this._videoformService.videoproecess(sendobj).subscribe(sendeddata => {
      // console.log(sendeddata)
    });
  }

  convert(ind: any, d: any, startorend: any) {
    // console.log(d)
    if (isNaN(d)) {

      const htime = d.toString().split(':')[0];
      const mtime = d.toString().split(':')[1];
      const sectime = d.toString().split(':')[2];
      // console.log(htime, mtime, sectime);
      var finaltime = ((htime * 60) * 60) + (1 * mtime * 60) + (1 * sectime);

      if (startorend == 'start') {
        this.resp[ind].starttime = finaltime;
      } else if (startorend == 'end') {
        this.resp[ind].endtime = finaltime;
      }


    } else {
      if (startorend == 'end') {
        this.resp[ind].endtime = '00:00: 00';
      } else {
        this.resp[ind].starttime = '00:00: 00';
      }
    }



  }

  //second to HH:MM:SS
  secondtohms_start(inde: any, v: any) {
    var date = new Date(0);
    date.setSeconds(v); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);
    return this.resp[inde].starttime_old = timeString;
  }
  //second to HH:MM:SS
  secondtohms_end(inde: any, v: any) {
    var date = new Date(0);
    date.setSeconds(v); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);
    return this.resp[inde].endtime_old = timeString;
  }
}
