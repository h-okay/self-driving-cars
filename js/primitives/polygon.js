class Polygon {
  constructor(points) {
    this.points = points;
    this.segments = [];
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  static union(polys) {
    Polygon.multiBreak(polys);
    const keptSegments = [];
    for (let i = 0; i < polys.length; i++) {
      for (const segment of polys[i].segments) {
        let keep = true;
        for (let j = 0; j < polys.length; j++) {
          if (i !== j) {
            if (polys[j].containsSegment(segment)) {
              keep = false;
              break;
            }
          }
        }
        if (keep) {
          keptSegments.push(segment);
        }
      }
    }
    return keptSegments;
  }

  static multiBreak(polys) {
    for (let i = 0; i < polys.length - 1; i++) {
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j]);
      }
    }
  }

  static break(poly1, poly2) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;

    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const intersection = getIntersection(
          segs1[i].pointOne,
          segs1[i].pointTwo,
          segs2[j].pointOne,
          segs2[j].pointTwo
        );

        if (
          intersection &&
          intersection.offset !== 1 &&
          intersection.offset !== 0
        ) {
          const point = new Point(intersection.x, intersection.y);

          let aux = segs1[i].pointTwo;
          segs1[i].pointTwo = point;
          segs1.splice(i + 1, 0, new Segment(point, aux));

          aux = segs2[j].pointTwo;
          segs2[j].pointTwo = point;
          segs2.splice(j + 1, 0, new Segment(point, aux));
        }
      }
    }
  }

  containsSegment(segment) {
    const midpoint = average(segment.pointOne, segment.pointTwo);
    return this.containsPoint(midpoint);
  }

  containsPoint(point) {
    const outerPoint = new Point(-1000, 1000);
    let intersectionCount = 0;
    for (const segment of this.segments) {
      const int = getIntersection(
        outerPoint,
        point,
        segment.pointOne,
        segment.pointTwo
      );
      if (int) {
        intersectionCount++;
      }
    }
    return intersectionCount % 2 === 1;
  }

  distanceToPoint(point) {
    return Math.min(...this.segments.map((s) => s.distanceToPoint(point)));
  }

  distanceToPoly(poly) {
    return Math.min(...this.points.map((p) => poly.distanceToPoint(p)));
  }

  intersectsPoly(poly) {
    for (let s1 of this.segments) {
      for (let s2 of poly.segments) {
        if (
          getIntersection(s1.pointOne, s1.pointTwo, s2.pointOne, s2.pointTwo)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  draw(
    context,
    { stroke = "blue", lineWidth = 2, fill = "rgba(0,0,255,0.3)" } = {}
  ) {
    context.beginPath();
    context.fillStyle = fill;
    context.strokeStyle = stroke;
    context.lineWidth = lineWidth;
    context.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
  }
}
