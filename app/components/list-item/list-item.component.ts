import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IDataItem } from "../../core/data.service";

@Component({
    selector: "list-item",
    moduleId: module.id,
    templateUrl: "./list-item.component.html"
})

export class ListItemComponent {

    @Input() isFavorite: boolean = false;
    @Input() item: IDataItem;

    @Output() disliked: EventEmitter<any> = new EventEmitter();
    @Output() tapped: EventEmitter<any> = new EventEmitter();

    emitTap() {
        this.tapped.emit(this);
    }

    emitDislike(item: IDataItem) {
        this.disliked.emit(this);
    }
}
