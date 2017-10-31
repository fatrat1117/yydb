import { NgModule } from '@angular/core';
import { SelectCountryComponent } from './select-country/select-country';
import { QuantityComponent } from './quantity/quantity';
import { TopupComponent } from './topup/topup';
@NgModule({
	declarations: [SelectCountryComponent,
    QuantityComponent,
    TopupComponent],
	imports: [],
	exports: [SelectCountryComponent,
    QuantityComponent,
    TopupComponent]
})
export class ComponentsModule {}
