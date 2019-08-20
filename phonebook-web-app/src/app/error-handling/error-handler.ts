import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse): void {
        const snackBar = this.injector.get(MatSnackBar);
        const router = this.injector.get(Router);
        console.log('error -', error);
        if (error instanceof HttpErrorResponse) {
            if (snackBar) {
                snackBar.open(' server error - ' + error.message, 'x', {
                    duration: 5000,
                });
            }
        } else if (error.message.includes('ExpressionChangedAfterItHasBeenCheckedError')) {
            console.error('expression changed after detection');
        } else {
            // client error, current UI would be broken
            const errorMessageParams = {
                errorMessage: error.message
            };
            router.navigate(['error'], { queryParams: errorMessageParams });
        }
    }

}
