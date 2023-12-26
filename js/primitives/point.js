class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(
    context,
    { size = 18, color = "black", outline = false, fill = false } = {}
  ) {
    const rad = size / 2;
    context.beginPath();
    context.fillStyle = color;
    context.out;
    context.arc(this.x, this.y, rad, 0, Math.PI * 2);
    context.fill();
    if (outline) {
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "yellow";
      context.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      context.stroke();
    }
    if (fill) {
      context.beginPath();
      context.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
      context.fillStyle = "yellow";
      context.fill();
    }
  }

  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
}
