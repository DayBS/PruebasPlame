import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownsDinamicos = () => {
  const opcionesFacultades = ['Facultad Politécnica del Alto', 'Facultad de Ciencias Sociales', 'Facultad de Odontologia', 'Facultad de Medicina', 
                              'Facultad de Humanidades y Ciencias de la Educación' , 'Facultad de Ciencias y Tecnología', 'Facultad de Ciencias Jurídicas y Políticas', 
                              'Facultad de Ciencias Economicas', 'Facultad de Ciencias Agrícolas, Pecuarias y Forestales', 'Facultad de Ciencias Veterinarias'
                              , 'Facultad de Bioquímica y Farmacia', 'Facultad de Arquitectura y Ciencias del Hábitad', 'Facultad de Desarrollo Rural y Territorial'];
  const opcionesCarreras = {
    'Facultad Politécnica del Alto': ['Técnico Superior en Química Industrial', 'Técnico Superior en Mecánica Industrial', 'Técnico Superior en Industria de Alimentos' 
                                   , 'Técnico Superior en Mecánica Automotriz', 'Técnico Superior en Construcción Civil', 'Auxuliar Técnico en Enfermería', 
                                   'Ingeniería Mecánica Automotriz y Maquinaria Agroindustrial' ],
    'Facultad de Ciencias Sociales': ['Licenciatura en Sociología', 'Programa de Licenciatura en Antropología'],
    'Facultad de Odontologia': ['Licenciatura en Odontología'],
    'Facultad de Medicina': ['Licenciatura en Nutrición y Dietética', 'Carrera de Licenciatura en Medicina', 'Licenciatura en Fisioterapia y Kinesiología'],
    'Facultad de Humanidades y Ciencias de la Educación': ['Licenciatura en Trabajo Social', 'Licenciatura en Psicología', 'Licenciatura en Lingüística Aplicada a la Enseñanza de Lengua', 
                                                        'Licenciatura en Comunicación Social', 'Licenciatura en Ciencias de la Educación', 
                                                        'Programa de Licenciatura Especial en Educación Intercultural Bilingue', 'Programa de Licenciatura en Música', 
                                                        'Programa de Licenciatura en Ciencias de la Actividad Física y Deportes'],
    'Facultad de Ciencias y Tecnología':['Carrera en Licenciatura en Química','Licenciatura en Matemáticas','Licenciatura en Biología','Carrera de Ingeniería Química'
                                        ,'Carrera de Ingeniería Mecánica','Carrera de Ingeniería Matemática','Carrera de Ingeniería Informática','Carrera de Ingeniería Industrial',
                                        'Carrera de Ingeniería Electrónica','Carrera de Ingeniería Electromecánica','Carrera de Ingeniería Eléctrica',
                                        'Carrera de Ingeniería Sistemas','Carrera de Ingeniería Alimentos','Carrera de Ingeniería Civil',],
    'Facultad de Ciencias Jurídicas y Políticas':['Licenciatura en Ciencias Políticas','Licenciatura en Ciencias Jurídicas'],
    'Facultad de Ciencias Economicas':['Carrera de Licenciatura en Economía','Carrera de Licenciatura en Administración de Empresas','Carrera de Licenciatura en Contaduría Publica'
                                      ,'Ingeniería Financiera','Ingeniería Comercial'],
    'Facultad de Ciencias Agrícolas, Pecuarias y Forestales':['Técnico Superior en Mecanización Agrícola','Ingeniería Forestal','Ingeniería del Medio Ambiente'
                                                              ,'Ingeniería del Medio Ambiente','Ingeniería Agroindustrial'],
    'Facultad de Ciencias Veterinarias':['Licenciatura en Medicina Veterinaria y Zootecnia'],
    'Facultad de Bioquímica y Farmacia':['Licenciatura en Bioquímica y Farmacia'],
    'Facultad de Arquitectura y Ciencias del Hábitad':['Licenciatura en Arquitectura','Licenciatura en Diseño de Interiores y Mobiliario',
                                                      'Técnico Superior en Construcciones de Edificaciones','Licenciatura en Turismo',
                                                      'Licenciatura en Planificación en Territorio y del Medio Ambiente','Licenciatura en Diseño Gráfico y Comunicación Visual'],
    'Facultad de Desarrollo Rural y Territorial':['Técnico Superior en Agronomía','Licenciatura en Producción Agraria y Desarrollo Territorial'],  
     
  }; 
  const opcionesArea = ['CEUB', 'ARCU-SUR'];

  const [seleccionFacultades, setSeleccionFacultades] = useState('');
  const [seleccionCarreras, setSeleccionCarreras] = useState('');
  const [seleccionArea, setSeleccionArea] = useState('');

  
  const handleFacultadesChange = (e) => {
    const seleccion = e.target.value;
    setSeleccionFacultades(seleccion);
    setSeleccionCarreras('');
    setSeleccionArea('');
  };

  const handleCarrerasChange = (e) => {
    const seleccion = e.target.value;
    setSeleccionCarreras(seleccion);
  };
  const handleAreaChange = (e) => {
    const seleccion = e.target.value;
    setSeleccionArea(seleccion);
  };

  const isBotonHabilitado = seleccionFacultades !== '' && seleccionCarreras !== '' && seleccionArea !== '';

  const setLocalStorage = () => {
    // Verificar si todas las selecciones están hechas
    if (seleccionFacultades !== '' && seleccionCarreras !== '' && seleccionArea !== '') {
      // Crear un objeto con la información seleccionada
      const seleccion = {
        facultad: seleccionFacultades,
        carrera: seleccionCarreras,
        area: seleccionArea,
      };

      localStorage.setItem('seleccion', JSON.stringify(seleccion));
    } else {
      console.log('Por favor, complete todas las selecciones.');
    }
  };

  return (
    <div>
      <Link to="/">
      <button className="App-button">Atras</button>
    </Link>
<br></br>
      <label>
        Selección de Facultad:
        <select value={seleccionFacultades} onChange={handleFacultadesChange}>
          <option value="">Seleccionar</option>
          {opcionesFacultades.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </label>

      {seleccionFacultades && (
        <>
        <label>
          Selección Carrera:
          <select value={seleccionCarreras} onChange={handleCarrerasChange}>
            <option value="">Seleccionar</option>
            {opcionesCarreras[seleccionFacultades].map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>

        <label>
            Tipo de Evaluación:
            <select value={seleccionArea} onChange={handleAreaChange}>
              <option value="">Seleccionar</option>
              {opcionesArea.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

<br></br>
<Link to="/">
      <button className="Atras-button">Atras</button>
    </Link>
<Link to="/tabla">
      <button className="App-button" onClick={setLocalStorage} disabled={!isBotonHabilitado}>Llenar</button>
    </Link>
<br></br>
    </div>
  );
};

export default DropdownsDinamicos;
