"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gestures_1 = require("tns-core-modules/ui/gestures/gestures");
var SwipeEventData = (function () {
    function SwipeEventData(originXValue, originYValue, destinationXValue, destinationYValue, animated) {
        this.originX = originXValue;
        this.originY = originYValue;
        this.animated = animated;
        if (destinationYValue) {
            this.destinationY = destinationYValue;
        }
        else {
            this.destinationY = this.originY;
        }
        if (destinationXValue) {
            this.destinationX = destinationXValue;
        }
        else {
            this.destinationX = this.originX;
        }
    }
    return SwipeEventData;
}());
exports.SwipeEventData = SwipeEventData;
var SwipeLeftEventData = (function (_super) {
    __extends(SwipeLeftEventData, _super);
    function SwipeLeftEventData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "swipeLeft";
        _this.direction = gestures_1.SwipeDirection.left;
        return _this;
    }
    return SwipeLeftEventData;
}(SwipeEventData));
exports.SwipeLeftEventData = SwipeLeftEventData;
var SwipeRightEventData = (function (_super) {
    __extends(SwipeRightEventData, _super);
    function SwipeRightEventData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "swipeRight";
        _this.direction = gestures_1.SwipeDirection.right;
        return _this;
    }
    return SwipeRightEventData;
}(SwipeEventData));
exports.SwipeRightEventData = SwipeRightEventData;
var SwipeUpEventData = (function (_super) {
    __extends(SwipeUpEventData, _super);
    function SwipeUpEventData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "swipeUp";
        _this.direction = gestures_1.SwipeDirection.up;
        return _this;
    }
    return SwipeUpEventData;
}(SwipeEventData));
exports.SwipeUpEventData = SwipeUpEventData;
var SwipeDownEventData = (function (_super) {
    __extends(SwipeDownEventData, _super);
    function SwipeDownEventData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "swipeDown";
        _this.direction = gestures_1.SwipeDirection.down;
        return _this;
    }
    return SwipeDownEventData;
}(SwipeEventData));
exports.SwipeDownEventData = SwipeDownEventData;
//# sourceMappingURL=swipe-event-data.js.map