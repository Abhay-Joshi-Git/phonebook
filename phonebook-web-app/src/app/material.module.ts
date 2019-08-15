import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
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
        MatInputModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule
    ]
})
export class MaterialModule {}
