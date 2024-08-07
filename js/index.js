const API_KEY =
  "39e6d72f910eaee4fec9cef9a0b1e4101fd547d7b69b7dacc4f6e00ca0118fa5";
const BASE_URL = "https://apiv3.apifootball.com";

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
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getCountryLeagesStandings);

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
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

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
      const selectedCountries = data?.result.filter((events) =>
        countries.includes(events.country_name)
      );

      const englandCompetions = selectedCountries.filter(
        (events) =>
          events.country_name === "England" &&
          events.league_name === "League Cup"
      );

      const compDiv = document.getElementById("competition");
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
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getAllEvents);

//get previous events
const getPreviousEvents = async () => {
  const date = new Date();
  const to = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() - 1
  }`;

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

      console.log(selectedCountries)
      const eventDiv = document.getElementById("recent-event");
      eventDiv.innerHTML = `<div class="d-flex team-vs">
              <span class="score">${
                selectedCountries[0]?.event_final_result
              }</span>
              <div class="team-1 w-50">
                <div class="team-details w-100 text-center">
                  <img src=${
                    selectedCountries[0]?.home_team_logo
                  } alt="Image" class="img-fluid" />
                  <h3>${
                    selectedCountries[0]?.event_home_team
                  } <span>(win)</span></h3>
                  <ul class="list-unstyled">
                    <li>${selectedCountries[0]?.goalscorers[0]?.home_scorer}  ${
        selectedCountries[0]?.goalscorers[0]?.home_scorer
          ? selectedCountries[0]?.goalscorers[0]?.time
          : ""
      }</li>
                      <li>${
                        selectedCountries[1]?.goalscorers[1]?.home_scorer
                      }  (${
        selectedCountries[1]?.goalscorers[1]?.home_scorer
          ? selectedCountries[1]?.goalscorers[1]?.time
          : ""
      })</li>
                  </ul>
                </div>
              </div>
              <div class="team-2 w-50">
                <div class="team-details w-100 text-center">
                  <img src=${
                    selectedCountries[0]?.away_team_logo
                  } class="img-fluid" />
                  <h3>${
                    selectedCountries[0]?.event_away_team
                  } <span>(loss)</span></h3>
                  <ul class="list-unstyled">
                       <li>${
                         selectedCountries[0]?.goalscorers[0]?.away_scorer
                       }  ${
        selectedCountries[0]?.goalscorers[0]?.away_scorer
          ? selectedCountries[0]?.goalscorers[0]?.time
          : ""
      }</li>
                      <li>${
                        selectedCountries[1]?.goalscorers[1]?.away_scorer
                      }  ${
        selectedCountries[1]?.goalscorers[1]?.away_scorer
          ? selectedCountries[1]?.goalscorers[1]?.time
          : ""
      }</li>
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
