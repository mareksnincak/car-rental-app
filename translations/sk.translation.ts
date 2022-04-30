export default {
  error: {
    default:
      "Nastala neočakávaná chyba, kontaktujte prosím našu zákaznícku linku",
  },
  common: {
    returnHome: "Návrat na domovskú obrazovku",
    returnBack: "Návrat späť",
  },
  search: {
    search: "Vyhľadaj",
    extendedOptions: "Rozšírené vyhľadávanie",
    changeCriteria: "Zmeniť kritéria vyhľadávania",
  },
  booking: {
    from: "Od",
    to: "Do",
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
      placeholder: "Napr. Škoda Fábia",
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
  tabs: {
    home: "Domov",
    bookings: "Aktuálne výpožičky",
  },
  screens: {
    search: {
      headerTitle: "Vyhľadávanie vozidiel",
      form: {
        fromTime: "Čas vyzdvihnutia",
        toDate: "Dátum vrátenia",
        toTime: "Čas vrátenia",
      },
    },
    searchResult: {
      headerTitle: "Dostupné vozidlá",
      noVehiclesFound:
        "Ľutujeme, pre vami zvolené kritéria momentálne nemáme dostupné žiadne vozidlo. Skúste zmeniť kritéria vyhľadávania:",
    },
    vehicleDetail: {
      vehicleParameters: "Parametre vozidla",
      summary: "Zhrnutie rezervácie",
      book: "Pokračovať na rezerváciu",
      bookingDate: "Dátum vyzdvihnutia",
      returnDate: "Dátum vrátenia",
      deposit: "Výška zálohy",
      price: "Cena výpožičky",
    },
    createBooking: {
      form: {
        name: {
          label: "Meno",
          placeholder: "Napr. Jozef Novák",
        },
        idNumber: {
          label: "Číslo OP",
          placeholder: "Napr. EC123456",
        },
        email: {
          label: "Email",
          placeholder: "Napr. jozef.novak@example.com",
        },
      },
      book: "Rezervuj s povinnosťou platby",
      bookingInfo: "Rezervačné údaje",
      confirmation: "Rezervácia vozidla prebehla úspešne",
      conflict: "Vozidlo už nie je dostupné, vyberte si prosím iné vozidlo",
    },
    returnBooking: {
      headerTitle: "Vrátenie vozidla",
      form: {
        mileage: {
          label: "Aktuálny stav tachometra",
          placeholder: "Napr. 142804",
        },
      },
      invalidMileage: "Zle zadaný stav tachometra",
      returnVehicle: "Vrátiť vozidlo",
      confirmation: "Vozidlo bolo vrátené. Cena prenájmu: {{totalPrice}}€.",
    },
    bookedVehicles: {
      headerTitle: "Aktuálne zapožičané vozidlá",
      noBookingsFound: "Aktuálne nemáte zapožičané žiadne vozidlo",
      returnVehicle: "Vrátiť vozidlo",
    },
  },
  components: {
    searchResultItem: {
      showDetail: "Zobraziť ponuku",
    },
  },
};
