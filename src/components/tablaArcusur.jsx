import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tablaArcusur.css';
import Swal from 'sweetalert2'
import rmbtn from '../rmbtn.png';
import addbtn from '../addbtn.jpg';

const Tabla = () => {
  const [plam, setPlam] = useState({
    matriz: [
      ["DIMENSIÓN", "OBJETIVO", "PRODUCTO", "ACTIVIDADES", "INDICADOR", "VALIDEZ INDICADOR", "RESULTADO ESPERADO", "RESULTADO ALCANZADO (Carrera)","RESULTADO ALCANZADO (DUEA)", "COSTO ESPERADO", "COSTO ALCANZADO", "TIEMPO ESPERADO", "TIEMPO ALCANZADO"],
      ["CONTEXTO INSTITUCIONAL", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0], [0], [0]],
      ["PROYECTO ACADÉMICO", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0], [0], [0]],
      ["COMUNIDAD UNIVERSITARIA", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0], [0], [0]],
      ["INFRAESTRUCTURA", [""], [""], [""], [""], [""], [0], [0], [0], [0], [0], [0], [0]]
    ],
    dinamicos: Array.from({ length: 5 }, () => 1)
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
    console.log(plam.matriz);
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
  
    Swal.fire({
      icon: "success",
      title: "Su trabajo se guardo exitosamente",
      showConfirmButton: false,
      timer: 1500
    });
};

useEffect(() => {
  // Guardar en localStorage después de cada actualización de "data"
  localStorage.setItem('data', JSON.stringify(data));
}, [data]);


  
  return (
    <div className='tabla'>
      <Link to="/seleccionMatriz">
        <button className="App-button">Atras</button>
      </Link>
      <div className='cuadrosTexto'>
          <h2>Matriz de Calidad</h2>
          <h2>{infoLocal.facultad}</h2>
          <h2>{infoLocal.carrera}</h2>
          <h2>{infoLocal.area}</h2>
      </div>
      <button className="App-button" onClick={setLocalStorage}>Confirmar</button>

      <table>
        <thead>
          <tr>
            {plam.matriz[0].map((title, index) => (
              <th key={index}>{title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {range(plam.matriz[1][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && plam.matriz[1] && plam.matriz[1][0] && (
                <th rowSpan={plam.dinamicos[1]} style={{ backgroundColor: '#C6E5B1' }}>
                  {plam.dinamicos[1] > 1 && (
                    <button onClick={() => subtractObj(1)}>
                      <img src={rmbtn} alt="removearea" height="8" width="20" style={{ backgroundColor: 'transparent' }}/>
                    </button>
                  )}
                  <h3>{plam.matriz[1][0]}</h3>
                  <button onClick={() => addObj(1)}>
                  <img src={addbtn} alt="addarea" width="20" height="20" style={{ backgroundColor: 'transparent' }}/>
                  </button>
                </th>
              )}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <textarea 
                    type="text"
                    value={plam.matriz[1][colIndex + 1][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 1][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[1][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))} {range(2).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[1][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
          {range(plam.matriz[2][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && (
                <th rowSpan={plam.dinamicos[2]} style={{ backgroundColor: '#C6E5B1' }}>
                  {plam.dinamicos[2] > 1 && (
                    <button onClick={() => subtractObj(2)}>
                      <img src={rmbtn} alt="removearea" height="8" width="20" style={{ backgroundColor: 'transparent' }}/>
                    </button>
                  )}
                  <h3>{plam.matriz[2][0]}</h3>
                  <button onClick={() => addObj(2)}>
                  <img src={addbtn} alt="addarea" width="20" height="20" style={{ backgroundColor: 'transparent' }}/>
                  </button>
                </th>
              )}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <textarea
                    type="text"
                    value={plam.matriz[2][colIndex + 1][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[2][colIndex + 1][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[2][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[2][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}{range(2).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[1][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
          {range(plam.matriz[3][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && (
                <th rowSpan={plam.dinamicos[3]} style={{ backgroundColor: '#C6E5B1' }}>
                  {plam.dinamicos[3] > 1 && (
                    <button onClick={() => subtractObj(3)}>
                      <img src={rmbtn} alt="removearea" height="8" width="20" style={{ backgroundColor: 'transparent' }}/>
                    </button>
                  )}
                  <h3>{plam.matriz[3][0]}</h3>
                  <button onClick={() => addObj(3)}>
                  <img src={addbtn} alt="addarea" width="20" height="20" style={{ backgroundColor: 'transparent' }}/>
                  </button>
                </th>
              )}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <textarea
                    type="text"
                    value={plam.matriz[3][colIndex + 1][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[3][colIndex + 1][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[3][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[3][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}{range(2).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[1][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
          {range(plam.matriz[4][1].length).map((rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && (
                <th rowSpan={plam.dinamicos[4]} style={{ backgroundColor: '#C6E5B1' }}>
                  {plam.dinamicos[4] > 1 && (
                    <button onClick={() => subtractObj(4)}>
                      <img src={rmbtn} alt="removearea" height="8" width="20" style={{ backgroundColor: 'transparent' }}/>
                    </button>
                  )}
                  <h3>{plam.matriz[4][0]}</h3>
                  <button onClick={() => addObj(4)}>
                  <img src={addbtn} alt="addarea" width="20" height="20" style={{ backgroundColor: 'transparent' }}/>
                  </button>
                </th>
              )}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <textarea
                    type="text"
                    value={plam.matriz[4][colIndex + 1][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[4][colIndex + 1][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
              {range(5).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[4][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[4][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}{range(2).map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={plam.matriz[1][colIndex + 6][rowIndex]}
                    onChange={(e) => {
                      const newMatriz = [...plam.matriz];
                      newMatriz[1][colIndex + 6][rowIndex] = e.target.value;
                      setPlam({ matriz: newMatriz, dinamicos: plam.dinamicos });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
      
        </tbody>
      </table>



    </div>
  );
};

export default Tabla;
