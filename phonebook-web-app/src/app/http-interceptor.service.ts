import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressIndicatorRepositoryService } from './progress-indicator/store/repository.service';

export class HTTPRequestsInterceptor implements HttpInterceptor {

    constructor(private readonly progressIndicatorRepositoryService: ProgressIndicatorRepositoryService) {}

    private requests: HttpRequest<any>[] = [];

    private removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (this.requests.length <= 0) {
            this.progressIndicatorRepositoryService.setInProgress(false);
        }
    }

    private addRequest(req: HttpRequest<any>) {
        this.requests.push(req);
        if (this.requests.length === 1) {
            this.progressIndicatorRepositoryService.setInProgress(true);
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.addRequest(req);
        return next.handle(req).pipe(
            finalize(() => {
                this.removeRequest(req);
            })
        );
    }
}

