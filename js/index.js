const API_KEY =
  "39e6d72f910eaee4fec9cef9a0b1e4101fd547d7b69b7dacc4f6e00ca0118fa5";
const BASE_URL = "https://apiv3.apifootball.com";

// get epl standings
const getCountryLeagesStandings = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/?action=get_standings&league_id=152&APIkey=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
    }

    const tableBody = document.getElementById("table-body");
    if (tableBody) {
      if (data.length > 0) {
        data.forEach((club, index) => {
          const tableRow = document.createElement("tr");
          tableRow.innerHTML = `<td>${index + 1}</td>
                      <td>
                      <img src=${club?.team_badge} width="30px" height="30px">
                        <strong class="text-white">${club?.team_name}</strong>
                      </td>
                      <td>${club.overall_league_payed}</td>
                      <td>${club.overall_league_W}</td>
                      <td>${club.overall_league_D}</td>
                      <td>${club.overall_league_L}</td>
                      <td>${club.overall_league_GF}</td>
                      <td>${club.overall_league_GA}</td>
                      <td>${Math.abs(
                        +club.overall_league_GA - +club.overall_league_GF
                      )}</td>
                      <td>${club.overall_league_PTS}</td
                    `;

          tableBody.appendChild(tableRow);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// execute function on page load
window.addEventListener("load", getCountryLeagesStandings);

// list of countries to cover
const countries = [
  "Nigeria",
  "England",
  "Spain",
  "Italy",
  "Germany",
  "France",
  "Netherlands",
  "Russia",
];

const getAllEvents = async () => {
  // get current date
  const date = new Date();

  // get the date of current day
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  // get the date of next seven days
  const to = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() + 7
  }`;
  try {
    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=39e6d72f910eaee4fec9cef9a0b1e4101fd547d7b69b7dacc4f6e00ca0118fa5&from=${today}&to=${to}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
    }

    if (data?.result.length > 0) {
      // filter events based on selected countries
      const selectedCountries = data?.result.filter((events) =>
        countries.includes(events.country_name)
      );

      // display all events on matches screen
      const eventDiv = document.getElementById("all-events");
      if (eventDiv) {
        selectedCountries.forEach((event) => {
          const eventCard = document.createElement("div");
          eventCard.classList.add("col-lg-6");
          eventCard.classList.add("mb-4");

          eventCard.innerHTML = `<div class="bg-light p-4 rounded">
                <div class="widget-body">
                  <div class="widget-vs">
                    <div
                      class="d-flex align-items-center justify-content-around justify-content-between w-100"
                    >
                      <div class="team-1 text-center">
                        <img src=${event?.home_team_logo} alt="Image" />
                        <h3>${event?.event_home_team}</h3>
                      </div>
                      <div>
                        <span class="vs"><span>VS</span></span>
                      </div>
                      <div class="team-2 text-center">
                        <img src=${event?.away_team_logo}  alt="Image" />
                        <h3>${event?.event_away_team}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="text-center widget-vs-contents mb-4">
                  <h4>${event?.league_name} (${event?.country_name})</h4>
                  <p class="mb-5">
                    <span class="d-block"> ${event?.event_date}</span>
                    <span class="d-block">${event?.event_time}</span>
                    <strong class="text-primary">${event?.event_stadium}</strong>
                  </p>
                </div>
              </div>`;

          eventDiv.appendChild(eventCard);
        });
      }

      // filter all england and league cup matches
      const englandCompetions = selectedCountries.filter(
        (events) =>
          events.country_name === "England" &&
          events.league_name === "League Cup"
      );

      // display next match on home screen
      const compDiv = document.getElementById("competition");
      if (compDiv) {
        compDiv.innerHTML = `<h1 class="text-white">${englandCompetions[0]?.league_name}</h1>
      <div style="display:flex; justify-content:space-between" class="mt-4">
        <div class="text-center">
        <img width="50px" src=${englandCompetions[0]?.home_team_logo} />
          <h5>${englandCompetions[0]?.event_home_team}</h5>
        </div>
       <div class="text-center">
        <img width="50px" src=${englandCompetions[0]?.away_team_logo} />
          <h5>${englandCompetions[0]?.event_away_team}</h5>
        </div>
      </div>

      <div class="text-center mt-5"> <h3> ${englandCompetions[0]?.event_date}</h3> </div>
    <p>
      <a href="#" class="more light">Learn More</a>
    </p>`;
      }

      //display next match on matches screen
      const nextMatchDiv = document.getElementById("widget-vs");

      if (nextMatchDiv) {
        nextMatchDiv.innerHTML = `<div
                      class="d-flex align-items-center justify-content-around justify-content-between w-100"
                    >
                      <div class="team-1 text-center">
                        <img src=${englandCompetions[0]?.home_team_logo} alt="Image" />
                        <h3>${englandCompetions[0]?.event_home_team}</h3>
                      </div>
                      <div>
                        <span class="vs"><span>VS</span></span>
                      </div>
                      <div class="team-2 text-center">
                        <img src="${englandCompetions[0]?.away_team_logo} alt="Image" />
                        <h3>${englandCompetions[0]?.event_away_team}</h3>
                      </div>
                    </div>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getAllEvents);

//get previous events
const getPreviousEvents = async () => {
  // get current date
  const date = new Date();

  // get date of yesterday
  const to = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() - 1
  }`;

  // get date of last 5 days before yesterday
  const from = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() - 5
  }`;
  try {
    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=39e6d72f910eaee4fec9cef9a0b1e4101fd547d7b69b7dacc4f6e00ca0118fa5&from=${from}&to=${to}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
    }

    if (data?.result.length > 0) {
      const selectedCountries = data?.result.filter((events) =>
        countries.includes(events.country_name)
      );

      const eventDiv = document.getElementById("recent-event");
      eventDiv.innerHTML = `<div class="d-flex team-vs">
              <span class="score">${
                selectedCountries[0]?.event_final_result
              }</span>
              <div class="team-1 w-50">
                <div class="team-details w-100 text-center">
                  <img src=src=${
                    selectedCountries[0]?.home_team_logo
                  } alt="Image" class="img-fluid" />
                  <h3>${selectedCountries[0]?.event_home_team} <span>(${
        Number(selectedCountries[0].event_final_result.split("-")[0].trim()) >
        Number(selectedCountries[0].event_final_result.split("-")[1].trim())
          ? "Win"
          : "Loss"
      })</span></h3>
                   <ul class="list-unstyled">
                    ${selectedCountries[0]?.goalscorers
                      .map((scorer) => {
                        return `<li>${
                          scorer?.home_scorer ? scorer?.home_scorer : ""
                        } ${
                          scorer?.home_scorer ? `(${scorer?.time})` : ""
                        } </li>`;
                      })
                      .join("")}

                   
                  </ul>
                </div>
              </div>
              <div class="team-2 w-50">
                <div class="team-details w-100 text-center">
                  <img src=${
                    selectedCountries[0]?.away_team_logo
                  } class="img-fluid" />
                  <h3>${selectedCountries[0]?.event_away_team} <span> <h3>${
        selectedCountries[0]?.event_home_team
      } <span>(${
        Number(selectedCountries[0].event_final_result.split("-")[1].trim()) >
        Number(selectedCountries[0].event_final_result.split("-")[0].trim())
          ? "Win"
          : "Loss"
      })</span></h3>
                   <ul class="list-unstyled">
                    ${selectedCountries[0]?.goalscorers
                      .map((scorer) => {
                        return `<li>${
                          scorer?.away_scorer ? scorer?.away_scorer : ""
                        } ${
                          scorer?.away_scorer ? `(${scorer?.time})` : ""
                        } </li>`;
                      })
                      .join("")}

                   
                  </ul>
                </div>
              </div>
            </div>`;
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getPreviousEvents);
