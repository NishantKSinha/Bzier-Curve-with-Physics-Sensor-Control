/* ==========================================
   Canvas Initialization
========================================== */
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

function adjustCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", adjustCanvas);
adjustCanvas();

/* ==========================================
   Basic Vector Math (Manual)
========================================== */
function makeVec(x, y) {
  return { x, y };
}

function vecAdd(a, b) {
  return makeVec(a.x + b.x, a.y + b.y);
}

function vecSub(a, b) {
  return makeVec(a.x - b.x, a.y - b.y);
}

function vecLen(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function vecNorm(v) {
  const l = vecLen(v) || 1;
  return makeVec(v.x / l, v.y / l);
}

/* ==========================================
   Fixed Endpoints
========================================== */
const startPoint = makeVec(140, canvas.height / 2);
const endPoint = makeVec(canvas.width - 140, canvas.height / 2);

/* ==========================================
   Dynamic Control Points (Spring-Based)
========================================== */
const controlA = {
  pos: makeVec(canvas.width / 2 - 120, canvas.height / 2 - 120),
  vel: makeVec(0, 0),
  target: makeVec(0, 0)
};

const controlB = {
  pos: makeVec(canvas.width / 2 + 120, canvas.height / 2 + 120),
  vel: makeVec(0, 0),
  target: makeVec(0, 0)
};

/* ==========================================
   Input Handling (Mouse)
========================================== */
const cursor = makeVec(canvas.width / 2, canvas.height / 2);

canvas.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

/* ==========================================
   Spring Physics Logic
========================================== */
const springK = 0.075;
const friction = 0.82;

function applySpring(node) {
  const pull = vecSub(node.target, node.pos);

  node.vel.x += pull.x * springK;
  node.vel.y += pull.y * springK;

  node.vel.x *= friction;
  node.vel.y *= friction;

  node.pos.x += node.vel.x;
  node.pos.y += node.vel.y;
}

/* ==========================================
   Cubic Bézier Equation (Manual)
========================================== */
function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;

  return makeVec(
    uu * u * p0.x +
      3 * uu * t * p1.x +
      3 * u * tt * p2.x +
      tt * t * p3.x,

    uu * u * p0.y +
      3 * uu * t * p1.y +
      3 * u * tt * p2.y +
      tt * t * p3.y
  );
}

/* ==========================================
   Bézier Tangent (Derivative)
========================================== */
function bezierSlope(t, p0, p1, p2, p3) {
  const u = 1 - t;

  return vecNorm(makeVec(
    3 * u * u * (p1.x - p0.x) +
      6 * u * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),

    3 * u * u * (p1.y - p0.y) +
      6 * u * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y)
  ));
}

/* ==========================================
   Rendering Helpers
========================================== */
function renderDot(p, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
  ctx.fill();
}

/* ==========================================
   Main Render Loop
========================================== */
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Assign targets relative to cursor
  controlA.target = vecAdd(cursor, makeVec(-90, -90));
  controlB.target = vecAdd(cursor, makeVec(90, 90));

  applySpring(controlA);
  applySpring(controlB);

  /* ---- Draw Curve ---- */
  ctx.strokeStyle = "#00ffd5";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let t = 0; t <= 1.001; t += 0.012) {
    const p = cubicBezier(
      t,
      startPoint,
      controlA.pos,
      controlB.pos,
      endPoint
    );
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  /* ---- Draw Tangents ---- */
  ctx.strokeStyle = "#ffee58";
  ctx.lineWidth = 1;

  for (let t = 0; t <= 1; t += 0.15) {
    const p = cubicBezier(
      t,
      startPoint,
      controlA.pos,
      controlB.pos,
      endPoint
    );
    const dir = bezierSlope(
      t,
      startPoint,
      controlA.pos,
      controlB.pos,
      endPoint
    );

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + dir.x * 28, p.y + dir.y * 28);
    ctx.stroke();
  }

  /* ---- Control Points ---- */
  renderDot(startPoint, "#ff5252");
  renderDot(endPoint, "#ff5252");
  renderDot(controlA.pos, "#ffffff");
  renderDot(controlB.pos, "#ffffff");

  requestAnimationFrame(render);
}

render();
