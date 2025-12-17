# Bzier-Curve-with-Physics-Sensor-Control

## 📌 Project Overview

This project implements an **interactive cubic Bézier curve** that behaves like a **springy rope**. The curve dynamically responds to **real-time user input (mouse movement)** and visualizes both the curve and its **tangent vectors**.

All mathematical computations, physics simulation, and rendering logic are implemented **from scratch**, without using any prebuilt Bézier, animation, or physics libraries.

---

## 🎯 Objective

* Implement a **cubic Bézier curve** manually
* Apply **spring–damping physics** to simulate rope-like motion
* Visualize **tangents** along the curve
* Ensure **real-time interaction** at ~60 FPS

---

## 🧮 Bézier Curve Mathematics

The cubic Bézier curve is defined using four control points:

* **P₀, P₃** → Fixed endpoints
* **P₁, P₂** → Dynamic control points

### Curve Equation

```
B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃
```

The curve is sampled at small intervals of `t` and rendered on an HTML Canvas.

---

## 📐 Tangent Computation

Tangents are calculated using the derivative of the cubic Bézier equation:

```
B'(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)
```

* Tangent vectors are normalized
* Short line segments are drawn at intervals along the curve

---

## ⚙️ Physics Model (Spring–Damping)

Dynamic control points follow a **spring physics model** for smooth, natural motion:

```
acceleration = -k * (position − target) − damping * velocity
```

This results in:

* Elastic movement
* Natural oscillation
* Smooth stabilization

---

## 🖱️ Interaction

* Mouse movement controls the **target positions** of the dynamic control points
* The curve responds in real time, behaving like a flexible rope

---

## 🖼️ Rendering Details

The visualization includes:

* Cubic Bézier curve path
* Fixed and dynamic control points (as circles)
* Tangent vectors along the curve

Rendering is handled using **HTML5 Canvas** and `requestAnimationFrame` for smooth animation.

---

## 📁 Project Structure

```
interactive-bezier-rope/
│
├── index.html   # Canvas setup and entry point
├── rope.js      # Math, physics, input handling, rendering
└── README.md    # Project documentation
```

---

## 🚫 Constraints Followed

* ❌ No external libraries (D3.js, UIBezierPath, etc.)
* ❌ No prebuilt physics or animation engines
* ✅ All math and physics implemented manually
* ✅ Clean separation of logic (math, physics, rendering, input)

---

## 🚀 How to Run

1. Download or clone the project
2. Open `index.html` in any modern web browser
3. Move the mouse to interact with the Bézier rope

No additional setup is required.

---

## 🎓 Academic Declaration

This project is an **original implementation** created for educational purposes. All algorithms are based on standard mathematical formulations and were implemented manually without copying from external sources.

---

## 🏁 Conclusion

This project demonstrates:

* Strong understanding of **mathematical modeling**
* Practical use of **physics-based animation**
* Real-time **interactive graphics programming**

It fulfills all requirements of the assignment and is suitable for academic submission or portfolio presentation.
