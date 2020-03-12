import { AfterContentInit, Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DataService, IDataItem } from "../core/data.service";
import { GestureTypes, PanGestureEventData, TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { isAndroid } from "tns-core-modules/platform";
import { SwipeLayout, SwipeLeftEventData, SwipeRightEventData } from "../nativescript-swipe-layout";
import { ANIMATION_STATE, GESTURE_MODE } from "../nativescript-swipe-layout/swipe-layout.enums";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    animations: [
        trigger("fade", [
            transition(":enter", [
                style({ opacity: 0 }),
                animate(200, style({ opacity: 1 }))
            ]),
            transition(":leave", [
                animate(200, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class HomeComponent implements OnInit, AfterContentInit {
    cards: Array<IDataItem>;
    gestureMode: GESTURE_MODE;
    isLoaded: boolean = false;
    swipeLayoutAnimated: ANIMATION_STATE;
    private _swipeLayouts: Array<SwipeLayout>;
    private _currentSwipeLayout: SwipeLayout;

    constructor(private _dataService: DataService, private _cd: ChangeDetectorRef) {
        this._swipeLayouts = [];
        this.swipeLayoutAnimated = ANIMATION_STATE.ON_EVENTS;
        this.gestureMode = GESTURE_MODE.DRAG;
    }

    ngAfterContentInit(): void {
        if (isAndroid) {
            setTimeout(() => {
                this.isLoaded = true;
            }, 2200);
        } else {
            setTimeout(() => {
                this.isLoaded = true;
            }, 500);
        }

    }

    ngOnInit(): void {
        this.initCards();
    }

    initCards() {
        this.cards = this._dataService.getUnseenItems().reverse() || [];
    }

    swipeLayoutLoaded(event, btnLike, btnIgnore, badgeLike, badgeIgnore) {
        const swipeLayout: SwipeLayout = <SwipeLayout>event.object;
        this._swipeLayouts.push(swipeLayout);
        swipeLayout.on(GestureTypes.pan, (args: PanGestureEventData) => {
            const vectorLength = (Math.sqrt(Math.pow(args.deltaX, 2) + Math.pow(args.deltaY, 2)));
            btnLike.opacity = this.mapVectorLengthToOpacity(vectorLength);
            btnIgnore.opacity = this.mapVectorLengthToOpacity(vectorLength);
            badgeLike.opacity = this.badgeOpacity(args.deltaX);
            badgeIgnore.opacity = this.badgeOpacity(-args.deltaX);
        });
        swipeLayout.on(GestureTypes.touch, (args: TouchGestureEventData) => {
            if (args.action === "up") {
                btnLike.animate({ opacity: 1, duration: 500 });
                btnIgnore.animate({ opacity: 1, duration: 500 });
                badgeLike.animate({ opacity: 0, duration: 500 });
                badgeIgnore.animate({ opacity: 0, duration: 500 });
            }
        });
    }

    onContainerLoaded(args) {
        this._currentSwipeLayout = this._swipeLayouts[0];
    }

    swipeLeftCallback(swipeLeftEvent: SwipeLeftEventData, card: IDataItem) {
        card.liked = false;
        this.next(card);
    }

    swipeRightCallback(swipeRightEvent: SwipeRightEventData, card: IDataItem) {
        card.liked = true;
        this.next(card);
    }

    decline(card: IDataItem) {
        card.liked = false;
        this._currentSwipeLayout.animateSwipeRight().then(() => {
            this.next(card);
        });
    }

    like(card: IDataItem) {
        card.liked = true;
        this._currentSwipeLayout.animateSwipeLeft().then(() => {
            this.next(card);
        });
    }

    trackingFunction(index, item) {
        return item.id;
    }

    resetCards(): void {
        this._dataService.resetItems();
        this.initCards();
        console.log(this.cards.length);
    }

    private mapVectorLengthToOpacity(l: number) {
        return (l - 0) * (0 - 1) / (80 - 0) + 1;
    }

    private badgeOpacity(deltaX: number) {
        return (deltaX - 20) * (1 - 0) / (120 - 20) + 0;
    }

    private next(card: IDataItem) {
        card.viewed = true;
        this._swipeLayouts.shift();
        this.cards.shift();
        this._currentSwipeLayout = this._swipeLayouts[0];
        this._dataService.updateItem(card);
        this._cd.detectChanges();
    }
}
