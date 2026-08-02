document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("events-list");

  if (!list) {
    return;
  }

  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load starred repositories.");
      }
      return response.json();
    })
    .then((events) => {
      if (!Array.isArray(events) || events.length === 0) {
        list.innerHTML = '<li class="empty">No starred repositories yet.</li>';
        return;
      }

      list.innerHTML = events
        .map((event) => {
          const starredDate = new Date(event.starredAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
          });

          return `
            <li class="event-card">
              <div class="event-meta">
                <span>${starredDate}</span>
                <span>${event.language || "Misc"}</span>
              </div>
              <h2><a href="${event.url}" target="_blank" rel="noopener noreferrer">${event.name}</a></h2>
              <p class="event-owner">by ${event.owner}</p>
              <p>${event.description}</p>
            </li>
          `;
        })
        .join("");
    })
    .catch((error) => {
      list.innerHTML = `<li class="empty">${error.message}</li>`;
    });
});
