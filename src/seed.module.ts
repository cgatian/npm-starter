import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeedService } from './services/seed.service';
import { SeedComponent } from './components/seed.component';
import { AppComponent } from './app.component';

@NgModule({
	imports: [CommonModule],
	providers: [
		SeedService
	],
	declarations: [SeedComponent, AppComponent],
	exports: [SeedComponent],
	bootstrap: [AppComponent]
})
export class SeedModule { }
