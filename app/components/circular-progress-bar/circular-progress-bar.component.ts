import { Component, Input } from "@angular/core";

@Component({
	selector: "circular-progress-bar",
	moduleId: module.id,
	templateUrl: "./circular-progress-bar.component.html"
})
export class CircularProgressBarComponent {
	@Input() size = 41;
	@Input() progress = 81;
	@Input() col = 0;
	@Input() row = 0;
	@Input() colSpan = 0;
	@Input() rowSpan = 0;

	get height() {
		return Math.min(this.size, 250);
	};
	get value() {
		return Math.min(this.progress, 100);
	};
	get textSize() {
		return this.height / 3.5;
	};
}
