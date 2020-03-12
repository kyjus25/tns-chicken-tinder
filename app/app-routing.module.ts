import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home/home.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { FavoritesListComponent } from "./favorites-list/favorites-list.component";

export const COMPONENTS = [
    HomeComponent,
    ItemDetailComponent,
    FavoritesListComponent
];

const routes: Routes = [
    { path: "", redirectTo: "/(homeTab:home//favoritesTab:favorites)", pathMatch: "full" },

    { path: "home", component: HomeComponent, outlet: "homeTab" },
    { path: "favorites", component: FavoritesListComponent, outlet: "favoritesTab" },
    { path: "item", component: ItemDetailComponent, outlet: "favoritesTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
