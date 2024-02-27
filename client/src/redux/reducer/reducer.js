import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_NAME,
  GET_DETAIL_COUNTRY,
  POST_NEW_ACTIVITY,
  FILTER,
  ORDER,
  FILTER_ACT,
} from "../actions/actionsType";

const initialState = {
  allCountries: [],
  allCountriesCopy: [],
  activities: [],
  detailCountry: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      console.log(action.payload);
      return {
        ...state,
        allCountries: action.payload,
        allCountriesCopy: action.payload,
      };

    case GET_COUNTRY_BY_NAME:
      return { ...state, allCountries: action.payload };
    case GET_DETAIL_COUNTRY:
      return { ...state, detailCountry: action.payload };
    case POST_NEW_ACTIVITY:
      return { ...state, activities: [...state.activities, action.payload] };
    case FILTER:
      if (action.payload === "Todos") {
        return { ...state, allCountries: state.allCountriesCopy };
      } else if (action.payload === "America") {
        state.allCountries = state.allCountriesCopy;
        const FilteredCountries = state.allCountries.filter(
          (country) =>
            country.continente == '{"North America"}' ||
            country.continente == '{"South America"}'
        );
        return { ...state, allCountries: FilteredCountries };
      } else {
        state.allCountries = state.allCountriesCopy;
        const FilteredCountries = state.allCountries.filter(
          (country) => country.continente == action.payload
        );
        return { ...state, allCountries: FilteredCountries };
      }
    case ORDER:
      if (action.payload === "Alfabeticamente") {
        const orderedCountries = state.allCountries.sort((a, b) => {
          if (a.nombre > b.nombre) return 1;
          else return -1;
        });
        return { ...state, allCountries: orderedCountries };
      }
      if (action.payload === "Mayor area") {
        const orderedCountries = state.allCountries.sort((a, b) => {
          if (Number(a.area) < Number(b.area)) return 1;
          else return -1;
        });
        return { ...state, allCountries: orderedCountries };
      }
      if (action.payload === "Mayor poblacion") {
        const orderedCountries = state.allCountries.sort((a, b) => {
          if (Number(a.poblacion) < Number(b.poblacion)) return 1;
          else return -1;
        });
        return { ...state, allCountries: orderedCountries };
      }
    case FILTER_ACT:
      state.allCountries = state.allCountriesCopy;
      const countrAct = state.allCountries.filter((country) => {
        const filteredCountryByAct = country.Activities.find(
          (activity) => activity.nombre == action.payload
        );
        return filteredCountryByAct;
      });
      return { ...state, allCountries: countrAct };

    default:
      return { ...state };
  }
};
