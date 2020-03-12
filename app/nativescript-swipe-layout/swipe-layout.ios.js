"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swipe_layout_common_1 = require("./swipe-layout.common");
var SwipeLayout = (function (_super) {
    __extends(SwipeLayout, _super);
    function SwipeLayout() {
        var _this = _super.call(this) || this;
        _this.nativeView = new UIView(CGRectMake(0, 0, 0, 0));
        return _this;
    }
    Object.defineProperty(SwipeLayout.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    SwipeLayout.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
    };
    SwipeLayout.prototype.initNativeView = function () {
    };
    SwipeLayout.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
    };
    SwipeLayout.prototype.disposeNativeView = function () {
    };
    SwipeLayout.prototype[swipe_layout_common_1.gestureModeProperty.setNative] = function (gestureModevalue) {
        _super.prototype.setGestureMode.call(this, gestureModevalue);
    };
    return SwipeLayout;
}(swipe_layout_common_1.SwipeLayoutBase));
exports.SwipeLayout = SwipeLayout;
//# sourceMappingURL=swipe-layout.ios.js.map