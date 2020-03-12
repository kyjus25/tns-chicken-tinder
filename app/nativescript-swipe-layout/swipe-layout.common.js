"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var gestures_1 = require("tns-core-modules/ui/gestures/gestures");
var properties_1 = require("tns-core-modules/ui/core/properties/properties");
var enums_1 = require("tns-core-modules/ui/enums");
var swipe_event_data_1 = require("./swipe-event-data");
var swipe_layout_enums_1 = require("./swipe-layout.enums");
var pan_direction_1 = require("./pan-direction");
var SwipeLayoutBase = (function (_super) {
    __extends(SwipeLayoutBase, _super);
    function SwipeLayoutBase() {
        var _this = _super.call(this) || this;
        _this.swipeLeftEvent = "swipeLeft";
        _this.swipeRightEvent = "swipeRight";
        _this.swipeUpEvent = "swipeUp";
        _this.swipeDownEvent = "swipeDown";
        _this.animationDuration = 500;
        _this.prevDelta = {
            x: 0,
            y: 0
        };
        _this.initDelta = {
            x: 0,
            y: 0
        };
        _this.isCurrentlyAnimated = false;
        _this.initOriginX = _this.originX;
        _this.initOriginY = _this.originY;
        _this.animationState = swipe_layout_enums_1.ANIMATION_STATE.ALWAYS;
        _this.gestureMode = swipe_layout_enums_1.GESTURE_MODE.SWIPE;
        return _this;
    }
    SwipeLayoutBase.prototype.swipeGestureHandler = function (swipeGestureEventDataValue) {
        this.commonHandler(swipeGestureEventDataValue.direction);
    };
    SwipeLayoutBase.prototype.commonHandler = function (swipeDirection) {
        var _this = this;
        var eventData = this.getEventData(swipeDirection);
        if (eventData.animated) {
            var that_1 = this;
            this.swipe(eventData).then(function (value) {
                that_1.notify(eventData);
            }).catch(function (reason) {
                throw new Error(reason);
            });
        }
        else {
            this.centerBack().then(function () {
                _this.notify(eventData);
            });
        }
    };
    SwipeLayoutBase.prototype.centerBack = function () {
        var that = this;
        return this.animate({
            translate: {
                x: that.initOriginX,
                y: that.initOriginY
            },
            duration: that.animationDuration,
        });
    };
    SwipeLayoutBase.prototype.setGestureMode = function (gestureModevalue) {
        if (gestureModevalue === swipe_layout_enums_1.GESTURE_MODE.DRAG) {
            this.removeEventListener("swipe");
            this.on(gestures_1.GestureTypes.pan, this.panGestureHandler, this);
        }
        else {
            this.removeEventListener("pan");
            this.on(gestures_1.GestureTypes.swipe, this.swipeGestureHandler, this);
        }
    };
    SwipeLayoutBase.prototype.panGestureHandler = function (panGestureEventDataValue) {
        switch (panGestureEventDataValue.state) {
            case 1:
                this.initPaning();
                break;
            case 2:
                this.paningHandler(panGestureEventDataValue);
                break;
            case 3:
                this.dismissPaning(panGestureEventDataValue);
                break;
        }
    };
    SwipeLayoutBase.prototype.initPaning = function () {
        this.initDelta.x = this.initDelta.y = this.prevDelta.x = this.prevDelta.y = 0;
    };
    SwipeLayoutBase.prototype.paningHandler = function (panGestureEventDataValue) {
        this.translateX += panGestureEventDataValue.deltaX - this.prevDelta.x;
        this.translateY += panGestureEventDataValue.deltaY - this.prevDelta.y;
        this.prevDelta.x = panGestureEventDataValue.deltaX;
        this.prevDelta.y = panGestureEventDataValue.deltaY;
    };
    SwipeLayoutBase.prototype.dismissPaning = function (panGestureEventDataValue) {
        var currentLocation = this.getLocationOnScreen();
        var directionBuilder = new pan_direction_1.PanDirectionBuilder(this.initDelta, currentLocation, this.effectiveWidth, this.effectiveHeight);
        var panDirection = directionBuilder.build();
        if (panDirection.isSwipe) {
            this.commonHandler(panDirection.swipeDirection);
        }
        else {
            var that = this;
            this.centerBack();
        }
    };
    SwipeLayoutBase.prototype.getEventData = function (direction) {
        var width = this.getMeasuredWidth(), height = this.getMeasuredHeight();
        var eventData;
        var shouldBeAnimated;
        switch (direction) {
            case gestures_1.SwipeDirection.down:
                shouldBeAnimated = (this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ON_EVENTS && this.hasSwipeDownListener()) || this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ALWAYS;
                eventData = new swipe_event_data_1.SwipeDownEventData(this.originX, this.originY, this.initOriginX, height + height / 2, shouldBeAnimated);
                break;
            case gestures_1.SwipeDirection.up:
                shouldBeAnimated = (this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ON_EVENTS && this.hasSwipeUpListener()) || this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ALWAYS;
                eventData = new swipe_event_data_1.SwipeUpEventData(this.originX, this.originY, this.initOriginX, -height / 2, shouldBeAnimated);
                break;
            case gestures_1.SwipeDirection.left:
                shouldBeAnimated = (this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ON_EVENTS && this.hasSwipeLeftListener()) || this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ALWAYS;
                eventData = new swipe_event_data_1.SwipeLeftEventData(this.originX, this.originY, -width / 2, this.initOriginY, shouldBeAnimated);
                break;
            case gestures_1.SwipeDirection.right:
                shouldBeAnimated = (this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ON_EVENTS && this.hasSwipeRightListener()) || this.animationState === swipe_layout_enums_1.ANIMATION_STATE.ALWAYS;
                eventData = new swipe_event_data_1.SwipeRightEventData(this.originX, this.originY, width + width / 2, this.initOriginY, shouldBeAnimated);
                break;
        }
        return eventData;
    };
    SwipeLayoutBase.prototype.hasSwipeLeftListener = function () {
        return this.hasListeners('swipeLeft');
    };
    SwipeLayoutBase.prototype.hasSwipeRightListener = function () {
        return this.hasListeners('swipeRight');
    };
    SwipeLayoutBase.prototype.hasSwipeUpListener = function () {
        return this.hasListeners('swipeUp');
    };
    SwipeLayoutBase.prototype.hasSwipeDownListener = function () {
        return this.hasListeners('swipeDown');
    };
    SwipeLayoutBase.prototype.animateSwipeLeft = function () {
        return this.swipe(this.getEventData(gestures_1.SwipeDirection.left));
    };
    SwipeLayoutBase.prototype.animateSwipeRight = function () {
        return this.swipe(this.getEventData(gestures_1.SwipeDirection.right));
    };
    SwipeLayoutBase.prototype.animateSwipeUp = function () {
        return this.swipe(this.getEventData(gestures_1.SwipeDirection.up));
    };
    SwipeLayoutBase.prototype.animateSwipeDown = function () {
        return this.swipe(this.getEventData(gestures_1.SwipeDirection.down));
    };
    SwipeLayoutBase.prototype.swipe = function (eventData) {
        var that = this;
        return this.animate({
            translate: {
                x: eventData.destinationX,
                y: eventData.destinationY
            },
            duration: that.animationDuration,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    };
    return SwipeLayoutBase;
}(content_view_1.ContentView));
exports.SwipeLayoutBase = SwipeLayoutBase;
exports.animationStateProperty = new properties_1.Property({
    name: "animationState"
});
exports.animationStateProperty.register(SwipeLayoutBase);
exports.gestureModeProperty = new properties_1.Property({
    name: "gestureMode"
});
exports.gestureModeProperty.register(SwipeLayoutBase);
//# sourceMappingURL=swipe-layout.common.js.map