import * as THREE from "three";

function areaTriangle(p1, p2, p3) {
  const matrix = new THREE.Matrix3().set(
    ...p1.toArray(),
    ...p2.toArray(),
    ...p3.toArray()
  );

  return 0.5 * Math.abs(matrix.determinant());
}

function pointWithinTriangle(point, triangle) {
  const triangleArea = areaTriangle(
    triangle.points[0],
    triangle.points[1],
    triangle.points[2]
  );

  const combinedArea =
    areaTriangle(triangle.points[0], triangle.points[1], point) +
    areaTriangle(triangle.points[1], triangle.points[2], point) +
    areaTriangle(triangle.points[0], triangle.points[2], point);

  if (Math.abs(triangleArea - combinedArea) <= 0.01) {
    return true;
  } else {
    return false;
  }
}

// Returns [point of intersection, angle of incidence]
function rayPlaneIntersection(ray, plane) {
  const pElevation = plane.normal.dot(plane.points[0]);

  const varOfIntersection = pElevation / plane.normal.dot(ray);

  //let angleIncidence = new THREE.Vector3(1, 1, 0).angleTo(plane.normal);
  let angleIncidence = Math.abs(ray.angleTo(plane.normal));
  if (angleIncidence > Math.PI / 2) {
    angleIncidence -= Math.PI / 2;
  }
  if (Math.abs(ray.getComponent(0)) == 0) console.log(angleIncidence);

  return [ray.multiplyScalar(varOfIntersection), angleIncidence];
}

function rotateTriangle(triangle, rotation) {
  return;
}

export {
  rayPlaneIntersection,
  areaTriangle,
  pointWithinTriangle,
  rotateTriangle,
};
