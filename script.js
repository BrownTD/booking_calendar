document.addEventListener("DOMContentLoaded", () => {
  // Select calendar elements
  const datesContainer = document.querySelector(".dates");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const monthHeader = document.querySelector(".calendar header h3");

  // Set initial date variables for current month and year
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Render the calendar
  function renderCalendar() {
    // Clear previous dates
    datesContainer.innerHTML = "";

    // Create date objects for the first and last days of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Determine how many days to show from previous month (to align weekdays)
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDatePrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Set month and year in header
    monthHeader.textContent = firstDayOfMonth.toLocaleString("default", {
      month: "long",
    }) + " " + currentYear;

    // Append dates from previous month as inactive cells
    for (let x = firstDayIndex; x > 0; x--) {
      const li = document.createElement("li");
      li.classList.add("inactive");
      li.textContent = lastDatePrevMonth - x + 1;
      datesContainer.appendChild(li);
    }

    // Append dates for the current month
    const lastDate = lastDayOfMonth.getDate();
    for (let day = 1; day <= lastDate; day++) {
      const li = document.createElement("li");
      // Highlight today's date if in current month and year
      if (
        day === currentDate.getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        li.classList.add("today");
      }
      li.textContent = day;
      datesContainer.appendChild(li);
    }

    // Optionally append dates from next month to complete the last week row
    const totalCells = datesContainer.children.length;
    const nextDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let j = 1; j <= nextDays; j++) {
      const li = document.createElement("li");
      li.classList.add("inactive");
      li.textContent = j;
      datesContainer.appendChild(li);
    }
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Initial render
  renderCalendar();
});

