from PIL import Image, ImageDraw
import random

def create_camo_texture(filename, colors, size=(512, 512)):
    """Create a simple camouflage pattern"""
    img = Image.new('RGB', size, colors[0])
    draw = ImageDraw.Draw(img)
    
    # Generate random blobs for camo pattern
    for _ in range(50):
        color = random.choice(colors[1:])
        x = random.randint(0, size[0])
        y = random.randint(0, size[1])
        w = random.randint(30, 100)
        h = random.randint(30, 100)
        draw.ellipse([x, y, x+w, y+h], fill=color)
    
    img.save(filename)

# Gray camo (USAF)
create_camo_texture('gray-camo.jpg', [
    (100, 100, 105),
    (85, 85, 90),
    (115, 115, 120),
    (95, 95, 100)
])

# Desert camo (Australian)
create_camo_texture('desert-camo.jpg', [
    (194, 178, 128),
    (160, 130, 80),
    (210, 180, 140),
    (139, 119, 101)
])

# Woodland camo (NATO)
create_camo_texture('woodland-camo.jpg', [
    (85, 107, 47),
    (107, 142, 35),
    (75, 83, 32),
    (139, 119, 101)
])

# Black camo (Night ops)
create_camo_texture('black-camo.jpg', [
    (30, 30, 30),
    (20, 20, 20),
    (40, 40, 40),
    (25, 25, 25)
])

print("Textures created successfully")
