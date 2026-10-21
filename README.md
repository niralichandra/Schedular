# AI Timetable Generator

A clean, interactive weekly schedule dashboard for visualising class timetables. It renders a Monday–Friday grid from 08:00 to 18:00 in 30-minute slots, places colour-coded subject cards in their time slots, and highlights the current time.

## Features

- **Weekly grid view** – Monday to Friday, 08:00–18:00, split into 30-minute slots
- **Colour-coded subject cards** – each card shows the subject, time range and teacher
- **Break slots** – lunch and other breaks are styled separately from classes
- **Live current-time indicator** – a line marks the current time and refreshes every minute
- **"Go to Current Time" button** – scrolls the timetable straight to now
- **Drag and drop** – move class cards between days
- **Responsive layout** – built with CSS Grid and the Inter font

## Tech Stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Frontend | HTML5, CSS3 (Grid), vanilla JavaScript       |
| Backend  | C++ with [nlohmann/json](https://github.com/nlohmann/json) (in progress) |

## Project Structure

```
timetable-generator/
├── index.html        # Dashboard markup
├── style.css         # Layout, grid and card styles
├── script.js         # Grid rendering, schedule data, drag & drop, time indicator
└── backend/
    └── json.hpp      # nlohmann/json single-header library (v3.11.2)
```

## Getting Started

No build step or dependencies are needed for the frontend.

1. Clone the repository:
   ```bash
   git clone https://github.com/niralichandra/project-4.git
   cd project-4
   ```
2. Open `index.html` in your browser, or serve the folder locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000` (or the URL printed by `serve`).

## Customising the Schedule

Schedule entries live in the `scheduleData` array in `script.js`:

```js
{
  id: '1',
  subject: 'Advanced Mathematics',
  teacher: 'Dr. Alan Smith',
  day: 1,                 // 1 = Monday ... 5 = Friday
  startTime: '09:00',
  endTime: '10:30',
  colorClass: 'bg-subject-1',
  type: 'class'           // 'class' or 'break'
}
```

The visible time range and slot size are set by `START_HOUR`, `END_HOUR` and `SLOT_DURATION_MINUTES` at the top of `script.js`.

## Roadmap

- Automatic timetable generation from teacher, subject and room constraints
- C++ backend that serves generated schedules as JSON
- Snap-to-slot drag and drop with clash detection
- Export to PDF / image

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
