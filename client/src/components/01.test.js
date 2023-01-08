import React from 'react';
import ActDificultad from './ActDificultad';
import ActDuracion from './ActDuracion';

import BusquedaForm from './BusquedaForm';
import renderer from 'react-test-renderer';
import { screen, render,fireEvent } from '@testing-library/react';



test('ActDificultad se renderiza correctamente', () => {
  const handleChange = jest.fn();
  const formData = { difficulty: 'muyFacil' };
  const tree = renderer.create(<ActDificultad handleChange={handleChange} formData={formData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('ActDuracion se renderiza correctamente', () => {
    const handleChange = jest.fn();
    const formData = { duration: '1:00' };
    render(<ActDuracion handleChange={handleChange} formData={formData} />);
  
    // Verifica que el menú desplegable se está renderizando correctamente
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  
    // Verifica que el menú desplegable tiene las opciones correctas
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(14);
    expect(options[0]).toHaveTextContent('0:00hs');
    expect(options[1]).toHaveTextContent('0:30hs');
    // y así sucesivamente
  });
  
  
  
  