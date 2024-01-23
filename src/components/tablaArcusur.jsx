import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tabla.css';

const Table = ({ matrix, dinamicos, onAdd, onSubtract, onChange }) => {
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  return (
    <tbody>
      {range(matrix[1][1].length).map((rowIndex) => (
        <tr key={rowIndex}>
          {rowIndex === 0 && matrix[1] && matrix[1][0] && (
            <th rowSpan={dinamicos[1]} style={{ backgroundColor: '#C6E5B1' }}>
              {dinamicos[1] > 1 && (
                <button onClick={() => onSubtract(1)}>
                  <img src="/rmbtn.png" alt="removearea" height="15" width="15" />
                </button>
              )}
              <h3>{matrix[1][0]}</h3>
              <button onClick={() => onAdd(1)}>
                <img src="/addbtn.png" alt="addarea" width="15" height="15" />
              </button>
            </th>
          )}
          {range(5).map((colIndex) => (
            <td key={colIndex}>
              <textarea
                type="text"
                value={matrix[1][colIndex + 1][rowIndex]}
                onChange={(e) => onChange(1, colIndex + 1, rowIndex, e.target.value)}
              />
            </td>
          ))}
          {range(5).map((colIndex) => (
            <td key={colIndex}>
              <input
                type="number"
                value={matrix[1][colIndex + 6][rowIndex]}
                onChange={(e) => onChange(1, colIndex + 6, rowIndex, e.target.value)}
              />
            </td>
          ))}
        </tr>
      ))}
      {/* Repeat the above structure for other matrices as needed */}
    </tbody>
  );
};

const Tabla = () => {
  const [plam, setPlam] = useState({
    matriz: [
      ["DIMENSIÓN", "OBJETIVO", "PRODUCTO", "ACTIVIDADES", "INDICADOR", "VALIDEZ INDICADOR", "RESULTADO ALCANZADO", "COSTO ESPERADO", "COSTO ALCANZADO", "TIEMPO ESPERADO", "TIEMPO ALCANZADO"],
      ["NORMAS JURÍDICAS INSTITUCIONALES", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["MISIÓN Y OBJETIVO", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["CURRÍCULO", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["ADMINISTRACIÓN Y GESTIÓN ACADÉMICA", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["DOCENTES", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["ESTUDIANTES", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["INVESTIGACIÓN E INTERACCIÓN SOCIAL", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["RECURSOS EDUCATIVOS", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["ADMINISTRATIVOS FINANCIEROS", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]],
      ["INFRAESTRUCTURA", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0]]
        ],
    dinamicos: Array.from({ length: 11 }, () => 1),
  });

  const [infoLocal, setInfoLocal] = useState({
    facultad: '',
    carrera: '',
    area: '',
  });


  const [data, setData] = useState([]);

  const addObj = (dim) => {
    const newDinamicos = [...plam.dinamicos];
    newDinamicos[dim] += 1;

    const newMatriz = [...plam.matriz];
   for (let i = 1; i <= 5; i++) {
      newMatriz[dim][i].push("");
    }
    for (let i = 6; i <= 10; i++) {
      newMatriz[dim][i].push(0);
    }

    setPlam({ matriz: newMatriz, dinamicos: newDinamicos });
  };

  const subtractObj = (dim) => {
    const newDinamicos = [...plam.dinamicos];
    newDinamicos[dim] -= 1;

    const newMatriz = [...plam.matriz];
    for (let i = 1; i <= 10; i++) {
      newMatriz[dim][i].pop();
    }
    setPlam({ matriz: newMatriz, dinamicos: newDinamicos });
  };

  const handleChange = (dim, col, row, value) => {
    const newMatriz = [...plam.matriz];
    newMatriz[dim][col][row] = value;
    setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
  };

  const range = (n) => Array.from({ length: n }, (_, i) => i);

  

  useEffect(() => {
    const storedSelection = JSON.parse(localStorage.getItem('seleccion'));

    if (storedSelection) {
      setInfoLocal({
        facultad: storedSelection.facultad,
        carrera: storedSelection.carrera,
        area: storedSelection.area,
      });

      const storedData = localStorage.getItem('data');

      if (!storedData) {
        localStorage.setItem('data', JSON.stringify([]));
        setData([]);
      } else {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  const setLocalStorage = () => {
      
    const seleccion = {
      facultad: infoLocal.facultad,
      carrera: infoLocal.carrera,
      area: infoLocal.area,
      matriz: plam.matriz,
      dinamicos: plam.dinamicos
    };
    
    const existingIndex = data.findIndex(
      (entry) =>
        entry.facultad === seleccion.facultad &&
        entry.carrera === seleccion.carrera &&
        entry.area === seleccion.area
    );
    
    if (existingIndex !== -1) {
      // Si existe, sobrescribir el objeto existente
      const newData = [...data];
      newData[existingIndex] = seleccion;
      setData(newData);
    } else {
      // Si no existe, agregar el nuevo objeto al array
      setData((prevData) => [...prevData, seleccion]);
    }
  
    
};

useEffect(() => {
  // Guardar en localStorage después de cada actualización de "data"
  localStorage.setItem('data', JSON.stringify(data));
}, [data]);


  return (
    <div className="tabla">
   <Link to="/">
        <button className="App-button">Atras</button>
      </Link>

      <h2>Tabla</h2>
      <h2>{infoLocal.facultad}</h2>
      <h2>{infoLocal.carrera}</h2>
      <h2>{infoLocal.area}</h2>
      <button className="App-button" onClick={setLocalStorage}>Confirmar</button>
      <table>
        <thead>
          <tr>
            {plam.matriz[0].map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <Table
          matrix={plam.matriz}
          dinamicos={plam.dinamicos}
          onAdd={addObj}
          onSubtract={subtractObj}
          onChange={handleChange}
        />
      </table>
    </div>
  );
};

export default Tabla;
