import {Injectable} from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';

@Injectable()
export class TokenInterceptor implements   HttpInterceptor{
    constructor(private  service :CommonService) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


const idToken = this.service.getToken();

if (this.service.isloggedin()) {
    const cloned = request.clone({
        headers: request.headers.set("Authorization",
            "Bearer " + idToken)
    });

    return next.handle(cloned);
}
else {
    return next.handle(request);
}


}
}
      // const excludedUrls = [];

        // Check if the request URL is in the excluded URLs
        // if (excludedUrls.some(url => request.url.includes(url))) {
        //   return next.handle(request); // Skip interception and pass the request through
        // }
        // request = request.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${this.auth.getToken()}`
        //   }
        // });
        // console.log("header set")
        // return next.handle(request);
