import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js"
import * as THREE from "three"
import MTLLoader from 'three-mtl-loader'
const OrbitControls = require('three-orbitcontrols')
const ColladaLoader = require('three-collada-loader')

window.onload = () => {
    const elem = document.getElementById('sample');
    elem.innerHTML = 'bbbb';
    const canvas = document.getElementById('field');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1000, 1000)

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(455, 1)
    const orbit = new OrbitControls(camera)

    camera.position.set(0, 0, 1500)

    const box = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial()
    )
    const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial()
    )
    // scene.add(box2)
    // scene.add(box)

    const loader = new MTLLoader();
    loader.setPath('./assets/')
    const objLoader = new THREE.OBJLoader();

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3)
    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5)
    light.position.set(1, 0, 1)
    scene.add(ambientLight)
    scene.add(light)
    const daeLoader = new ColladaLoader()
    daeLoader.load('./assets/eichi_el_ei04.dae', (object) => {
        console.log(object)
        const daeScene = object.scene
        scene.add(daeScene)
        const mixer = new THREE.AnimationMixer(daeScene)
        const clock = new THREE.Clock();
        const animate = () => {
            renderer.render(scene, camera)
            orbit.update()
        }
        const tick = () => {
            daeScene.rotation.set(0, 0, 0)
            daeScene.position.set(0, 0, 0)
            daeScene.scale.set(1, 1, 1)
            daeScene.rotation.y += 0.01;
            renderer.render(scene, camera)
            requestAnimationFrame(tick)
        }
        tick()
    })

    // loader.load('eichi_el_ei_tex.mtl', (materials) => {
    //     materials.preload()
    //     objLoader.setMaterials(materials)
    //     objLoader.setPath('./assets/')
    //     objLoader.load('eichi_el_ei_tex.obj', (object) => {
    //         console.log(object)
    //         object.children.shift()
    //         object.rotation.set(0, 0, 0)
    //         object.position.set(0, 0, 0)
    //         object.scale.set(1, 1, 1)
    //         const obj = new THREE.Object3D()
    //         //obj.add(object)
    //         scene.add(object)
    //         const tick = () => {
    //             // object.rotation.y += 0.01;
    //             // box.rotation.y += 0.01;
    //             // box2.rotation.x += 0.01
    //             // box.position.y += 0.5;
    //             // box2.position.x += 0.5;
    //             object.children[3].rotation.y += 0.01
    //             renderer.render(scene, camera)
    //             requestAnimationFrame(tick)
    //         }
    //         tick()
    //     })
    // })
}