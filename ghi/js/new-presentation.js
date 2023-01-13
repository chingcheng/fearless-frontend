window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);
    const selectTag = document.getElementById('conference')

    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option')

        option.value = conference.id
        option.innerHTML = conference.name

        selectTag.appendChild(option)
      }
    }

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
      event.preventDefault();

      const formData = new FormData(formTag);
      console.log(formData)
      const json = JSON.stringify(Object.fromEntries(formData));
      const conferenceId = selectTag.options[selectTag.selectedIndex].value

      const presentationsURL = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const presentationResponse = await fetch(presentationsURL, fetchConfig);
      if (presentationResponse.ok) {
        formTag.reset();
        const newPresentation = await presentationResponse.json();
        console.log(newPresentation);
      }
    });
  });

  //
