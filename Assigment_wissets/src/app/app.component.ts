import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'avinash';
  availableTags = [
    'ActionScript',
    'AppleScript',
    'Asp',
    'BASIC'
  ];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    // tslint:disable-next-line: variable-name
    const _self = this;

    const s: any = $('#tags');
    s.autocomplete({
      source(request: any, response: any) {
        const dataTosend = _self.availableTags.filter(t => {
          return t.toLowerCase().match(request.term.toLowerCase());
        });
        if (!dataTosend.length) {

          _self.getData(request)
            .subscribe(res => {
              let arr: any = [];
              // tslint:disable-next-line: no-string-literal
              if (res['body']['candidates'] && res['body']['candidates'].length) {
                res['body']['candidates'].forEach((i: any) => {
                  // tslint:disable-next-line: no-string-literal
                  arr.push(i['name']);
                });
              } else {
                arr = [];
              }

              response(arr);

            }, (err) => {
              console.log(err);
            });
        } else {
          response(dataTosend);
        }

      }
    });
  }

  getData(request): Observable<any> {

    // tslint:disable-next-line: max-line-length
    return this.http.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + request.term + '%20grill&inputtype=textquery&fields=formatted_address,name&key=AIzaSyBavx5i_NFtvM5Vni_sEpQV1adjlQ93bVM', { observe: 'response' });

  }
}
