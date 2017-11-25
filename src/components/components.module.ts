import { NgModule } from '@angular/core';
import { SelectCountryComponent } from './select-country/select-country';
import { QuantityComponent } from './quantity/quantity';
import { TopupComponent } from './topup/topup';
import { DrawDoneComponent } from './draw-done/draw-done';
@NgModule({
	declarations: [SelectCountryComponent,
    QuantityComponent,
    TopupComponent,
    DrawDoneComponent,
    DrawDoneComponent,
    DrawDoneComponent],
	imports: [],
	exports: [SelectCountryComponent,
    QuantityComponent,
    TopupComponent,
    DrawDoneComponent,
    DrawDoneComponent,
    DrawDoneComponent]
})
export class ComponentsModule {}
