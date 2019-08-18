import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookActionsComponent } from './actions.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhoneBookRepository } from '../store/repository.service';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { mock, instance, verify, deepEqual } from 'ts-mockito';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    PhoneBookRecordEditData,
    PhoneBookRecordEditType,
    PhoneBookRecordEditingComponent
} from '../record-editing/record-editing.component';

describe('ActionsComponent', () => {
    let component: PhoneBookActionsComponent;
    let fixture: ComponentFixture<PhoneBookActionsComponent>;

    let repository: PhoneBookRepository;
    let dialog: MatDialog;
    let snackBar: MatSnackBar;

    beforeEach(async(() => {
        repository = mock(PhoneBookRepository);
        dialog = mock(MatDialog);
        snackBar = mock(MatSnackBar);

        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule
            ],
            declarations: [PhoneBookActionsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PhoneBookRepository,
                    useFactory: () => instance(repository)
                },
                { provide: MatDialog, useFactory: () => instance(dialog) },
                { provide: MatSnackBar, useFactory: () => instance(snackBar) }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhoneBookActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open dialog with PhoneBookRecordEditingComponent on addRecord', () => {
        const dialogData: PhoneBookRecordEditData = {
            type: PhoneBookRecordEditType.ADD
        };
        const dialogConfig: MatDialogConfig = {
            data: dialogData
        };
        component.addRecord();
        verify(
            dialog.open(
                PhoneBookRecordEditingComponent,
                deepEqual(dialogConfig)
            )
        ).once();
    });
});
