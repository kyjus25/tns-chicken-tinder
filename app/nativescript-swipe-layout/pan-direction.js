"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gestures_1 = require("tns-core-modules/ui/gestures/gestures");
var platform_1 = require("tns-core-modules/platform");
var PanDirection = (function () {
    function PanDirection(swipe) {
        this.isSwipe = false;
        this.isSwipe = swipe;
    }
    return PanDirection;
}());
exports.PanDirection = PanDirection;
var PanDirectionBuilder = (function () {
    function PanDirectionBuilder(initDeltaValue, lastDeltaValue, width, height) {
        this.initPanDelta = initDeltaValue;
        this.lastPanDelta = lastDeltaValue;
        this.containerWidth = width;
        this.containerHeight = height;
    }
    PanDirectionBuilder.prototype.build = function () {
        var panDirection = new PanDirection(false);
        var XDistance = Math.abs(this.lastPanDelta.x - this.initPanDelta.x), initYDistance = this.initPanDelta.y - this.lastPanDelta.y, YDistance = Math.abs(initYDistance);
        panDirection.isSwipe = XDistance > platform_1.screen.mainScreen.widthDIPs / 4 || YDistance > platform_1.screen.mainScreen.heightDIPs / 6;
        if (panDirection.isSwipe) {
            var goingHorizontaly = XDistance > YDistance;
            if (goingHorizontaly) {
                var goingLeft = this.lastPanDelta.x < this.initPanDelta.x;
                if (!goingLeft) {
                    panDirection.swipeDirection = gestures_1.SwipeDirection.right;
                }
                else {
                    panDirection.swipeDirection = gestures_1.SwipeDirection.left;
                }
            }
            else {
                var goingUp = initYDistance > 0;
                if (goingUp) {
                    panDirection.swipeDirection = gestures_1.SwipeDirection.up;
                }
                else {
                    panDirection.swipeDirection = gestures_1.SwipeDirection.down;
                }
            }
        }
        return panDirection;
    };
    return PanDirectionBuilder;
}());
exports.PanDirectionBuilder = PanDirectionBuilder;
//# sourceMappingURL=pan-direction.js.map