import { useMemo } from "react";
import "./App.css";
import * as THREE from "three";

import Camera from "./components/Camera";

import loadWorld from "./components/WorldLoader";
import rawWorld from "./World";

let i = 1;
function App() {
  const { innerWidth: width, innerHeight: height } = window;

  //const world = useMemo(() => loadWorld(rawWorld));
  // placeholder code for rotation
  const world = loadWorld(rawWorld);
  setInterval(rotation, 10);
  function rotation() {
    world[0].points = [
      new THREE.Vector3(3, Math.cos(i) + 5, Math.sin(i) * 3),
      new THREE.Vector3(
        3,
        Math.cos(i - Math.PI) + 5,
        Math.sin(i - Math.PI) * 3
      ),
      new THREE.Vector3(-7, 5, 0),
    ];
    world[0].calcNormal();
    i += 0.001;
  }

  return (
    <div style={{ color: "red" }}>
      <Camera world={world} width={width / 10} height={height / 10} />
    </div>
  );
}

export default App;
