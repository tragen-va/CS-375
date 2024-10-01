let gl = undefined;
let ms;
let axes, sphere, tetra;
let angle = 0.0;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here

    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    axes = new Axes(gl);
    sphere = new Sphere(gl, 9, 4.5);
    tetra = new Tetrahedron(gl);
    ms = new MatrixStack();

    render();

}

function render() {
    // Add rendering code here

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    angle += 1.0;
    angle %= 360.0;

    // axes
    ms.push();
    ms.scale(.25, .25, .25);
    axes.MV = ms.current();
    axes.draw();
    ms.pop();
    
    // sphere
    ms.push();
    ms.translate(0.5, 0.0, 0.0);
    ms.rotate(angle, [0, 1, 0]);
    ms.scale(0.25, 0.25, 0.25);
    sphere.MV = ms.current();
    sphere.draw();
    ms.pop();
    

    
    // tetrahedron
    ms.push();
    ms.translate(-0.5, -0.5, 0.0);
    ms.scale(0.2, 0.2, 0.2);
    tetra.MV = ms.current();
    tetra.draw();
    ms.pop();





    requestAnimationFrame(render);

}

window.onload = init;
