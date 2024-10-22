/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {



    fragmentShader = `

        in vec4 vColor;
        out vec4 fColor;

        void main() {
            if (gl_FrontFacing) {
                fColor = vColor;
            }

        }
    `;

    vertexShader = `

        in vec4 aPosition;
        in vec4 aColor;
        out vec4 vColor;
        uniform mat4 P;
        uniform mat4 MV;

        void main() {
            gl_Position = P * MV * aPosition;
            vColor = aColor;
        }

    `;

    let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);







    let positions = new Float32Array([
        -0.5, -0.5, -0.5,  // bottom left back
         0.5, -0.5, -0.5,   // bottom right back
        -0.5,  0.5, -0.5,   // top left back
         0.5,  0.5, -0.5,   // top right back
        -0.5, -0.5,  0.5,   // bottom left fromt
         0.5, -0.5,  0.5,   // bottom right front
        -0.5,  0.5,  0.5,   // top left front
         0.5,  0.5,  0.5    // top right front
    ]);



    let colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  
            1.0, 0.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,   
     ]);



    let indices = new Uint8Array([
      0, 2, 1, 3,
      5, 7, 4, 6,
      0, 2, 2, 6, 
      3, 7, 7, 5, 
      1, 4, 0,
    ]);


    const aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
    const aColor = new Attribute(gl, program, "aColor", colors, 4, gl.FLOAT);
    indices = new Indices(gl, indices);



        this.draw = () => {
            program.use();
            aPosition.enable();
            aColor.enable();

            gl.drawElements(gl.TRIANGLE_STRIP, indices.count, indices.type, 0);
            aColor.disable();
            aPosition.disable();
            

        };
    }
};
