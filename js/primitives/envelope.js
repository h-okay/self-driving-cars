class Envelope {
  constructor(skeleton, width, roundness = 1) {
    if (skeleton) {
      this.skeleton = skeleton;
      this.poly = this.#generatePolygon(width, roundness);
    }
  }

  static load(info) {
    const env = new Envelope();
    env.skeleton = new Segment(info.skeleton.pointOne, info.skeleton.pointTwo);
    env.poly = Polygon.load(info.poly);
    return env;
  }

  #generatePolygon(width, roundness) {
    const { pointOne, pointTwo } = this.skeleton;

    const radius = width / 2;
    const alpha = angle(subtract(pointOne, pointTwo));
    const alpha_cw = alpha + Math.PI / 2; // clockwise
    const alpha_ccw = alpha - Math.PI / 2; // counter clockwise

    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step / 2;
    for (let i = alpha_ccw; i < alpha_cw + eps; i += step) {
      points.push(translate(pointOne, i, radius));
    }
    for (let i = alpha_ccw; i < alpha_cw + eps; i += step) {
      points.push(translate(pointTwo, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(context, options) {
    this.poly.draw(context, options);
  }
}
