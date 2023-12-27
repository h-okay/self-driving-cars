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

  length() {
    return distance(this.pointOne, this.pointTwo);
  }

  directionVector() {
    return normalize(substract(this.pointTwo, this.pointOne));
  }

  distanceToPoint(point) {
    const proj = this.projectPoint(point);
    if (proj.offset > 0 && proj.offset < 1) {
      return distance(point, proj.point);
    }
    const disToP1 = distance(point, this.pointOne);
    const disToP2 = distance(point, this.pointTwo);
    return Math.min(disToP1, disToP2);
  }

  projectPoint(point) {
    const a = substract(point, this.pointOne);
    const b = substract(this.pointTwo, this.pointOne);
    const normB = normalize(b);
    const scaler = dot(a, normB);
    const proj = {
      point: add(this.pointOne, scale(normB, scaler)),
      offset: scaler / magnitude(b),
    };
    return proj;
  }
}
