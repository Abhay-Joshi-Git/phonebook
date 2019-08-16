import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
    ]
})
export class MaterialModule {}
