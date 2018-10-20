import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js"
import * as THREE from "three"
const OrbitControls = require('three-orbitcontrols')
const GltfLoader = require('three-gltf-loader')

window.onload = () => {
    const canvas = document.getElementById('field');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    renderer.setClearColor(0xFFA4C8)
    renderer.gammaOutput = true;
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1000, 1000)

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(455, 1, 0.1, 5000)
    camera.position.set(0, 200, 1500)
    const orbit = new OrbitControls(camera)
    const light = new THREE.DirectionalLight(0xFFFFFF, 0.2)
    light.position.set(1, 0, 1)
    const axis = new THREE.AxisHelper(1500)
    const box = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial())
    scene.add(axis, box, light)

    let mixer
    const clock = new THREE.Clock()
    const animation = () => {
        renderer.render(scene, camera)
        orbit.update()
        if(mixer) {
            mixer.update(clock.getDelta())
        }
        requestAnimationFrame(animation)
    }
    animation()

    const loader = new GltfLoader()
    loader.load('./assets/hli.gltf', (data) => {
        data.scene.children = data.scene.children.filter((e) => e.name !== ('tochi'))
        data.scene.scale.set(300, 300, 300)
        scene.add(box)
        scene.add(data.scene)

        if (data.animations) {
            mixer = new THREE.AnimationMixer(data.scene)
            data.animations.forEach((e) => {
                mixer.clipAction(e).play()
            })
        }
        const tick = () => {
            scene.rotation.y += 0.001
            renderer.render(scene, camera)
            requestAnimationFrame(tick)
        }
        tick()
    })
}
