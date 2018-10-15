window.onload = () => {
    const elem = document.getElementById('sample');
    elem.innerHTML = 'bbbb';
    const canvas = document.getElementById('field')
    canvas.height = 1000;
    canvas.width = 1000;

    const gl = canvas.getContext('webgl2')

    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    const vSource = [
        'precision mediump float;',
        'attribute vec2 vertex;',
        'void main(void) {',
        'gl_Position = vec4(vertex, 0.0, 1.0);',
        '}'].join('\n')
        console.log(vSource)
    const vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vSource)
    gl.compileShader(vShader)
    gl.getShaderParameter(vShader, gl.COMPILE_STATUS)

    const rgba = [0.0, 0.0, 0.0, 1.0] // Red, Green, Blue, Alpha
    const fSource = [
      "precision mediump float;",
      "void main(void) {",
      "gl_FragColor = vec4(“+ rgba.join(“,”) +”);",
      "}"
    ].join('\n')
    const fShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fShader, fSource)
      gl.compileShader(fShader)
      gl.getShaderParameter(fShader, gl.COMPILE_STATUS)
    
    const program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)
    gl.getProgramParameter(program, gl.LINK_STATUS)
    gl.useProgram(program)

    const vertex = gl.getAttribLocation(program, 'vertex')
    gl.enableVertexAttribArray(vertex)
    gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0)
    
    const vertices = [
        -1 , 0, //x,y
        1 , 0 //x,y
    ]
    const verticesNum = vertices.length / 2

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, verticesNum)
}