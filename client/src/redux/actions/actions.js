import axios from "axios";
import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_NAME,
  GET_DETAIL_COUNTRY,
  POST_NEW_ACTIVITY,
  FILTER,
  ORDER,
  FILTER_ACT,
} from "./actionsType";

const URL = "http://localhost:5000/";

export const getAllCountries = () => {
  try {
    const endpoint = `${URL}countries`;
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: data,
      });
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountriesByName = (nombre) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${URL}countries/?nombre=${nombre}`);
      if (typeof data === "string") window.alert(data);
      else
        return dispatch({
          type: GET_COUNTRY_BY_NAME,
          payload: data,
        });
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailCountry = (id) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${URL}countries/${id}`);
      return dispatch({
        type: GET_DETAIL_COUNTRY,
        payload: data,
      });
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postNewActivity = (input) => {
  input.dificultad = Number(input.dificultad);
  input.duracion = Number(input.duracion);

  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}activities/`, input);
      window.alert("¡Actividad creada con éxito!");
      return dispatch({
        type: POST_NEW_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      window.alert("¡Actividad ya existente!");
      throw new Error(error);
    }
  };
};

export const filterCards = (continente) => {
  return { type: FILTER, payload: continente };
};

export const orderCards = (orden) => {
  return { type: ORDER, payload: orden };
};

export const filterByActivity = (actividad) => {
  return { type: FILTER_ACT, payload: actividad };
};
