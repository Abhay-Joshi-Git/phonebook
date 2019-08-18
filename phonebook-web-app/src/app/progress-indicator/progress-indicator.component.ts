import { Component, OnInit } from '@angular/core';
import { ProgressIndicatorRepositoryService } from './store/repository.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pb-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  isInProgress$: Observable<boolean>;
  constructor(private readonly repositoryService: ProgressIndicatorRepositoryService) { }

  ngOnInit() {
    this.isInProgress$ = this.repositoryService.getIsInProgress();
  }

}
