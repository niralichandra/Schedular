document.addEventListener('DOMContentLoaded', () => {
    const timetableBody = document.getElementById('timetable-body');
    const currentTimeBtn = document.getElementById('current-time-btn');

    // Configuration
    const START_HOUR = 8; // 08:00
    const END_HOUR = 18;  // 18:00
    const SLOT_DURATION_MINUTES = 30;
    const NUM_DAYS = 5; // Monday to Friday
    
    // Calculate total rows
    const totalMinutes = (END_HOUR - START_HOUR) * 60;
    const NUM_ROWS = totalMinutes / SLOT_DURATION_MINUTES;
    
    // Set CSS variable for grid rows
    timetableBody.style.setProperty('--num-rows', NUM_ROWS);

    // Sample Data
    const scheduleData = [
        { id: '1', subject: 'Advanced Mathematics', teacher: 'Dr. Alan Smith', day: 1, startTime: '09:00', endTime: '10:30', colorClass: 'bg-subject-1', type: 'class' },
        { id: '2', subject: 'Physics Lab', teacher: 'Prof. Marie Curie', day: 1, startTime: '11:00', endTime: '12:30', colorClass: 'bg-subject-2', type: 'class' },
        { id: '3', subject: 'Lunch Break', teacher: '', day: 1, startTime: '12:30', endTime: '13:30', colorClass: '', type: 'break' },
        { id: '4', subject: 'Computer Science', teacher: 'Alan Turing', day: 1, startTime: '13:30', endTime: '15:00', colorClass: 'bg-subject-3', type: 'class' },
        
        { id: '5', subject: 'English Literature', teacher: 'Jane Austen', day: 2, startTime: '10:00', endTime: '11:30', colorClass: 'bg-subject-4', type: 'class' },
        { id: '6', subject: 'History', teacher: 'Herodotus', day: 2, startTime: '11:30', endTime: '12:30', colorClass: 'bg-subject-5', type: 'class' },
        { id: '7', subject: 'Lunch Break', teacher: '', day: 2, startTime: '12:30', endTime: '13:30', colorClass: '', type: 'break' },
        { id: '8', subject: 'Advanced Mathematics', teacher: 'Dr. Alan Smith', day: 2, startTime: '14:00', endTime: '15:30', colorClass: 'bg-subject-1', type: 'class' },

        { id: '9', subject: 'Chemistry', teacher: 'Dmitri Mendeleev', day: 3, startTime: '08:30', endTime: '10:00', colorClass: 'bg-subject-2', type: 'class' },
        { id: '10', subject: 'Art & Design', teacher: 'Leonardo da Vinci', day: 3, startTime: '10:30', endTime: '12:30', colorClass: 'bg-subject-3', type: 'class' },
        { id: '11', subject: 'Lunch Break', teacher: '', day: 3, startTime: '12:30', endTime: '13:30', colorClass: '', type: 'break' },
        
        { id: '12', subject: 'Computer Science', teacher: 'Alan Turing', day: 4, startTime: '09:00', endTime: '11:00', colorClass: 'bg-subject-3', type: 'class' },
        { id: '13', subject: 'Physics Lab', teacher: 'Prof. Marie Curie', day: 4, startTime: '11:00', endTime: '12:30', colorClass: 'bg-subject-2', type: 'class' },
        { id: '14', subject: 'Lunch Break', teacher: '', day: 4, startTime: '12:30', endTime: '13:30', colorClass: '', type: 'break' },
        
        { id: '15', subject: 'English Literature', teacher: 'Jane Austen', day: 5, startTime: '10:00', endTime: '12:00', colorClass: 'bg-subject-4', type: 'class' },
        { id: '16', subject: 'Lunch Break', teacher: '', day: 5, startTime: '12:30', endTime: '13:30', colorClass: '', type: 'break' },
        { id: '17', subject: 'Physical Education', teacher: 'Jim Thorpe', day: 5, startTime: '14:00', endTime: '16:00', colorClass: 'bg-subject-5', type: 'class' },
    ];

    /**
     * Converts a time string (e.g., "09:30") to grid row start and span
     * @returns { startRow, rowSpan }
     */
    function calculateGridPosition(startTimeStr, endTimeStr) {
        const [startH, startM] = startTimeStr.split(':').map(Number);
        const [endH, endM] = endTimeStr.split(':').map(Number);

        // Convert to minutes since start of day
        const startTotalMins = (startH * 60 + startM) - (START_HOUR * 60);
        const endTotalMins = (endH * 60 + endM) - (START_HOUR * 60);

        // Calculate rows (1 row = SLOT_DURATION_MINUTES)
        // Add 1 because CSS grid rows are 1-indexed
        const startRow = Math.floor(startTotalMins / SLOT_DURATION_MINUTES) + 1;
        const rowSpan = Math.ceil((endTotalMins - startTotalMins) / SLOT_DURATION_MINUTES);

        return { startRow, rowSpan };
    }

    /**
     * Renders background grid lines and time labels
     */
    function renderGridBackground() {
        // Render Time Labels
        for (let i = 0; i <= NUM_ROWS; i++) {
            const hour = Math.floor((START_HOUR * 60 + i * SLOT_DURATION_MINUTES) / 60);
            const min = (START_HOUR * 60 + i * SLOT_DURATION_MINUTES) % 60;
            
            // Only show hourly labels for cleaner look, or every slot if preferred
            if (min === 0) {
                const timeLabel = document.createElement('div');
                timeLabel.className = 'time-label';
                timeLabel.style.gridRow = `${i + 1} / span 1`;
                // Format time as HH:MM
                timeLabel.textContent = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                timetableBody.appendChild(timeLabel);
            }

            // Render horizontal grid lines for days
            for (let day = 1; day <= NUM_DAYS; day++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.style.gridRow = `${i + 1} / span 1`;
                cell.style.gridColumn = `${day + 1} / span 1`;
                timetableBody.appendChild(cell);
            }
        }
    }

    /**
     * Renders schedule cards
     */
    function renderCards() {
        scheduleData.forEach(item => {
            const card = document.createElement('div');
            
            if (item.type === 'break') {
                card.className = `schedule-card type-break`;
            } else {
                card.className = `schedule-card ${item.colorClass}`;
            }

            const { startRow, rowSpan } = calculateGridPosition(item.startTime, item.endTime);
            
            card.style.gridRow = `${startRow} / span ${rowSpan}`;
            // CSS grid column 1 is time, Monday is 2, Tuesday is 3...
            card.style.gridColumn = `${item.day + 1} / span 1`;
            card.draggable = true;
            card.dataset.id = item.id;

            let innerHTML = '';
            if (item.type === 'break') {
                innerHTML = `<div class="card-subject">${item.subject}</div>`;
            } else {
                innerHTML = `
                    <div class="card-subject">${item.subject}</div>
                    <div class="card-time">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${item.startTime} - ${item.endTime}
                    </div>
                    <div class="card-teacher">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${item.teacher}
                    </div>
                `;
            }

            card.innerHTML = innerHTML;

            // Optional: Basic Drag events
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.id);
                card.style.opacity = '0.5';
            });
            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
            });

            timetableBody.appendChild(card);
        });
    }

    /**
     * Optional: Drag and drop target handling on timetable body
     */
    function setupDragAndDrop() {
        timetableBody.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            e.dataTransfer.dropEffect = 'move';
        });

        timetableBody.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const card = document.querySelector(`.schedule-card[data-id='${id}']`);
            if (card) {
                // Simplistic drop logic: calculate column based on mouse position
                const rect = timetableBody.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const colWidth = rect.width / (NUM_DAYS + 1); // rough approx
                let targetDay = Math.floor(x / colWidth);
                if (targetDay >= 1 && targetDay <= NUM_DAYS) {
                    card.style.gridColumn = `${targetDay + 1} / span 1`;
                    // Ideally we'd calculate target time slot (Y axis) and update the dataset
                }
            }
        });
    }

    /**
     * Current Time Indicator
     */
    let currentTimeLine = null;
    
    function updateCurrentTimeIndicator() {
        const now = new Date();
        const currentH = now.getHours();
        const currentM = now.getMinutes();

        // Check if current time is within our timetable bounds
        if (currentH >= START_HOUR && currentH < END_HOUR) {
            const minutesSinceStart = (currentH * 60 + currentM) - (START_HOUR * 60);
            // rowHeight is set in CSS, but we need pixel value to position absolutely
            // Let's get the calculated row height from CSS
            const style = getComputedStyle(timetableBody);
            const rowHeight = parseInt(style.getPropertyValue('--row-height')) || 60;
            
            // Calculate pixel top offset based on percentage of slot duration
            // Since rows map to SLOT_DURATION_MINUTES
            const pixelsPerMinute = rowHeight / SLOT_DURATION_MINUTES;
            const topOffsetPixels = minutesSinceStart * pixelsPerMinute;

            if (!currentTimeLine) {
                currentTimeLine = document.createElement('div');
                currentTimeLine.className = 'current-time-line';
                timetableBody.appendChild(currentTimeLine);
            }
            
            currentTimeLine.style.top = `${topOffsetPixels}px`;
        } else {
            // Hide if outside working hours
            if (currentTimeLine) {
                currentTimeLine.style.display = 'none';
            }
        }
    }

    // Initialize
    renderGridBackground();
    renderCards();
    setupDragAndDrop();
    
    // Initial call and set interval for current time line
    updateCurrentTimeIndicator();
    setInterval(updateCurrentTimeIndicator, 60000); // Update every minute

    currentTimeBtn.addEventListener('click', () => {
        if(currentTimeLine) {
            currentTimeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Current time is outside schedule hours.');
        }
    });

});
