import { NgModule } from '@angular/core';
import { SelectCountryComponent } from './select-country/select-country';
import { QuantityComponent } from './quantity/quantity';
@NgModule({
	declarations: [SelectCountryComponent,
    QuantityComponent],
	imports: [],
	exports: [SelectCountryComponent,
    QuantityComponent]
})
export class ComponentsModule {}
