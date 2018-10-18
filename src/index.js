import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js"
import * as THREE from "three"
import MTLLoader from 'three-mtl-loader'

window.onload = () => {
    const elem = document.getElementById('sample');
    elem.innerHTML = 'bbbb';
    const canvas = document.getElementById('field');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1000, 1000)

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(455, 1)

    camera.position.set(0, 0, 2000)

    const box = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial()
    )
    const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial()
    )
    scene.add(box2)
    scene.add(box)

    const loader = new MTLLoader();
    const objLoader = new THREE.OBJLoader();
    loader.load('./assets/eichi_el_ei_tex.mtl', (material) => {
        material.preload()
        objLoader.setMaterials(material)
        objLoader.setPath('./assets/')
        objLoader.load('eichi_el_ei_tex.obj', (object) => {
            object.rotation.set(0, 0, 0)
            object.position.set(0, 0, 0)
            const obj = new THREE.Object3D()
            obj.add(object)
            scene.add(obj)
            const tick = () => {
                obj.rotation.y += 0.01;
                obj.rotation.x += 0.01;
                box.rotation.y += 0.01;
                box2.rotation.x += 0.01
                box.position.y += 0.5;
                box2.position.x += 0.5;
                renderer.render(scene, camera)
                requestAnimationFrame(tick)
            }
            tick()
        })
    })


}