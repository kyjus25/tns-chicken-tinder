import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { Page } from "ui/page";
import { isIOS } from "tns-core-modules/platform";

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: IDataItem;
    opacity: number = 1;

    constructor(
        private data: DataService,
        private route: ActivatedRoute,
        private page: Page
    ) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.queryParams['id'];
        this.item = this.data.getItem(id);
        if (isIOS) {
            this.page.actionBarHidden = true;
        }
    }

    onScroll(args: ScrollEventData) {
        if (args.scrollY > 0 && args.scrollY < 230) {
            this.opacity = 1 - (args.scrollY * 0.0043);
        } else if (args.scrollY < 0) {
            this.opacity = 1;
        }
    }
}
