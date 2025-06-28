import styled from 'styled-components';
import { useReducer } from 'react';
import { CustomSelect } from './CustomSelect';
import { CustomInput } from './Input';
import { Button } from './Button';
import { useData } from '../providers';
import { useCallback } from 'react';
import { statusOptions, genderOptions, speciesOptions } from './filterOptions';

const initialState = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'setStatus':
      return {
        ...state,
        status: action.value
      };
    case 'setGender':
      return {
        ...state,
        gender: action.value
      };
    case 'setSpecies':
      return {
        ...state,
        species: action.value
      };
    case 'setName':
      return {
        ...state,
        name: action.value
      };
    case 'setType':
      return {
        ...state,
        type: action.value
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const setURL = (name, value, URL) => {
  value ? URL.searchParams.set(name, value) : URL.searchParams.delete(name);
};

export function Filters() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { apiURL, setApiURL } = useData();

  const submit = useCallback(() => {
    const URLWithPage = new URL(apiURL);
    Object.keys(state).forEach((field) =>
      setURL(field, state[field], URLWithPage)
    );
    setApiURL(URLWithPage);
  }, [apiURL, setApiURL, state]);

  const setStatus = useCallback(
    (value) => dispatch({ type: 'setStatus', value }),
    []
  );

  const setGender = useCallback(
    (value) => dispatch({ type: 'setGender', value }),
    []
  );

  const setSpecies = useCallback(
    (value) => dispatch({ type: 'setSpecies', value }),
    []
  );

  const setName = useCallback(
    (value) => dispatch({ type: 'setName', value }),
    []
  );

  const setType = useCallback(
    (value) => dispatch({ type: 'setType', value }),
    []
  );

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
    const URLWithPage = new URL(apiURL);
    Object.keys(initialState).forEach((field) =>
      setURL(field, initialState[field], URLWithPage)
    );

    setApiURL(URLWithPage);
  }, [apiURL, setApiURL]);

  return (
    <FiltersContainer>
      <CustomSelect
        options={statusOptions}
        value={state.status}
        onChange={setStatus}
        name="status"
        placeholder="Status"
      />

      <CustomSelect
        options={genderOptions}
        value={state.gender}
        onChange={setGender}
        name="gender"
        placeholder="Gender"
      />

      <CustomSelect
        options={speciesOptions}
        value={state.species}
        onChange={setSpecies}
        name="species"
        placeholder="Species"
      />
      <CustomInput
        name="name"
        value={state.name}
        onChange={setName}
        placeholder="Name"
      />
      <CustomInput
        name="type"
        value={state.type}
        onChange={setType}
        placeholder="Type"
      />
      <ButtonsContainer>
        <Button variant="apply" onClick={submit}>
          Apply
        </Button>
        <Button variant="reset" onClick={reset}>
          Reset
        </Button>
      </ButtonsContainer>
    </FiltersContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FiltersContainer = styled.div`
  width: 561px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    width: 482px;
  }

  @media (max-width: 600px) {
    justify-content: center;
    grid-template-columns: 240px;
  }
`;
