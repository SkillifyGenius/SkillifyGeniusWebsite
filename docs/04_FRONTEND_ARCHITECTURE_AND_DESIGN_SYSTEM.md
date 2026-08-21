# 04 - Frontend Architecture, Component System & Design Tokens

---

## 1. Design System Tokens (Apple + Linear + Notion Aesthetic)

The platform strictly uses a **single unified light theme**:

```ini
# Core Palette
Primary Blue:       #2563EB  (Brand Action & Focus)
Deep Primary:       #1E40AF  (Button Hover State)
AI Accent:          #6366F1  (GeniusAI Socratic Mentor)
Growth Success:     #10B981  (Verified Capstones & Badges)

# Canvas & Surfaces
Main Background:    #F8FAFC  (Slate 50)
Surface (Card):     #FFFFFF  (Pure White)
Border Color:       #E2E8F0  (Slate 200, 1px solid)
Heading Text:       #0F172A  (Slate 900, Bold 700 / Black 900)
Body Text:          #475569  (Slate 600, Regular 400 / Medium 500)
Muted Text:         #64748B  (Slate 500)

# Top Bar & Direct Messaging
Top Bar Background: #0F172A  (High contrast dark slate)
Top Bar Border:     #1E293B
WhatsApp Green:     #25D366
Telegram Blue:      #229ED9
```

---

## 2. Core Interactive Homepage Components

### 2.1 `HeroSocraticSimulator` (`src/components/home/HeroSocraticSimulator.tsx`)
- **macOS Window Interface**: Sleek dark slate window with traffic controls.
- **Python Project**: Text-based Mars Rover Game (`mars_adventure.py`).
- **Interactive Browser Game Runtime**: Click action buttons (`[1]`, `[2]`, `[3]`) or type choices into the input prompt to play the adventure game with real-time state telemetry (`Energy`, `Crystals`, `Health`).

### 2.2 `InteractiveCurriculumExplorer` (`src/components/home/InteractiveCurriculumExplorer.tsx`)
- Interactive age pill selector (`Ages 6-8`, `Ages 9-11`, `Ages 12-14`, `Ages 15-18`).
- Displays core stack, measurable outcomes, and verified student capstones per stage.

### 2.3 `SkillGraphPreview` (`src/components/home/SkillGraphPreview.tsx`)
- Interactive SVG 6-dimensional radar chart.
- Hoverable/clickable dimensions: *Problem Solving*, *Self-Learning*, *Programming*, *Systems Thinking*, *Creativity*, *Engineering Mindset*.

### 2.4 `FloatingContactWidget` (`src/components/shared/FloatingContactWidget.tsx`)
- Global floating bottom-right admissions widget.
- 1-click expandable popover linking to WhatsApp (`+880 1860 99 88 88`) and Telegram with authentic SVG brand badges.

---

## 3. Core UI Components

### 3.1 `Card` (`src/components/ui/Card.tsx`)
- **Background**: Pure `#FFFFFF`
- **Border**: `1px solid #E2E8F0`
- **Border Radius**: `20px` (`rounded-[20px]`)
- **Shadow**: `box-shadow: 0 10px 30px rgba(15,23,42,0.08)` (`card-shadow`)

### 3.2 `Button` (`src/components/ui/Button.tsx`)
- **Primary**: Background `#2563EB`, Hover `#1E40AF`, White text, Radius `12px` (`rounded-xl`).
- **Secondary / Outline**: Pure White background, `1px solid #2563EB`, text `#2563EB`.
- **Emerald**: Background `#10B981`, Hover `#059669`, White text (for verification actions).

### 3.3 `Badge` (`src/components/ui/Badge.tsx`)
- Soft pastel badges with subtle borders (`blue`, `emerald`, `amber`, `violet`, `indigo`, `secondary`).
