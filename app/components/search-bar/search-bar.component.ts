import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isIOS } from "platform";
declare var UISearchBarStyle, UIImage;

@Component({
    selector: "search",
    moduleId: module.id,
    templateUrl: "./search-bar.component.html"
})
export class SearchBarComponent {
    @Input() col: number = 0;
    @Input() row: number = 0;
    @Output() submit: EventEmitter<any> = new EventEmitter();
    @Output() clear: EventEmitter<any> = new EventEmitter();

    searchPhrase: string;

    onLoaded(args) {
        const nativeView = <SearchBar>args.object;
        if (isIOS) {
            nativeView.nativeView.searchBarStyle = UISearchBarStyle.Prominent;
            nativeView.nativeView.backgroundImage = UIImage.new();
        } else {
            nativeView.android.clearFocus();
        }
    }

    onSubmit(args) {
        const searchBar = <SearchBar>args.object;
        searchBar.dismissSoftInput();
        this.submit.emit(searchBar.text);
    }

    onClear() {
        this.clear.emit();
    }
}
