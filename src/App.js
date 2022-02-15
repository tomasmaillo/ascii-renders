import "./App.css";
import React, { useState, useEffect } from "react";
import * as THREE from "three";

const shades = ["@", "%", "#", "*", "+", "=", "-", "."];

class Triangle {
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
    this.calcNormal();
    this.normal = p1.clone().sub(p2).cross(p1.clone().sub(p3));
    this.point = p1; // So that it can also act as a Planei
  }

  calcNormal() {
    const [p1, p2, p3] = this.points;
    this.point = p1;
    this.normal = p1.clone().sub(p2).cross(p1.clone().sub(p3));
  }
}

function areaTriangle(p1, p2, p3) {
  const matrix = new THREE.Matrix3().set(
    ...p1.toArray(),
    ...p2.toArray(),
    ...p3.toArray()
  );

  return 0.5 * Math.abs(matrix.determinant());
}

setInterval(oneSecondFunction, 10);

let i = 1;

const testTriangle = new Triangle(
  new THREE.Vector3(1, 2, 4),
  new THREE.Vector3(-1, 2, -1),
  new THREE.Vector3(-4, 2, 1)
);

function oneSecondFunction() {
  console.log(Math.sin(i));
  testTriangle.points = [
    new THREE.Vector3(3, Math.cos(i) + 2, Math.sin(i) * 2 - 2),
    new THREE.Vector3(
      3,
      Math.cos(i - Math.PI) + 2,
      Math.sin(i - Math.PI) * 2 + 2
    ),
    new THREE.Vector3(-7, 2, 0),
  ];
  testTriangle.calcNormal();
  i += 0.1;
}

// Returns [point of intersection, angle of incidence]
function rayPlaneIntersection(ray, plane) {
  const pElevation = plane.normal.dot(plane.point);

  const varOfIntersection = pElevation / plane.normal.dot(ray);

  //const angleIncidence = new THREE.Vector3(1, 1, 0).angleTo(plane.normal);
  const angleIncidence = ray.angleTo(plane.normal);

  return [ray.multiplyScalar(varOfIntersection), angleIncidence];
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

// Camera position is always origin
function Camera({ width, height }) {
  const [rendered, setRendered] = useState([""]);

  useEffect(() => {
    let rays = [];
    for (let i = -height / 2; i < height / 2; i++) {
      let row = [];
      for (let j = -width / 2; j < width / 2; j++) {
        row.push(new THREE.Vector3(i / 10, 0.9, j / 20));
      }
      rays.push(row);
    }

    let render = [];
    rays.forEach((row) => {
      let renderRow = "";
      row.forEach((ray) => {
        const [intersectionPoint, incidenceAngle] = rayPlaneIntersection(
          ray,
          testTriangle
        );
        const insideTriangle = pointWithinTriangle(
          intersectionPoint,
          testTriangle
        );
        renderRow += insideTriangle
          ? shades[Math.ceil(incidenceAngle * 2.2)] //
          : "·";
      });
      render.push(renderRow);
      setRendered(render);
    });
  });

  return (
    <>
      {rendered.map((value, index) => {
        return (
          <p aria-hidden="true" key={index}>
            {value}
          </p>
        );
      })}
    </>
  );
}

function App() {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <div style={{ color: "red" }}>
      <Camera width={width / 10} height={height / 10} />
    </div>
  );
}

export default App;
