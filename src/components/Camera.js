import * as THREE from "three";
import React, { useState, useEffect } from "react";

import { pointWithinTriangle, rayPlaneIntersection } from "./Helpers";

//import { testTriangle } from "./WorldLoader";

const shades = "$@B%8&WM#*oahkbdpqwmzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,`'.";

/*
let i = 1;

function oneSecondFunction() {
  testTriangle.points = [
    new THREE.Vector3(3, Math.cos(i) + 3, Math.sin(i) * 4),
    new THREE.Vector3(3, Math.cos(i - Math.PI) + 3, Math.sin(i - Math.PI) * 4),
    new THREE.Vector3(-7, 3, 0),
  ];
  testTriangle.calcNormal();
  i += 0.05;
}
setInterval(oneSecondFunction, 10);
*/
function generateRayVectors(width, height) {
  let rays = [];
  for (let i = -height / 2; i < height / 2; i++) {
    let row = [];
    for (let j = -width / 2; j < width / 2; j++) {
      row.push(new THREE.Vector3(i / 10, 2, j / 20));
    }
    rays.push(row);
  }
  return rays;
}

// Camera position is always origin
function Camera({ world, width, height }) {
  const [rendered, setRendered] = useState([""]);
  const rays = generateRayVectors(width, height);

  useEffect(() => {
    console.log("heyy");
    let render = [];
    rays.forEach((row) => {
      let renderRow = "";
      row.forEach((ray) => {
        let intersections = [];
        world.forEach((triangle) => {
          const [intersectionPoint, incidenceAngle] = rayPlaneIntersection(
            ray,
            triangle
          );
          const insideTriangle = pointWithinTriangle(
            intersectionPoint,
            triangle
          );

          if (insideTriangle)
            intersections.push([intersectionPoint, incidenceAngle]);
        });

        if (intersections.length == 0) {
          renderRow += "·";
          return;
        }

        const closestIntersectionIndex = intersections.reduce(
          (iMax, x, i, arr) =>
            x[0].distanceTo(new THREE.Vector3(0, 0, 0)) >
            arr[iMax][0].distanceTo(new THREE.Vector3(0, 0, 0))
              ? i
              : iMax,
          0
        );

        const incidenceAngle = intersections[closestIntersectionIndex][1];

        renderRow += shades[Math.ceil(incidenceAngle * 10)];
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

export default Camera;
