# OpenCV Panel Application Service - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Configuration Files](#configuration-files)
4. [Core Components](#core-components)
5. [The 7-Step Pipeline](#the-7-step-pipeline)
6. [Algorithm Explanations](#algorithm-explanations)
7. [Code Usage Examples](#code-usage-examples)

---

## Overview

### What Does This Service Do?

The **OpenCV Panel Applicator** simulates adding decorative wall panels to room images using computer vision. Imagine you're a furniture company showing customers how different panel textures would look on their walls, this service does exactly that.

**Key Capabilities:**
- Applies realistic panel textures to walls in photographs
- Handles perspective distortion (walls aren't always straight on camera)
- Creates seamless seams that look like real panel edges
- Preserves furniture/objects in front of panels
- Adapts lighting to match the room's environment

### Real-World Analogy

Think of it like digital wallpapering:
1. You have a wall in a photo (possibly at an angle)
2. You have a panel texture image
3. The system tiles that texture to fit the wall's dimensions
4. It warps the tiled texture to match the wall's perspective
5. It adds realistic lighting and seams
6. It composites everything back into the original photo

---

## System Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                  OpenCVPanelApplicator                      │
│                    (Main Service Class)                     │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   Configuration        Core Pipeline        Utility Methods
   • Load panels.ts     • Step 0-7            • Perspective
   • Load rooms.json    • Parallel exec       • Blending
   • Get wall dims      • Error handling      • Masking
   • Get blend mode     • Logging             • Lighting
```

### Component Responsibilities

| Component | Responsibility |
|-----------|-----------------|
| **Config Loaders** | Read panel definitions and room dimensions from files |
| **Panel Type Detection** | Identify wood grain vs. matte finishes from panel name |
| **Texture Tiling** | Repeat panel texture to match wall size with realistic seams |
| **Perspective Transform** | Warp flat texture to match wall's 3D angle (homography) |
| **Masking** | Preserve furniture/objects by masking them out |
| **Lighting** | Extract and apply room's lighting pattern to panels |
| **Compositing** | Blend final panel into original image |
| **Blending Modes** | Choose between alpha blend or soft light blending |

---

## Configuration Files

### panels-config.ts (Panel Definitions)

This TypeScript file defines all available panel types with human-readable names.

**File Location:** `zrk-room-visualizer/config/panels-config.ts`

**Example Format:**
```typescript
export const panelsConfig = {
  "2035": {
    displayName: "Leather 2035",
    category: "leather",
    // ... other properties
  },
  "8058": {
    displayName: "Swiss Matt 8058",
    category: "matte",
    // ... other properties
  },
  "5042": {
    displayName: "Walnut Wood Grain 5042",
    category: "wood",
    // ... other properties
  }
}
```

**How It's Used:**
- The applicator extracts the panel ID from the texture filename
- It looks up the ID in this config to get the `displayName`
- The `displayName` is analyzed to detect panel type (wood grain vs. matte)

### rooms.json (Room Dimensions)

This JSON file stores real-world dimensions for walls in different rooms.

**File Location:** `shared-assets/rooms.json`

**Example Format:**
```json
{
  "Kitchen_01": {
    "walls": {
      "wallA": {
        "dimensions": {
          "width": 20.0,
          "height": 8.0
        },
        "blendMode": "alphaBlend",
        "showLines": true
      },
      "wallB": {
        "dimensions": {
          "width": 16.0,
          "height": 8.0
        },
        "blendMode": "softLight",
        "showLines": true
      }
    }
  },
  "Bedroom_02": {
    "walls": {
      "wall": {
        "dimensions": {
          "width": 24.0,
          "height": 8.0
        },
        "blendMode": "alphaBlend",
        "showLines": false
      }
    }
  }
}
```

**Key Fields:**
- **width/height** (feet): Real-world dimensions used to calculate how many panels fit
- **blendMode**: How panels blend with background ("alphaBlend" = transparent overlay, "softLight" = preserve colors with edge lines)
- **showLines**: Whether to draw realistic seams between panels

---

## Core Components

### OpenCVPanelApplicator Class

The main service class that orchestrates the entire pipeline.

#### Key Constants

```python
DEFAULT_WALL_WIDTH_FT = 24.0      # Fallback wall width if config not found
DEFAULT_WALL_HEIGHT_FT = 8.0      # Fallback wall height
PANEL_HEIGHT_FT = 8.0             # Standard panel height (stays constant)
PANEL_WIDTH_FT = 4.0              # Standard panel width (4ft = one panel segment)
SMALL_WALL_THRESHOLD_PX = 1000    # Below this, use single panel (no tiling)
LIGHTING_KERNEL_SIZE = 31         # Gaussian blur size for lighting extraction
```

#### Constructor

```python
applicator = OpenCVPanelApplicator(verbose=True)
```

- **verbose=True**: Enables DEBUG level logging (detailed info about each step)
- **verbose=False**: Only INFO level logging (summary info)

#### Main Method: apply_panel_to_wall()

This is the primary entry point. It orchestrates all 7 steps of the pipeline.

```python
result = applicator.apply_panel_to_wall(
    room_image=room_img,
    panel_texture=panel_img,
    wall_coordinates=[(0,0), (1024,0), (1024,768), (0,768)],
    mask=wall_mask,
    panel_texture_path="panels/leather_2035.png",
    room_image_path="rooms/kitchen_01.jpg",
    mask_path="masks/Kitchen-wallA-mask.png",
    apply_lighting=True,
    blend_mode="alphaBlend"
)
```

---

## The 7-Step Pipeline

The panel application process follows a carefully designed 7-step pipeline. Each step builds on the previous one.

### Visual Pipeline Overview

```
Input: Room Image + Panel Texture + Wall Coordinates + Mask
   │
   ├─► STEP 0: Extract Lighting Pattern (parallel)
   │   └─► Captures room's light distribution
   │
   ├─► STEPS 1-2: Tile Texture & Adjust (parallel)
   │   ├─► Repeat texture to match wall size
   │   ├─► Add realistic seams
   │   └─► Apply brightness/contrast adjustments
   │
   ├─► STEP 3: Perspective Transform
   │   └─► Warp flat texture to match wall's 3D angle
   │
   ├─► STEP 4: Apply Mask
   │   └─► Preserve furniture/objects
   │
   ├─► STEP 5: Composite
   │   └─► Blend panels into original image
   │
   ├─► STEP 6: Apply Lighting Overlay
   │   └─► Add room's lighting to panels
   │
   └─► STEP 7: Apply Watermark
       └─► Add logo/branding
Output: Final Image
```

### Step 0: Extract Lighting Pattern

**Purpose:** Capture how light falls on the room so panels match the lighting.

**Algorithm:**
1. Convert room image from BGR to HSV color space
2. Extract the V (Value/Brightness) channel
3. Apply Gaussian blur with large kernel (31×31 pixels)
4. Normalize brightness values to 0-1 range
5. Create 3-channel lighting pattern (same value repeated for R, G, B)

**Why This Works:**
- The V channel represents brightness independently of color
- Blurring removes fine details, keeping only large lighting gradients
- This creates a "lighting map" showing where shadows and highlights are

**Code Location:** `extract_lighting_pattern()`

**Visual Example:**
```
Original Room          Extracted Lighting Pattern
[dark] bright [dark]   [0.3] 0.8 [0.3]
[dark] bright [dark]   [0.3] 0.8 [0.3]
                       (smooth gradient from 0.3 to 0.8)
```

### Steps 1-2: Tile Texture & Apply Lighting Adjustment (Parallel)

**Purpose:** Repeat the panel texture to fill the wall and adjust its brightness/contrast.

**Executed in Parallel:**
These steps run simultaneously with Step 0 because they're independent, saving time.

#### Step 1: Smart Tiling Algorithm

**Input:** Single panel texture image (e.g., 512×512 px)  
**Output:** Tiled texture matching wall dimensions (e.g., 2048×768 px)

**Key Concept - Real-World Scaling:**
```
4ft panel width × 24ft wall width = 6 panels needed
╔════════════╦════════════╦════════════╦════════════╦════════════╦════════════╗
║   Panel 1  ║   Panel 2  ║   Panel 3  ║   Panel 4  ║   Panel 5  ║   Panel 6  ║
╚════════════╩════════════╩════════════╩════════════╩════════════╩════════════╝
                          ↓ Seams at these positions
```

**Algorithm (for standard panels):**

1. **Calculate panel count:**
   ```
   num_panels = wall_width_ft / PANEL_WIDTH_FT (4.0)
   For 24ft wall: 24 / 4 = 6 panels
   ```

2. **Resize single panel to fit one segment:**
   ```
   panel_width_px = target_width / num_panels
   For 2048px wall: 2048 / 6 ≈ 341px per panel
   ```

3. **Tile horizontally:**
   ```
   FOR i = 1 TO num_panels:
     Paste resized panel at position i * panel_width_px
   ```

4. **Add edge blending (if overlap > 0):**
   ```
   Create gradient mask at panel boundaries
   Blend overlapping pixels for seamless transitions
   ```

5. **Add seam lines (if showLines = false //showLines = true would show the underlying lines on the wall/cabinet):**
   ```
   FOR each seam position:
     Draw realistic beveled edge using lighting algorithm
   ```

**Tiling Variants:**

**Standard Panels** (leather, matte):
- Simple horizontal tiling
- Maintains texture consistency

**Vertical Grain Panels** (wood):
- Preserve vertical grain direction
- Don't rotate/flip between tiles
- Ensures continuous wood grain appearance

**Small Walls** (< 1000 px²):
- Use single stretched panel instead of tiling
- Avoids too-small seams that look unrealistic

#### Step 2: Lighting Adjustment

**Purpose:** Adjust panel brightness, contrast, and saturation.

**Formula:**
```
adjusted = brightness × contrast × (original color) + offset
```

**Parameters (typical values):**
- **brightness:** 0.78 (slightly darker for leather)
- **contrast:** 1.28 (enhance color variation)
- **saturation:** 1.22 (boost color intensity)

**Algorithm:**
```python
# Contrast and brightness
adjusted = cv2.convertScaleAbs(image, alpha=contrast, 
                                beta=(brightness - 1.0) * 50)

# Saturation (if needed)
hsv = cv2.cvtColor(adjusted, cv2.COLOR_BGR2HSV)
hsv[:,:,1] *= saturation  # Scale S channel
adjusted = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
```

**Visual Impact:**
```
Original Panel: [120, 100, 110]  RGB values
After adjustment (B=0.78, C=1.28, S=1.22):
  Brighter, more contrasty, more saturated colors
Result: [145, 115, 135]  (darker overall, more vivid)
```

### Step 3: Perspective Transform (Homography)

**Purpose:** Warp the flat tiled panel to match the wall's 3D angle in the photograph.

**The Problem:**
```
Wall in photo is at an angle (not straight-on):
    Wall corners are: TL=(100, 50), TR=(900, 80), BR=(950, 450), BL=(120, 400)
    
    Our tiled panel is flat (0°, 0°, 0°, 0°):
    Panel corners: TL=(0,0), TR=(2048,0), BR=(2048,768), BL=(0,768)
    
    Need to WARP panel from flat → angled
```

**Solution: Full Homography (8-Degrees of Freedom)**

A homography is a 3×3 transformation matrix that can apply:
- Rotation
- Scaling
- Skewing/Shearing
- Perspective distortion

**Algorithm:**

1. **Define source points** (flat panel corners):
   ```
   src = [(0, 0), (width, 0), (width, height), (0, height)]
   ```

2. **Define destination points** (wall corners from user):
   ```
   dst = wall_coordinates  # Provided by user (4 points)
   ```

3. **Calculate homography matrix:**
   ```python
   M = cv2.getPerspectiveTransform(src, dst)
   # M is a 3×3 matrix that encodes the transformation
   ```

4. **Warp the image:**
   ```python
   warped = cv2.warpPerspective(panel, M, (room_width, room_height))
   # Apply transformation to every pixel
   ```

**Why This Matters:**

```
Before (flat):              After (warped):
┌─────────────────┐       ╱────────────────────╲
│                 │      ╱                      ╲
│   Panel         │      │  Panel (angled)       │
│   Texture       │      │  matching wall        │
│                 │      │  perspective          │
└─────────────────┘      ╲                      ╱
                          ╲────────────────────╱
```

**Mathematical Background:**
```
For each pixel in output image:
  1. Apply inverse of transformation matrix
  2. Look up value in input panel image
  3. Interpolate if coordinates are between pixels (LANCZOS4)
  
This ensures smooth, high-quality warping without artifacts.
```

### Step 4: Apply Mask

**Purpose:** Preserve furniture, people, and other objects in front of the wall.

**What is a Mask?**
A mask is a grayscale image where:
- **White (255)** = "Keep the panel"
- **Black (0)** = "Keep the original room image"

**Example:**
```
Original Room          Mask Image            Result After Masking
[wall][sofa][wall]  [white][black][white]  [panel][sofa][panel]
                     (sofa preserved)
```

**Algorithm:**

1. **Resize mask to match transformed panel:**
   ```python
   if mask.shape != transformed_panel.shape:
       mask = cv2.resize(mask, (width, height))
   ```

2. **Expand mask (optional):**
   ```
   If mask_expansion > 0:
     Use morphological dilation to grow white regions
     This "pushes" the mask outward by N pixels
     Useful to expand panel coverage slightly
   ```

3. **Feather mask edges (optional):**
   ```
   If feather_radius > 0:
     Apply Gaussian blur to mask
     Creates soft transition zone instead of hard edge
     Result: smoother blending at furniture boundaries
   ```

4. **Apply to alpha channel:**
   ```python
   masked_panel[:,:,3] = cv2.bitwise_and(panel_alpha, mask)
   # Multiply alpha channel by mask
   # Where mask=0, alpha becomes 0 (transparent)
   ```

**Visual Masking Example:**

```
Panel (RGBA):         Mask:              Result:
[Panel][Panel]    +   [white][black]  =  [Panel][transparent]
[Panel][Panel]        [white][black]     [Panel][transparent]
                      (right side hidden)
```

### Step 5: Composite (Blend Into Original Image)

**Purpose:** Merge the masked panel into the original room image.

**Two Blending Methods:**

#### Method 1: Alpha Blend (Default)

**Formula:**
```
output = panel × alpha + room × (1 - alpha)
```

**Visual:**
```
If alpha=1.0:  output = panel (100% panel, 0% room)
If alpha=0.5:  output = 50% panel + 50% room (semi-transparent)
If alpha=0.0:  output = room (0% panel, 100% room)
```

**Use Case:** Clean, transparent appearance for modern panels.

#### Method 2: Soft Light Blend

**Purpose:** Preserve original room colors while adding panel definition.

**Algorithm:**
```python
# Normal alpha blend first
result = base × (1 - alpha) + panel × alpha

# Extract edges from room image
edges = cv2.Canny(room_image, ...)  # Find sharp boundaries

# Darken where cabinet lines exist
result -= edges × line_strength  # Typical: 0.5

# Clip to valid range
result = clip(result, 0, 1)
```

**Visual Impact:**
```
Alpha Blend:      Soft Light:
New colors        Original colors preserved
Transparent look  + subtle cabinet lines
                  More natural integration
```

**When to Use Each:**
- **alphaBlend:** Modern, sleek panels; clear color changes
- **softLight:** Cabinet/storage; blend with existing finishes; natural look

### Step 6: Apply Lighting Overlay

**Purpose:** Apply the room's lighting pattern (from Step 0) to the panels.

**The Idea:**
```
Room has shadows on left, highlights on right
    ↓
Apply this lighting to panels
    ↓
Panels now look like they're in the same light as room
```

**Algorithm:**

1. **Extract lighting pattern** (from Step 0):
   ```
   lighting = [0.3, 0.3, 0.3, 0.5, 0.8, 0.8]  # Left to right
   (Values: 0=dark, 1=bright)
   ```

2. **Apply contrast boost** (optional):
   ```python
   lighting_boosted = (lighting - 0.5) × contrast_boost + 0.5
   # Typical: contrast_boost = 1.5 to 2.0
   # Effect: More shadow/highlight difference
   ```

3. **Calculate adaptive strength:**
   ```
   IF panel_brightness > 0.7 (light):
       strength = 0.4  # Reduce effect on bright panels
   ELSE IF panel_brightness > 0.4 (medium):
       strength = interpolate(0.4 to 1.0)  # Gradual
   ELSE (dark):
       strength = 1.0  # Full effect on dark panels
   ```

4. **Blend lighting:**
   ```python
   lighting_effect = panel × lighting
   result = panel × (1 - strength) + lighting_effect × strength
   ```

**Visual Example:**

```
Panel (uniform):    Lighting:       Result:
[white][white]  +   [dark][bright]  =  [gray][white]
[white][white]      [dark][bright]     [gray][white]
                    (left darkened, right brightened)
```

### Step 7: Apply Watermark

**Purpose:** Add branding/logo to the image.

**Features:**
- Logo with transparency support (PNG with alpha channel)
- Optional text above logo
- Configurable position and opacity
- Automatic scaling

**Positions:**
```
"top-left"      "top-right"
    ┌─────────────────┐
    │W               W│
    │                 │
    │                 │
    │W               W│
"bottom-left"   "bottom-right"
```

**Algorithm:**

1. **Load watermark image** (PNG with alpha):
   ```python
   watermark = cv2.imread(watermark_path, cv2.IMREAD_UNCHANGED)
   # Shape: (height, width, 4)  # RGBA
   ```

2. **Resize to target scale:**
   ```
   target_width = image_width × scale (e.g., 0.15 = 15%)
   aspect_ratio = logo_height / logo_width
   target_height = target_width × aspect_ratio
   ```

3. **Render optional text:**
   ```python
   cv2.putText(result, text, position, font, scale, color)
   ```

4. **Blend alpha-composited logo:**
   ```python
   output_pixel = logo × logo_alpha + background × (1 - logo_alpha)
   ```

---

## Algorithm Explanations

### Seam Generation Algorithm

**Problem:** When tiling panels, visible grid lines appear where panels meet. We need realistic beveled seams.

**Solution:** Hybrid Lighting Approach

```
Seam profile (cross-section):

          Highlight (bright)
           ╱╲
          ╱  ╲
     Edge╱    ╲
    ____╱______╲____
        Shadow (dark)

Each seam has: center dark → side transition → outer highlight
```

**Parameters:**
```python
shadow_mul = 0.65        # Darken shadow (multiply)
shadow_sub = 16          # Add darkness (subtract)
highlight_mul = 1.22     # Brighten highlight (multiply)
highlight_add = 18       # Add brightness
edge_transition = 0.85   # Transition zone brightness
```

**Algorithm:**

1. **Create 1D seam profile:**
   ```
   For each pixel x from -half to +half:
       dist_norm = |x| / half  (0 to 1)
       
       IF dist_norm <= 0.15:           # Center (shadow)
           mul = shadow_mul
           add = -shadow_sub
       ELSE IF dist_norm <= 0.55:      # Mid (transition)
           interpolate between shadow and edge
       ELSE:                             # Outer (highlight)
           mul = highlight_mul
           add = highlight_add
   ```

2. **Apply profile to seam:**
   ```
   FOR each seam position:
       FOR each pixel in seam_width:
           pixel *= mul[offset] + add[offset]
   ```

3. **Blur to soften:**
   ```
   Apply Gaussian blur with blur_amount
   Creates smooth, natural-looking bevel
   ```

### Color Preservation in Soft Light Blend

**Challenge:** When adding panels over cabinets/furniture, preserve original colors while adding visual definition.

**Two-Stage Approach:**

1. **Alpha Blend Phase:**
   ```
   Blend panel color with original color
   Preserves color from both layers
   ```

2. **Edge Enhancement Phase:**
   ```
   Extract edges (sharp color/brightness changes)
   Darken where edges exist (adds definition)
   Creates cabinet line appearance without changing colors
   ```

**Example:**

```
Cabinet (blue):    Edge Map:     Result:
████████████       ░░░░░░░░░░░░  ████████████
████████████   +   ░░░░░░░░░░░░  ████████████  (blue preserved)
████████████       ░░░░░░░░░░░░  ████████████
                   (edges darker)
```

### Adaptive Lighting Strength

**Challenge:** Dark panels need strong lighting overlay to look realistic. Bright panels need less.

**Solution:**
```python
panel_avg_brightness = average(panel_color)

IF brightness > 0.7:           # Bright panel
    strength = 0.4             # Reduce effect
ELSE IF brightness > 0.4:      # Medium
    strength = interpolate     # 0.4 to 1.0
ELSE:                           # Dark panel
    strength = 1.0             # Full effect
```

**Why:**
- **Bright panels** (e.g., white leather): Room's shadows wash them out if we apply full lighting. Reduce effect.
- **Dark panels** (e.g., black matte): Need strong lighting to show detail and prevent them from disappearing into shadow.

---
