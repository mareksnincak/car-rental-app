export default {
  search: {
    search: "Vyhľadaj",
    extendedOptions: "Rozšírené vyhľadávanie",
    changeCriteria: "Zmeniť kritéria vyhľadávania",
  },
  vehicle: {
    transmission: {
      label: "Prevodovka",
      placeholder: "Zvoľte typ prevodovky",
      values: {
        manual: "manuálna",
        automatic: "automatická",
      },
    },
    fuel: {
      label: "Palivo",
      placeholder: "Zvoľte typ paliva",
      values: {
        petrol: "benzín",
        diesel: "diesel",
        hybrid: "hybrid",
        electric: "elektro",
      },
    },
    bodyStyle: {
      label: "Karoséria",
      placeholder: "Zvoľte typ karosérie",
      values: {
        sedan: "sedan",
        hatchback: "hatchback",
        liftback: "liftback",
        combi: "kombi",
        coupe: "kupé",
        pickUp: "pick-up",
        van: "dodávka",
      },
    },
    seats: {
      label: "Počet miest",
      min: {
        label: "Počet miest od",
        placeholder: "Počet miest od",
      },
      max: {
        label: "Počet miest do",
        placeholder: "Počet miest do",
      },
    },
    model: {
      label: "Model",
      placeholder: "Zadajte frázu (napr. Škoda Fábia)",
    },
    power: {
      label: "Výkon",
      min: {
        label: "Výkon od (kW)",
        placeholder: "Výkon od (kW)",
      },
      max: {
        label: "Výkon do (kW)",
        placeholder: "Výkon do (kW)",
      },
    },
    mileage: {
      label: "Nájazd",
    },
    color: {
      label: "Farba",
      values: {
        white: "biela",
        black: "čierna",
        gray: "sivá",
        silver: "strieborná",
        red: "červená",
        blue: "modrá",
        brown: "hnedá",
        green: "zelená",
        orange: "oranžová",
        yellow: "žltá",
      },
    },
  },
  screens: {
    home: {
      headerTitle: "Požičovňa vozidiel",
      form: {
        fromDate: "Dátum vyzdvihnutia",
        fromTime: "Čas vyzdvihnutia",
        toDate: "Dátum vrátenia",
        toTime: "Čas vrátenia",
        driverAge: "Vek vodiča",
      },
    },
    searchResult: {
      headerTitle: "Dostupné vozidlá",
      noVehiclesFound:
        "Ľutujeme, pre vami zvolené kritéria momentálne nemáme dostupné žiadne vozidlo. Skúste zmeniť kritéria vyhľadávania:",
    },
    vehicleDetail: {
      headerTitle: "Detail vozidla",
    },
  },
  components: {
    searchResultItem: {
      showDetail: "Zobraziť ponuku",
    },
  },
};
