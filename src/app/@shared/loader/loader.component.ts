import { Component, OnInit, Input } from '@angular/core';
import { Loadable } from '../../ngrx/loadable/loadable';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() message: string | undefined;
  @Input() loadable: Loadable;

  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'now-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = false;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
