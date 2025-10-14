/**
 * 4D Geometry Classes for THREE.js
 * Implements various 4-dimensional objects and their projections to 3D
 */

class Vector4D {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    clone() {
        return new Vector4D(this.x, this.y, this.z, this.w);
    }

    add(v) {
        return new Vector4D(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    subtract(v) {
        return new Vector4D(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }

    multiplyScalar(s) {
        return new Vector4D(this.x * s, this.y * s, this.z * s, this.w * s);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    normalize() {
        const len = this.length();
        if (len === 0) return new Vector4D(0, 0, 0, 0);
        return this.multiplyScalar(1 / len);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    toVector3() {
        return new THREE.Vector3(this.x, this.y, this.z);
    }

    static fromVector3(v3, w = 0) {
        return new Vector4D(v3.x, v3.y, v3.z, w);
    }
}

class Matrix4D {
    constructor() {
        this.elements = new Float32Array(16);
        this.identity();
    }

    identity() {
        const te = this.elements;
        te[0] = 1; te[4] = 0; te[8] = 0; te[12] = 0;
        te[1] = 0; te[5] = 1; te[9] = 0; te[13] = 0;
        te[2] = 0; te[6] = 0; te[10] = 1; te[14] = 0;
        te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;
        return this;
    }

    multiply(m) {
        const ae = this.elements;
        const be = m.elements;
        const te = new Float32Array(16);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                te[i * 4 + j] = 0;
                for (let k = 0; k < 4; k++) {
                    te[i * 4 + j] += ae[i * 4 + k] * be[k * 4 + j];
                }
            }
        }

        this.elements = te;
        return this;
    }

    rotateXY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = c; te[1] = s; te[2] = 0; te[3] = 0;
        te[4] = -s; te[5] = c; te[6] = 0; te[7] = 0;
        te[8] = 0; te[9] = 0; te[10] = 1; te[11] = 0;
        te[12] = 0; te[13] = 0; te[14] = 0; te[15] = 1;
       
        return this.multiply(rotationMatrix);
    }

    rotateXZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = c; te[1] = 0; te[2] = s; te[3] = 0;
        te[4] = 0; te[5] = 1; te[6] = 0; te[7] = 0;
        te[8] = -s; te[9] = 0; te[10] = c; te[11] = 0;
        te[12] = 0; te[13] = 0; te[14] = 0; te[15] = 1;
       
        return this.multiply(rotationMatrix);
    }

    rotateXW(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = c; te[1] = 0; te[2] = 0; te[3] = s;
        te[4] = 0; te[5] = 1; te[6] = 0; te[7] = 0;
        te[8] = 0; te[9] = 0; te[10] = 1; te[11] = 0;
        te[12] = -s; te[13] = 0; te[14] = 0; te[15] = c;
       
        return this.multiply(rotationMatrix);
    }

    rotateYZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = 1; te[1] = 0; te[2] = 0; te[3] = 0;
        te[4] = 0; te[5] = c; te[6] = s; te[7] = 0;
        te[8] = 0; te[9] = -s; te[10] = c; te[11] = 0;
        te[12] = 0; te[13] = 0; te[14] = 0; te[15] = 1;
       
        return this.multiply(rotationMatrix);
    }

    rotateYW(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = 1; te[1] = 0; te[2] = 0; te[3] = 0;
        te[4] = 0; te[5] = c; te[6] = 0; te[7] = s;
        te[8] = 0; te[9] = 0; te[10] = 1; te[11] = 0;
        te[12] = 0; te[13] = -s; te[14] = 0; te[15] = c;
       
        return this.multiply(rotationMatrix);
    }

    rotateZW(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const rotationMatrix = new Matrix4D();
        const te = rotationMatrix.elements;
       
        te[0] = 1; te[1] = 0; te[2] = 0; te[3] = 0;
        te[4] = 0; te[5] = 1; te[6] = 0; te[7] = 0;
        te[8] = 0; te[9] = 0; te[10] = c; te[11] = s;
        te[12] = 0; te[13] = 0; te[14] = -s; te[15] = c;
       
        return this.multiply(rotationMatrix);
    }

    transformVector(v) {
        const te = this.elements;
        const x = v.x, y = v.y, z = v.z, w = v.w;
       
        return new Vector4D(
            te[0] * x + te[1] * y + te[2] * z + te[3] * w,
            te[4] * x + te[5] * y + te[6] * z + te[7] * w,
            te[8] * x + te[9] * y + te[10] * z + te[11] * w,
            te[12] * x + te[13] * y + te[14] * z + te[15] * w
        );
    }
}

class Tesseract {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = this.generateFaces();
    }

    generateVertices() {
        const vertices = [];
        const s = this.size / 2;
       
        // Generate all 16 vertices of a tesseract
        for (let i = 0; i < 16; i++) {
            const x = (i & 1) ? s : -s;
            const y = (i & 2) ? s : -s;
            const z = (i & 4) ? s : -s;
            const w = (i & 8) ? s : -s;
            vertices.push(new Vector4D(x, y, z, w));
        }
       
        return vertices;
    }

    generateEdges() {
        const edges = [];
       
        // Connect vertices that differ by exactly one bit
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                const diff = i ^ j;
                if (diff && (diff & (diff - 1)) === 0) { // Power of 2
                    edges.push([i, j]);
                }
            }
        }
       
        return edges;
    }

    generateFaces() {
        const faces = [];
       
        // Generate 8 cubic faces
        const cubeFaces = [
            [0, 1, 3, 2, 6, 7, 5, 4], // Front face
            [8, 9, 11, 10, 14, 15, 13, 12], // Back face
            [0, 1, 9, 8, 12, 13, 5, 4], // Left face
            [2, 3, 11, 10, 14, 15, 7, 6], // Right face
            [0, 2, 10, 8, 12, 14, 6, 4], // Bottom face
            [1, 3, 11, 9, 13, 15, 7, 5]  // Top face
        ];
       
        return cubeFaces;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }

    getFaces() {
        return this.faces;
    }
}

class Hypersphere4D {
    constructor(radius = 1, resolution = 32) {
        this.radius = radius;
        this.resolution = resolution;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
    }

    generateVertices() {
        const vertices = [];
        const phiStep = Math.PI / this.resolution;
        const thetaStep = (2 * Math.PI) / this.resolution;
       
        for (let i = 0; i <= this.resolution; i++) {
            const phi = i * phiStep;
            for (let j = 0; j <= this.resolution; j++) {
                const theta = j * thetaStep;
               
                const x = this.radius * Math.sin(phi) * Math.cos(theta);
                const y = this.radius * Math.sin(phi) * Math.sin(theta);
                const z = this.radius * Math.cos(phi) * Math.cos(theta);
                const w = this.radius * Math.cos(phi) * Math.sin(theta);
               
                vertices.push(new Vector4D(x, y, z, w));
            }
        }
       
        return vertices;
    }

    generateEdges() {
        const edges = [];
        const rows = this.resolution + 1;
       
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < this.resolution; j++) {
                const current = i * rows + j;
                const next = i * rows + (j + 1) % rows;
                const below = (i + 1) * rows + j;
                const belowNext = (i + 1) * rows + (j + 1) % rows;
               
                edges.push([current, next]);
                edges.push([current, below]);
                edges.push([current, belowNext]);
            }
        }
       
        return edges;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }
}

class Hyperplane4D {
    constructor(size = 4, resolution = 20) {
        this.size = size;
        this.resolution = resolution;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
    }

    generateVertices() {
        const vertices = [];
        const step = this.size / this.resolution;
       
        for (let i = 0; i <= this.resolution; i++) {
            for (let j = 0; j <= this.resolution; j++) {
                const x = (i - this.resolution / 2) * step;
                const y = (j - this.resolution / 2) * step;
                const z = 0;
                const w = 0;
               
                vertices.push(new Vector4D(x, y, z, w));
            }
        }
       
        return vertices;
    }

    generateEdges() {
        const edges = [];
        const rows = this.resolution + 1;
       
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < this.resolution; j++) {
                const current = i * rows + j;
                const right = i * rows + j + 1;
                const below = (i + 1) * rows + j;
               
                edges.push([current, right]);
                edges.push([current, below]);
            }
        }
       
        return edges;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }
}

class KleinBottle4D {
    constructor(radius = 1, resolution = 32) {
        this.radius = radius;
        this.resolution = resolution;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
    }

    generateVertices() {
        const vertices = [];
        const uStep = (2 * Math.PI) / this.resolution;
        const vStep = (2 * Math.PI) / this.resolution;
       
        for (let i = 0; i <= this.resolution; i++) {
            const u = i * uStep;
            for (let j = 0; j <= this.resolution; j++) {
                const v = j * vStep;
               
                // Klein bottle parametric equations in 4D
                const x = (2 + Math.cos(v)) * Math.cos(u);
                const y = (2 + Math.cos(v)) * Math.sin(u);
                const z = Math.sin(v) * Math.cos(u / 2);
                const w = Math.sin(v) * Math.sin(u / 2);
               
                vertices.push(new Vector4D(x, y, z, w));
            }
        }
       
        return vertices;
    }

    generateEdges() {
        const edges = [];
        const rows = this.resolution + 1;
       
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < this.resolution; j++) {
                const current = i * rows + j;
                const next = i * rows + (j + 1) % rows;
                const below = (i + 1) * rows + j;
               
                edges.push([current, next]);
                edges.push([current, below]);
            }
        }
       
        return edges;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }
}
class Pentachoron {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = this.generateFaces();
    }

    // 5 vârfuri ale unui 4-simplex regulat centrat în origine
    generateVertices() {
        const s = this.size / Math.sqrt(10); // scale for similar size to tesseract
        return [
            new Vector4D(1, 1, 1, -1).multiplyScalar(s),
            new Vector4D(1, -1, -1, -1).multiplyScalar(s),
            new Vector4D(-1, 1, -1, -1).multiplyScalar(s),
            new Vector4D(-1, -1, 1, -1).multiplyScalar(s),
            new Vector4D(0, 0, 0, 2).multiplyScalar(s)
        ];
    }

    // 10 muchii: fiecare pereche de vârfuri
    generateEdges() {
        const edges = [];
        for (let i = 0; i < 5; i++) {
            for (let j = i + 1; j < 5; j++) {
                edges.push([i, j]);
            }
        }
        return edges;
    }

    // 10 fețe triunghiulare: fiecare triplet de vârfuri
    generateFaces() {
        const faces = [];
        for (let i = 0; i < 5; i++) {
            for (let j = i + 1; j < 5; j++) {
                for (let k = j + 1; k < 5; k++) {
                    faces.push([i, j, k]);
                }
            }
        }
        return faces;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }

    getFaces() {
        return this.faces;
    }
}
class Hexadecachoron {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = this.generateFaces();
    }

    // 8 perechi de vârfuri opuse pe axele 4D
    generateVertices() {
        const s = this.size / Math.sqrt(2);
        return [
            new Vector4D( s, 0, 0, 0),
            new Vector4D(-s, 0, 0, 0),
            new Vector4D(0,  s, 0, 0),
            new Vector4D(0, -s, 0, 0),
            new Vector4D(0, 0,  s, 0),
            new Vector4D(0, 0, -s, 0),
            new Vector4D(0, 0, 0,  s),
            new Vector4D(0, 0, 0, -s)
        ];
    }

    // Fiecare vârf e conectat la toate celelalte, cu excepția celui opus
    generateEdges() {
        const edges = [];
        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 8; j++) {
                // Nu conecta vârfurile opuse (i și i^1)
                if (
                    (i === 0 && j === 1) ||
                    (i === 2 && j === 3) ||
                    (i === 4 && j === 5) ||
                    (i === 6 && j === 7)
                ) continue;
                edges.push([i, j]);
            }
        }
        return edges;
    }

    // Fiecare față este un triunghi format din 3 vârfuri conectate
    generateFaces() {
        // Pentru simplitate, nu generăm aici toate fețele, doar muchiile și vârfurile sunt suficiente pentru vizualizare wireframe.
        return [];
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class Buckyball4D {
    constructor(radius = 1) {
        this.radius = radius;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        // Fețele nu sunt implementate complet, doar pentru wireframe
        this.faces = [];
    }

    // Distribuie 60 de puncte pe o sferă 4D folosind metoda Fibonacci
    generateVertices() {
        const N = 60;
        const verts = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < N; i++) {
            const w = 2 * (i / (N - 1)) - 1; // from -1 to 1
            const r = Math.sqrt(1 - w * w);
            const theta = phi * i;
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
            const z = Math.cos(theta * 1.618) * r; // extra twist for 4D
            verts.push(new Vector4D(
                this.radius * x,
                this.radius * y,
                this.radius * z,
                this.radius * w
            ));
        }
        return verts;
    }

    // Conectează fiecare vârf la cei mai apropiați 3-4 vecini (aproximează structura C60)
    generateEdges() {
        const edges = [];
        const verts = this.vertices;
        for (let i = 0; i < verts.length; i++) {
            // Găsește cei mai apropiați 3 vecini
            const dists = [];
            for (let j = 0; j < verts.length; j++) {
                if (i === j) continue;
                const dx = verts[i].x - verts[j].x;
                const dy = verts[i].y - verts[j].y;
                const dz = verts[i].z - verts[j].z;
                const dw = verts[i].w - verts[j].w;
                const dist = dx*dx + dy*dy + dz*dz + dw*dw;
                dists.push({j, dist});
            }
            dists.sort((a, b) => a.dist - b.dist);
            for (let k = 0; k < 3; k++) {
                const idx = dists[k].j;
                // Adaugă muchia doar o dată
                if (i < idx) edges.push([i, idx]);
            }
        }
        return edges;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class Hypertorus4D {
    constructor(R = 1.2, r = 0.5, res1 = 24, res2 = 24) {
        this.R = R; // raza mare
        this.r = r; // raza mică
        this.res1 = res1; // rezoluție pe primul cerc
        this.res2 = res2; // rezoluție pe al doilea cerc
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = [];
    }

    // Parametrizare: θ, φ ∈ [0, 2π)
    generateVertices() {
        const verts = [];
        for (let i = 0; i < this.res1; i++) {
            const theta = (2 * Math.PI * i) / this.res1;
            for (let j = 0; j < this.res2; j++) {
                const phi = (2 * Math.PI * j) / this.res2;
                // 4D torus: două cercuri independente
                const x = (this.R + this.r * Math.cos(theta)) * Math.cos(phi);
                const y = (this.R + this.r * Math.cos(theta)) * Math.sin(phi);
                const z = this.r * Math.sin(theta) * Math.cos(phi);
                const w = this.r * Math.sin(theta) * Math.sin(phi);
                verts.push(new Vector4D(x, y, z, w));
            }
        }
        return verts;
    }

    // Conectează fiecare punct la vecinii săi pe grilă
    generateEdges() {
        const edges = [];
        for (let i = 0; i < this.res1; i++) {
            for (let j = 0; j < this.res2; j++) {
                const idx = i * this.res2 + j;
                // Vecin pe θ
                const nextI = ((i + 1) % this.res1) * this.res2 + j;
                edges.push([idx, nextI]);
                // Vecin pe φ
                const nextJ = i * this.res2 + ((j + 1) % this.res2);
                edges.push([idx, nextJ]);
            }
        }
        return edges;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class Icositetrachoron {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = [];
    }

    // 24 de vârfuri: toate permutările (±1, ±1, 0, 0)
    generateVertices() {
        const verts = [];
        const s = this.size / Math.sqrt(2);
        const signs = [1, -1];
        for (let i = 0; i < 4; i++) {
            for (let j = i + 1; j < 4; j++) {
                for (const si of signs) {
                    for (const sj of signs) {
                        const v = [0, 0, 0, 0];
                        v[i] = si * s;
                        v[j] = sj * s;
                        verts.push(new Vector4D(v[0], v[1], v[2], v[3]));
                    }
                }
            }
        }
        return verts;
    }

    // Două vârfuri sunt conectate dacă diferă la exact două poziții (cu semne opuse)
    generateEdges() {
        const edges = [];
        const verts = this.vertices;
        for (let i = 0; i < verts.length; i++) {
            for (let j = i + 1; j < verts.length; j++) {
                let diff = 0;
                for (let k = 0; k < 4; k++) {
                    if (verts[i][['x','y','z','w'][k]] !== verts[j][['x','y','z','w'][k]]) diff++;
                }
                if (diff === 2) edges.push([i, j]);
            }
        }
        return edges;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class Hyperdodecahedron120Cell {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = [];
    }

    // Aproximare: distribuim 600 de puncte pe o sferă 4D
    generateVertices() {
        const N = 600;
        const verts = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const w = 2 * (i / (N - 1)) - 1;
            const r = Math.sqrt(1 - w * w);
            const theta = phi * i;
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
            const z = Math.cos(theta * 1.618) * r;
            verts.push(new Vector4D(
                this.size * x,
                this.size * y,
                this.size * z,
                this.size * w
            ));
        }
        return verts;
    }

    // Fiecare vârf conectat la cei mai apropiați 3 vecini (aproximare pentru wireframe)
    generateEdges() {
        const edges = [];
        const verts = this.vertices;
        for (let i = 0; i < verts.length; i++) {
            const dists = [];
            for (let j = 0; j < verts.length; j++) {
                if (i === j) continue;
                const dx = verts[i].x - verts[j].x;
                const dy = verts[i].y - verts[j].y;
                const dz = verts[i].z - verts[j].z;
                const dw = verts[i].w - verts[j].w;
                const dist = dx*dx + dy*dy + dz*dz + dw*dw;
                dists.push({j, dist});
            }
            dists.sort((a, b) => a.dist - b.dist);
            for (let k = 0; k < 3; k++) {
                const idx = dists[k].j;
                if (i < idx) edges.push([i, idx]);
            }
        }
        return edges;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class Hexacosichoron600Cell {
    constructor(size = 2) {
        this.size = size;
        this.vertices = this.generateVertices();
        this.edges = this.generateEdges();
        this.faces = [];
    }

    // 120 de vârfuri pe sfera 4D (aproximare cu distribuție Fibonacci)
    generateVertices() {
        const N = 120;
        const verts = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const w = 2 * (i / (N - 1)) - 1;
            const r = Math.sqrt(1 - w * w);
            const theta = phi * i;
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
            const z = Math.cos(theta * 1.618) * r;
            verts.push(new Vector4D(
                this.size * x,
                this.size * y,
                this.size * z,
                this.size * w
            ));
        }
        return verts;
    }

    // Fiecare vârf conectat la cei mai apropiați 3 vecini (aproximare pentru wireframe)
    generateEdges() {
        const edges = [];
        const verts = this.vertices;
        for (let i = 0; i < verts.length; i++) {
            const dists = [];
            for (let j = 0; j < verts.length; j++) {
                if (i === j) continue;
                const dx = verts[i].x - verts[j].x;
                const dy = verts[i].y - verts[j].y;
                const dz = verts[i].z - verts[j].z;
                const dw = verts[i].w - verts[j].w;
                const dist = dx*dx + dy*dy + dz*dz + dw*dw;
                dists.push({j, dist});
            }
            dists.sort((a, b) => a.dist - b.dist);
            for (let k = 0; k < 3; k++) {
                const idx = dists[k].j;
                if (i < idx) edges.push([i, idx]);
            }
        }
        return edges;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}
class E8Lattice4D {
    constructor(size = 1, range = 2) {
        this.size = size;
        this.range = range; // cât de departe mergem cu generarea punctelor
        this.vertices = this.generateVertices();
        this.edges = [];
        this.faces = [];
    }

    // Generează puncte E8 și le proiectează în 4D (primele 4 coordonate)
    generateVertices() {
        const verts = [];
        // E8 = { (z1,...,z8) ∈ Z^8 ∪ (Z+1/2)^8 | suma z_i pară }
        for (let a = -this.range; a <= this.range; a++)
        for (let b = -this.range; b <= this.range; b++)
        for (let c = -this.range; c <= this.range; c++)
        for (let d = -this.range; d <= this.range; d++)
        for (let e = -this.range; e <= this.range; e++)
        for (let f = -this.range; f <= this.range; f++)
        for (let g = -this.range; g <= this.range; g++)
        for (let h = -this.range; h <= this.range; h++) {
            // Z^8
            let sum = a + b + c + d + e + f + g + h;
            if (sum % 2 === 0) {
                verts.push(new Vector4D(
                    this.size * a,
                    this.size * b,
                    this.size * c,
                    this.size * d
                ));
            }
            // (Z+1/2)^8
            sum = a + b + c + d + e + f + g + h + 4;
            if (sum % 2 === 0) {
                verts.push(new Vector4D(
                    this.size * (a + 0.5),
                    this.size * (b + 0.5),
                    this.size * (c + 0.5),
                    this.size * (d + 0.5)
                ));
            }
        }
        return verts;
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
}