import { Component, OnInit } from '@angular/core';

import { SeedService } from '../services/seed.service';

@Component({
	moduleId: module.id,
	selector: 'seed-component',
	styleUrls: ['./seed.component.css'],
	templateUrl: './seed.component.html'
})
export class SeedComponent implements OnInit {

	greeting: string;

	constructor(private service: SeedService) { }

	ngOnInit() {
		this.greeting = this.service.sayHello();
	}
}