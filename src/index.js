import {WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Mesh} from 'three'

window.onload = () => {
    const elem = document.getElementById('sample');
    elem.innerHTML = 'bbbb';
    const canvas = document.getElementById('field');
    const renderer = new WebGLRenderer({canvas});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1000, 1000)

    const scene = new Scene();

    const camera = new PerspectiveCamera(455, 1)

    camera.position.set(0, 0, 1000)

    const box = new Mesh(
        new BoxGeometry(200, 200, 200),
        new MeshNormalMaterial()
    )
    const box2 = new Mesh(
        new BoxGeometry(150, 150, 150),
        new MeshNormalMaterial()
    )

    scene.add(box)
    scene.add(box2)
    const tick = () => {
        box.rotation.y += 0.01;
        box2.rotation.x += 0.01
        box.position.y += 0.5;
        box2.position.x += 0.5;
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }
    tick()

}