"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swipe_layout_common_1 = require("./swipe-layout.common");
var SwipeLayout = (function (_super) {
    __extends(SwipeLayout, _super);
    function SwipeLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SwipeLayout.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    SwipeLayout.prototype.createNativeView = function () {
        return new android.widget.LinearLayout(this._context);
    };
    SwipeLayout.prototype.initNativeView = function () {
        this._androidViewId = android.view.View.generateViewId();
        this.nativeView.setId(this._androidViewId);
    };
    SwipeLayout.prototype[swipe_layout_common_1.gestureModeProperty.setNative] = function (gestureModevalue) {
        _super.prototype.setGestureMode.call(this, gestureModevalue);
    };
    return SwipeLayout;
}(swipe_layout_common_1.SwipeLayoutBase));
exports.SwipeLayout = SwipeLayout;
//# sourceMappingURL=swipe-layout.android.js.map