class Segment {
  constructor(pointOne, pointTwo) {
    this.pointOne = pointOne;
    this.pointTwo = pointTwo;
  }

  draw(context, { width = 2, color = "black", dash = [] } = {}) {
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.setLineDash(dash);
    context.moveTo(this.pointOne.x, this.pointOne.y);
    context.lineTo(this.pointTwo.x, this.pointTwo.y);
    context.stroke();
    context.setLineDash([]);
  }

  equals(segment) {
    return this.includes(segment.pointOne) && this.includes(segment.pointTwo);
  }

  includes(point) {
    return this.pointOne.equals(point) || this.pointTwo.equals(point);
  }
}
