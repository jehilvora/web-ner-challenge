import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from 'rxjs/operators';
import { AppConstants } from './app.constants';
import { NERService } from './service/ner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  result: SafeHtml;

  @ViewChild('nerText') nerSearch: ElementRef;
  constructor(
    private nerService: NERService,
    private domSanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.nerSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res: string) => {
          if (res.length < 2) {
            this.result = null;
          }
          return res.length > 2;
        }),
        debounceTime(AppConstants.DEBOUNCE_THRESHOLD),
        distinctUntilChanged(),
        mergeMap((text) => this.nerService.getEntities(text)),
        map((text) =>
          // Purely a workaround to accomodate displacy's styles as Angular sanitizes HTML if used in innerHtml
          this.domSanitizer.bypassSecurityTrustHtml(text?.parsedHtml)
        )
      )
      .subscribe((res) => (this.result = res));
  }
}
