export const environment = {

    production: true
};

 
var baseurl= (window.location.protocol+'//'+window.location.hostname + window.location.pathname).split('/v23')[0]+"/v23";
// // console.log(baseurl)
//var baseurl='https://touchstone.aditya.ac.in/junior/v23';

var inst = 0; var instname = 'junior'; var movefiledir = '';

if (baseurl.includes('junior')) {
    // console.log('The URL contains the word "junior".');
    var inst = 2;
    var instname = 'junior';
    var movefiledir = '';
} else if (baseurl.includes('degree')) {
    // console.log('The URL contains the word "degree".');
    var inst = 3;
    var instname = 'degree';
    var movefiledir = 'degree';
} else if (baseurl.includes('competitive')) {
    // console.log('The URL contains the word "competitive".');
    var inst = 4;
    var instname = 'competitive';
    var movefiledir = 'competitive';
} else {
    // console.log('None of the specified words found in the URL.');
}
// console.log(inst)
// console.log(instname) 
export const loginapiURL = 'https://apis.aditya.ac.in/analysis/master/analysisusers';
//export const apiURL = baseurl + '/touchstoneapi/admin/';
export const apiURL = 'http://10.70.3.30:3000/admin/';
export const instid=inst;
export const videofilepath = 'https://touchstone.aditya.ac.in/junior/v23/master/php/getpathnames.php';
//export const virtualgroupurl = 'https://apis.aditya.ac.in/zoom/v23/api/vg/group/list/' + inst;
export const virtualstudentpurl = 'https://apis.aditya.ac.in/zoom/v23/api/vg/studetgroup/list/';
export const pdfURL = 'https://apis.aditya.ac.in/url2pdf/render';
export const PDFPOST = 'https://apis.aditya.ac.in/url2file/url2pdf';
export const PDFURL = 'https://apis.aditya.ac.in/url2file/downloadpdf';
export const imagepath = 'https://touchstone.aditya.ac.in/' + instname + '/v23/master/uploads/'
export const movepdffile = '/touchstone/' + movefiledir;
export const pptpath = 'https://touchstone.aditya.ac.in/junior/pdf2pptx/';
export const headerimage='assets/headerimages/'+instname+'-header.jpeg';

export const CodingApi = 'https://abhyas.ai/lab/api-admin'; 
// export const CodingApi = 'http://10.70.3.135:5002'; 

