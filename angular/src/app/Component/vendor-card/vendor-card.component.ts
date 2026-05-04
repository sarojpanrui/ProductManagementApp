import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  imports: [],
  templateUrl: './vendor-card.component.html',
  styleUrl: './vendor-card.component.scss',
})
export class VendorCardComponent {
  @Input() vendor: any = {};
}
