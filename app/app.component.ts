import { Component, OnDestroy, OnInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Animation } from "tns-core-modules/ui/animation";
import { View } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { Image } from "tns-core-modules/ui/image";
import { TabView } from "tns-core-modules/ui/tab-view";
import { DataService, IDataItem } from "./core/data.service";
import { ad, ios } from "tns-core-modules/utils/utils";
import { isAndroid } from "tns-core-modules/platform";

declare var UIApplication: any;

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.css"]
})
export class AppComponent implements OnInit, OnDestroy {

    tabIndex: number = 1;

    private _nativeTabsDisabled: boolean = false;
    private _itemsSubscription;
    private _favIcon: Image;
    private _backToNormalAnimationTimeout;
    private _favItemsLength = 0;

    constructor(private _dataService: DataService) {
        this._itemsSubscription = this._dataService.getLikedItems$()
            .subscribe((items: Array<IDataItem>) => {
                if (this.tabIndex === 1 && items.length !== this._favItemsLength) {
                    this.notifyNewFav();
                }
                this._favItemsLength = items.length;
            });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    ngOnDestroy(): void {
    }

    onFavIconLoaded(args: EventData) {
        this._favIcon = <Image>args.object;
    }

    notifyNewFav(): void {
        const iconPrefix = "~/images/";
        if (this._favIcon) {
            this._favIcon.src = iconPrefix + "star.png";
            this.popAnimation(this._favIcon).play().then(() => {
                this._backToNormalAnimationTimeout = setTimeout(() => {
                    this.backToNormalAnimation(this._favIcon).play().then(() => {
                        this._favIcon.src = iconPrefix + "star_o.png";
                        this._favIcon.opacity = 1;
                    });
                }, 250);
            });
        }
    }

    getIconSource(icon: string, tabIndex: number): string {
        const iconPrefix = "~/images/";
        const iconSuffix = tabIndex === this.tabIndex ? ".png" : "_o.png";
        if (this._backToNormalAnimationTimeout && this.tabIndex === 0) {
            clearTimeout(this._backToNormalAnimationTimeout);
            this._backToNormalAnimationTimeout = null;
            this._favIcon.opacity = 1;
            this._favIcon.scaleX = 1;
            this._favIcon.scaleY = 1;
        }

        return iconPrefix + icon + iconSuffix;
    }

    onTabViewLoaded(args: EventData): void {
        const tabView = <TabView>args.object;
        if (!this._nativeTabsDisabled) {
            if (tabView) {
                if (tabView.android) {
                    tabView.android.removeViewAt(1);
                } else {
                    tabView.ios.tabBar.hidden = true;
                }
            }
            this._nativeTabsDisabled = true;
        }
    }

    changeTabIndex(index: number) {
        try {
            if (isAndroid) {
                ad.dismissSoftInput();
            } else {
                ios.getter(UIApplication, UIApplication.sharedApplication)
                    .keyWindow
                    .endEditing(true);
            }
        } catch (e) {
            console.error(e);
        }
        if (index == 2) {
            alert('No content here :( Check out favorites list! Don\'t miss items details.');
        } else {
            this.tabIndex = index;
        }
    }

    private popAnimation(view: View) {
        return new Animation([
            {
                scale: { x: 1.2, y: 1.2 },
                duration: 200,
                curve: AnimationCurve.spring,
                target: view
            }
        ]);
    }

    private backToNormalAnimation(view: View) {
        return new Animation([
            {
                scale: { x: 1, y: 1 },
                opacity: 0,
                duration: 150,
                curve: AnimationCurve.easeInOut,
                target: view
            }
        ]);
    }

}
