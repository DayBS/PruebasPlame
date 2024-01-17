import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VerMatrices = ({ onToggle }) => {

  const [data, setData] = useState([]);
  const [listaCarreras, setListaCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedMatriz, setSelectedMatriz] = useState([]);
  const [dinamicos, setDinamicos] = useState([]);

  const range = (n) => Array.from({ length: n }, (_, i) => i);

  useEffect(() => {
    // Read from localStorage
    const storedData = localStorage.getItem('data');

    // If 'data' doesn't exist in localStorage, create it as an empty array
    if (!storedData) {
      localStorage.setItem('data', JSON.stringify([]));
      setData([]);
    } else {
      // Parse the stored data and set it to the state
      setData(JSON.parse(storedData));
    }
  }, []);


  useEffect(() => {
    // Filter the data array to get objects with the "carrera" key
    const filteredCarreras = data.filter((obj) => obj.carrera);

    // Update listaCarreras
    setListaCarreras(filteredCarreras);
  }, [data]);

  useEffect(() => {
    // Find the selected object based on the value of selectedCarrera
    const selectedObject = listaCarreras.find(
      (obj) => `${obj.carrera} (${obj.area})` === selectedCarrera
    );

    // Update selectedMatriz with the matriz property of the selected object
    setSelectedMatriz(selectedObject ? selectedObject.matriz : []);

    const selectedDinamicos = selectedObject ? selectedObject.dinamicos : [];

  // Update dinamicos state with the selected values
    setDinamicos(selectedDinamicos);
  }, [selectedCarrera, listaCarreras]);


  return(
    <div className='tabla'>
      <h2>Solo vista de matrices</h2>
      <h2>Lista de Carreras</h2>
      <select onChange={(e) => setSelectedCarrera(e.target.value)}>
        <option value="" disabled selected>
          Seleccione una carrera
        </option>
        {listaCarreras.map((obj, index) => (
          <option key={index} value={`${obj.carrera} (${obj.area})`}>
            {`${obj.carrera} (${obj.area})`}
          </option>
        ))}
      </select>

      <h2>Matriz Seleccionada</h2>
      <table>
        <thead>
          <tr>
            {selectedMatriz[0] && selectedMatriz[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          
          
        {selectedMatriz[1] && range(selectedMatriz[1][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[1] && selectedMatriz[1][0] && (
                <th rowSpan={dinamicos[1]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[1][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[1][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}


          {selectedMatriz[2] && range(selectedMatriz[2][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[2] && selectedMatriz[2][0] && (
                <th rowSpan={dinamicos[2]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[2][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[2][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[3] && range(selectedMatriz[3][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[3] && selectedMatriz[3][0] && (
                <th rowSpan={dinamicos[3]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[3][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[3][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[4] && range(selectedMatriz[4][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[4] && selectedMatriz[4][0] && (
                <th rowSpan={dinamicos[4]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[4][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[4][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[5] && range(selectedMatriz[5][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[5] && selectedMatriz[5][0] && (
                <th rowSpan={dinamicos[5]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[5][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[5][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[6] && range(selectedMatriz[6][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[6] && selectedMatriz[6][0] && (
                <th rowSpan={dinamicos[6]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[6][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[6][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[7] && range(selectedMatriz[7][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[7] && selectedMatriz[7][0] && (
                <th rowSpan={dinamicos[7]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[7][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[7][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[8] && range(selectedMatriz[8][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[8] && selectedMatriz[8][0] && (
                <th rowSpan={dinamicos[8]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[8][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[8][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[9] && range(selectedMatriz[9][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[9] && selectedMatriz[9][0] && (
                <th rowSpan={dinamicos[9]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[9][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[9][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}

{selectedMatriz[10] && range(selectedMatriz[10][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && selectedMatriz[10] && selectedMatriz[10][0] && (
                <th rowSpan={dinamicos[10]} style={{ backgroundColor: '#C6E5B1' }}>
                  <h3>{selectedMatriz[10][0]}</h3>
                </th>
              )}
              {range(10).map((colIndex) => (
                <td key={colIndex}>{selectedMatriz[10][colIndex+1][rowIndex]}</td>
              ))}
              
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/">
        <button className="App-button">Volver a la Página Principal</button>
      </Link>
    </div>
  )
};

export default VerMatrices;