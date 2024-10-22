/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
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
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 0.0, 0.0,
            0.0, 1.0, 1.0, 
            0.0, 1.0, 0.0,      
            1.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0,    
            1.0, 1.0, 0.0, 
            1.0, 0.0, 0.0, 
            0.0, 0.0, 0.0,      
            1.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 
            1.0, 0.0, 0.0,      
            1.0, 0.0, 1.0, 
            0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0,    
            1.0, 1.0, 1.0, 
            1.0, 1.0, 0.0, 
            0.0, 1.0, 0.0,     
            1.0, 1.0, 1.0, 
            0.0, 1.0, 0.0, 
            0.0, 1.0, 1.0,     
            1.0, 1.0, 1.0, 
            1.0, 0.0, 0.0, 
            1.0, 1.0, 0.0,    
            1.0, 0.0, 0.0, 
            1.0, 1.0, 1.0, 
            1.0, 0.0, 1.0,      
            1.0, 1.0, 1.0, 
            0.0, 1.0, 1.0, 
            1.0, 0.0, 1.0,     
            0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 
            1.0, 0.0, 1.0
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
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  
            1.0, 0.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,   
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  
            1.0, 0.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,   
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  
            1.0, 0.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,   
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0
        ]);






    //const aPosition = new Attribute(gl, positions, "aPosition", program, 3, gl.FLOAT);
    //const aColor = new Attribute(gl, colors, "aColor", program, 4, gl.FLOAT);

    const aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
    const aColor = new Attribute(gl, program, "aColor", colors, 4, gl.FLOAT);






        this.draw = () => {
            program.use();
            aPosition.enable();
            aColor.enable();

            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aColor.disable();
            aPosition.disable();
        };
    }
};
