import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookComponent } from './phone-book.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PhoneBookRepository } from './store/repository.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { mock, instance, when, anything, verify, deepEqual } from 'ts-mockito';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhoneBookRecord } from './store/state';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    PhoneBookRecordEditData,
    PhoneBookRecordEditType,
    PhoneBookRecordEditingComponent
} from './record-editing/record-editing.component';

describe('PhoneBookComponent', () => {
    let component: PhoneBookComponent;
    let fixture: ComponentFixture<PhoneBookComponent>;

    let phoneBookRepository: PhoneBookRepository;
    let breakpointObserver: BreakpointObserver;
    let dialog: MatDialog;

    const phoneBookRecords: Array<PhoneBookRecord> = [
        {
            name: 'abc',
            phoneNumbers: ['4423423232']
        }
    ];
    const breakPontState: BreakpointState = {
        matches: false,
        breakpoints: { maxWidth: false }
    };

    beforeEach(async(() => {
        phoneBookRepository = mock(PhoneBookRepository);
        breakpointObserver = mock(BreakpointObserver);
        dialog = mock(MatDialog);

        when(phoneBookRepository.getAllRecords()).thenReturn(
            of(phoneBookRecords)
        );
        when(phoneBookRepository.fetchLatestRecords()).thenReturn(
            of(phoneBookRecords)
        );
        when(phoneBookRepository.deletePhoneBookRecord('abc')).thenReturn(
            of(phoneBookRecords[0])
        );
        when(breakpointObserver.observe(anything())).thenReturn(
            of(breakPontState)
        );

        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule
            ],
            declarations: [PhoneBookComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PhoneBookRepository,
                    useFactory: () => instance(phoneBookRepository)
                },
                {
                    provide: BreakpointObserver,
                    useFactory: () => instance(breakpointObserver)
                },
                { provide: MatDialog, useFactory: () => instance(dialog) }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhoneBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe for records on init', () => {
        verify(phoneBookRepository.getAllRecords()).once();
    });

    it('should call fetch records', () => {
        verify(phoneBookRepository.fetchLatestRecords()).once();
    });

    it('should open dialog with PhoneBookRecordEditingComponent on edit', () => {
        const row = {
            name: 'abc',
            phoneNumbers: ['4434342355']
        };
        const dialogData: Partial<PhoneBookRecordEditData> = {
            type: PhoneBookRecordEditType.EDIT,
            record: {
                name: 'abc',
                phoneNumbers: ['4434342355']
            }
        };
        const dialogConfig: Partial<MatDialogConfig> = {
            data: dialogData
        };
        component.editRecord(row);
        verify(
            dialog.open(
                PhoneBookRecordEditingComponent,
                deepEqual(dialogConfig)
            )
        ).once();
    });
});
