window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        const alert = document.querySelector('#alertPlaceholder');
        alert.innerHTML += createError();

      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = new Date(details.conference.starts);
            const dateStarts = starts.toLocaleDateString();
            const ends = new Date(details.conference.ends);
            const dateEnds = ends.toLocaleDateString();
            const location = details.conference.location.name;
            const html = createCard(name, description, pictureUrl, dateStarts, dateEnds, location);
            const column = document.querySelector('#conference-cards');
            column.innerHTML += html;
        }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
      console.log(e);
    }

  });


  function createCard(name, description, pictureUrl, dateStarts, dateEnds, location) {
    return `
    <div class="col">
      <div class="card shadow p-3 mb-5 bg-body-tertiary rounded grid gap-3">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class ="card-footer">
                    ${dateStarts} - ${dateEnds}
                </div>
      </div>
    </div>
    `;
  }


function createError() {
    return `<div class = "alert alert-primary" role-"alert">No conferences retrieved.</div>`
}
