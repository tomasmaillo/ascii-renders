class Triangle {
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
    this.calcNormal();
    this.normal = p1.clone().sub(p2).cross(p1.clone().sub(p3));
  }

  calcNormal() {
    const [p1, p2, p3] = this.points;
    this.normal = p1.clone().sub(p2).cross(p1.clone().sub(p3));
  }
}

export default Triangle;
