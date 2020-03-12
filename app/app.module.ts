import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

import { AppRoutingModule, COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { CustomActionBarComponent } from "./components/custom-action-bar/custom-action-bar.component";
import { CircularProgressBarComponent } from "./components/circular-progress-bar/circular-progress-bar.component";

import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "./nativescript-cardview";
import { SwipeLayout } from "./nativescript-swipe-layout";

registerElement("CardView", () => CardView);
registerElement("SwipeLayout", () => SwipeLayout);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUIGaugeModule,
        NativeScriptAnimationsModule,
        AppRoutingModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        ListItemComponent,
        SearchBarComponent,
        CustomActionBarComponent,
        CircularProgressBarComponent,
        ...COMPONENTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
