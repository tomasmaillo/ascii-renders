import Triangle from "./Triangle";
import * as THREE from "three";

const loadTriangle = (vertices) => {
  return new Triangle(
    new THREE.Vector3(...vertices[0]),
    new THREE.Vector3(...vertices[1]),
    new THREE.Vector3(...vertices[2])
  );
};

const loadWorld = (world) => {
  let parsedWorld = [];
  world.forEach((triangleVertices) => {
    parsedWorld.push(loadTriangle(triangleVertices));
  });

  return parsedWorld;
};

export default loadWorld;
