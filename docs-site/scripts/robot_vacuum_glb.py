#!/usr/bin/env python3
"""Makes robot-vacuum.glb: a simple round robot vacuum for the model of a tracker of floor3d-card
(tracker.model, see the Recipes page of the documentation).

- In metres, as glTF wants: 35 cm wide, about 10 cm high with the turret of the lidar.
- It faces +X: the dark bumper and the blue arrow on the lid are at the front, seen from above.
  +Y is up; the origin is the middle of its base.
- Without libraries: only the standard library of Python.

Use: python3 robot_vacuum_glb.py [output file]
By default it writes ../public/models/robot-vacuum.glb, next to this folder.
"""
import json
import math
import os
import struct
import sys

SEGMENTS = 48  # sides of the circles


class Part:
    """A part of the robot: triangles with their normals, of one material."""

    def __init__(self, name, material):
        self.name = name
        self.material = material
        self.positions = []
        self.normals = []
        self.indices = []

    def vertex(self, p, n):
        self.positions.append(p)
        self.normals.append(n)
        return len(self.positions) - 1

    # A triangle with the normal n at its three vertices (flat faces), counter-clockwise seen from
    # the side of the normal, as glTF wants.
    def triangle(self, a, b, c, n):
        self.triangle_smooth((a, n), (b, n), (c, n), n)

    # A triangle with a normal per vertex; face: the normal of the face, for its winding.
    def triangle_smooth(self, va, vb, vc, face):
        (a, _), (b, _), (c, _) = va, vb, vc
        ab = [b[i] - a[i] for i in range(3)]
        ac = [c[i] - a[i] for i in range(3)]
        cross = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]
        if sum(cross[i] * face[i] for i in range(3)) < 0:
            vb, vc = vc, vb
        for p, n in (va, vb, vc):
            self.indices.append(self.vertex(p, n))

    def quad_smooth(self, a, b, c, d, face):
        self.triangle_smooth(a, b, c, face)
        self.triangle_smooth(a, c, d, face)


def ring_point(r, angle, y, cx=0.0, cz=0.0):
    return (cx + r * math.cos(angle), y, cz + r * math.sin(angle))


def cylinder(part, radius, y0, y1, cx=0.0, cz=0.0, bottom=True, top=True, bevel=0.0):
    """An upright cylinder; bevel: its top edge rounded off by this much."""
    step = 2 * math.pi / SEGMENTS
    ytop_side = y1 - bevel
    for i in range(SEGMENTS):
        a0, a1 = i * step, (i + 1) * step
        n0 = (math.cos(a0), 0.0, math.sin(a0))
        n1 = (math.cos(a1), 0.0, math.sin(a1))
        mid = (a0 + a1) / 2
        face = (math.cos(mid), 0.0, math.sin(mid))
        part.quad_smooth(
            (ring_point(radius, a0, y0, cx, cz), n0),
            (ring_point(radius, a1, y0, cx, cz), n1),
            (ring_point(radius, a1, ytop_side, cx, cz), n1),
            (ring_point(radius, a0, ytop_side, cx, cz), n0),
            face,
        )
        inner = radius - bevel
        if bevel > 0:
            k = 1 / math.sqrt(2)
            b0 = (n0[0] * k, k, n0[2] * k)
            b1 = (n1[0] * k, k, n1[2] * k)
            part.quad_smooth(
                (ring_point(radius, a0, ytop_side, cx, cz), b0),
                (ring_point(radius, a1, ytop_side, cx, cz), b1),
                (ring_point(inner, a1, y1, cx, cz), b1),
                (ring_point(inner, a0, y1, cx, cz), b0),
                (face[0] * k, k, face[2] * k),
            )
        if top:
            part.triangle((cx, y1, cz), ring_point(inner, a0, y1, cx, cz), ring_point(inner, a1, y1, cx, cz), (0.0, 1.0, 0.0))
        if bottom:
            part.triangle((cx, y0, cz), ring_point(radius, a0, y0, cx, cz), ring_point(radius, a1, y0, cx, cz), (0.0, -1.0, 0.0))


def arc_band(part, r_in, r_out, y0, y1, a_from, a_to, steps=32):
    """An arc of a ring (the bumper): outer and inner walls, top, bottom and both ends."""
    step = (a_to - a_from) / steps
    for i in range(steps):
        a0, a1 = a_from + i * step, a_from + (i + 1) * step
        mid = (a0 + a1) / 2
        out0 = (math.cos(a0), 0.0, math.sin(a0))
        out1 = (math.cos(a1), 0.0, math.sin(a1))
        face = (math.cos(mid), 0.0, math.sin(mid))
        part.quad_smooth(
            (ring_point(r_out, a0, y0), out0),
            (ring_point(r_out, a1, y0), out1),
            (ring_point(r_out, a1, y1), out1),
            (ring_point(r_out, a0, y1), out0),
            face,
        )
        inward = lambda n: (-n[0], 0.0, -n[2])
        part.quad_smooth(
            (ring_point(r_in, a0, y0), inward(out0)),
            (ring_point(r_in, a1, y0), inward(out1)),
            (ring_point(r_in, a1, y1), inward(out1)),
            (ring_point(r_in, a0, y1), inward(out0)),
            inward(face),
        )
        for y, n in ((y1, (0.0, 1.0, 0.0)), (y0, (0.0, -1.0, 0.0))):
            a, b = ring_point(r_in, a0, y), ring_point(r_out, a0, y)
            c, d = ring_point(r_out, a1, y), ring_point(r_in, a1, y)
            part.triangle(a, b, c, n)
            part.triangle(a, c, d, n)
    for a, sign in ((a_from, -1), (a_to, 1)):
        n = (-math.sin(a) * sign, 0.0, math.cos(a) * sign)
        p = [ring_point(r_in, a, y0), ring_point(r_out, a, y0), ring_point(r_out, a, y1), ring_point(r_in, a, y1)]
        part.triangle(p[0], p[1], p[2], n)
        part.triangle(p[0], p[2], p[3], n)


def flat_polygon(part, points, y, up=True):
    """A flat convex polygon (the arrow), as a fan from its first point."""
    n = (0.0, 1.0, 0.0) if up else (0.0, -1.0, 0.0)
    for i in range(1, len(points) - 1):
        part.triangle((points[0][0], y, points[0][1]), (points[i][0], y, points[i][1]), (points[i + 1][0], y, points[i + 1][1]), n)


def build():
    R = 0.175  # radius: 35 cm wide
    body = Part('robot_body', 'body')
    cylinder(body, R - 0.004, 0.012, 0.085, bevel=0.012)  # the shell, raised on its wheels
    base = Part('robot_base', 'dark')
    cylinder(base, R - 0.02, 0.0, 0.012, top=False)  # the bottom with the wheels
    lid = Part('robot_lid', 'lid')
    cylinder(lid, 0.12, 0.085, 0.0875, bottom=False)  # the lid, darker
    lidar = Part('robot_lidar', 'dark')
    cylinder(lidar, 0.042, 0.0875, 0.103, cx=0.035, bevel=0.004)  # the turret of the lidar, towards the front
    lidar_cap = Part('robot_lidar_cap', 'lid')
    cylinder(lidar_cap, 0.03, 0.103, 0.1045, cx=0.035, bottom=False)
    bumper = Part('robot_bumper', 'bumper')
    arc_band(bumper, R - 0.006, R + 0.003, 0.018, 0.07, math.radians(-75), math.radians(75))  # the bumper at the front
    arrow = Part('robot_front', 'front')
    # The blue arrow on the lid, pointing to +X (in front of the turret).
    flat_polygon(arrow, [(0.15, 0.0), (0.105, 0.03), (0.105, -0.03)], 0.0885)
    button = Part('robot_button', 'front')
    cylinder(button, 0.008, 0.0875, 0.089, cx=-0.06, bottom=False)  # the button behind the turret
    return [base, body, bumper, lid, lidar, lidar_cap, arrow, button]


MATERIALS = {
    # name: (base colour, linear RGBA, metallic, roughness, emissive)
    'body': ([0.82, 0.82, 0.84, 1.0], 0.0, 0.45, [0.0, 0.0, 0.0]),
    'lid': ([0.12, 0.12, 0.13, 1.0], 0.1, 0.3, [0.0, 0.0, 0.0]),
    'dark': ([0.03, 0.03, 0.035, 1.0], 0.0, 0.6, [0.0, 0.0, 0.0]),
    'bumper': ([0.015, 0.015, 0.02, 1.0], 0.0, 0.7, [0.0, 0.0, 0.0]),
    'front': ([0.0, 0.55, 1.0, 1.0], 0.0, 0.4, [0.0, 0.35, 0.8]),
}


def write_glb(parts, out):
    names = list(MATERIALS)
    binary = bytearray()
    buffer_views, accessors, meshes, nodes = [], [], [], []

    def add_view(data, target):
        while len(binary) % 4:
            binary.append(0)
        buffer_views.append({'buffer': 0, 'byteOffset': len(binary), 'byteLength': len(data), 'target': target})
        binary.extend(data)
        return len(buffer_views) - 1

    for part in parts:
        flat = [c for p in part.positions for c in p]
        pos_view = add_view(struct.pack('<%df' % len(flat), *flat), 34962)
        mins = [min(p[i] for p in part.positions) for i in range(3)]
        maxs = [max(p[i] for p in part.positions) for i in range(3)]
        accessors.append({'bufferView': pos_view, 'componentType': 5126, 'count': len(part.positions),
                          'type': 'VEC3', 'min': mins, 'max': maxs})
        pos = len(accessors) - 1
        nflat = []
        for n in part.normals:
            length = math.sqrt(sum(c * c for c in n)) or 1.0
            nflat.extend(c / length for c in n)
        nor_view = add_view(struct.pack('<%df' % len(nflat), *nflat), 34962)
        accessors.append({'bufferView': nor_view, 'componentType': 5126, 'count': len(part.normals), 'type': 'VEC3'})
        nor = len(accessors) - 1
        big = len(part.positions) > 65535
        idx_view = add_view(struct.pack('<%d%s' % (len(part.indices), 'I' if big else 'H'), *part.indices), 34963)
        accessors.append({'bufferView': idx_view, 'componentType': 5125 if big else 5123,
                          'count': len(part.indices), 'type': 'SCALAR'})
        idx = len(accessors) - 1
        meshes.append({'name': part.name, 'primitives': [{'attributes': {'POSITION': pos, 'NORMAL': nor},
                                                          'indices': idx, 'material': names.index(part.material)}]})
        nodes.append({'name': part.name, 'mesh': len(meshes) - 1})
    while len(binary) % 4:
        binary.append(0)

    materials = []
    for name in names:
        color, metallic, roughness, emissive = MATERIALS[name]
        m = {'name': 'robot_' + name, 'pbrMetallicRoughness': {'baseColorFactor': color, 'metallicFactor': metallic,
                                                              'roughnessFactor': roughness}}
        if any(emissive):
            m['emissiveFactor'] = emissive
        materials.append(m)

    nodes.append({'name': 'robot_vacuum', 'children': list(range(len(parts)))})
    gltf = {
        'asset': {'version': '2.0', 'generator': 'robot_vacuum_glb.py'},
        'scene': 0,
        'scenes': [{'name': 'robot', 'nodes': [len(nodes) - 1]}],
        'nodes': nodes,
        'meshes': meshes,
        'materials': materials,
        'accessors': accessors,
        'bufferViews': buffer_views,
        'buffers': [{'byteLength': len(binary)}],
    }
    js = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
    js += b' ' * ((4 - len(js) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(binary)
    with open(out, 'wb') as f:
        f.write(struct.pack('<III', 0x46546C67, 2, total))
        f.write(struct.pack('<II', len(js), 0x4E4F534A))
        f.write(js)
        f.write(struct.pack('<II', len(binary), 0x004E4942))
        f.write(binary)
    return total


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', 'public', 'models', 'robot-vacuum.glb')
    size = write_glb(build(), out)
    print('written %s (%d bytes)' % (out, size))
