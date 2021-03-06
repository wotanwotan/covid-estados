import React from 'react';
import { Route } from 'react-router-dom';
import Err404 from '../Err404';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ilovehome from '../assets/ilovehome.svg';
import telephone from '../assets/telephone.svg';
import telephone2 from '../assets/telephone2.svg';

import android from '../assets/android.svg';
import web from '../assets/web.svg';
import sms from '../assets/sms.svg';
import apple from '../assets/apple.svg';
import hospital from '../assets/hospital.svg';
import docs from '../assets/docs.svg';
import whatsapp from '../assets/whatsapp.svg';
import cat from '../assets/cat.svg';

import {
  Icon,
  Container,
  Counter,
  Box,
  LinkTo,
} from '../Components';

function Detail({ estados }) {
  const { id } = useParams();
  const item = estados[id] || false;
  // console.log('> ITEM', item);

  let violencia_genero_en_linea = []
  let violencia_genero_telefono = []
  let telefono = []
  if (item) {
    if (item.violencia_genero_en_linea && item.violencia_genero_en_linea !== 'no') {
      // item.violencia_genero_en_linea debe ser:
      // key value,key2 value2..
      violencia_genero_en_linea = item.violencia_genero_en_linea.split(',').map(v => v.split(' '))
    }
    if (item.violencia_genero_telefono && item.violencia_genero_telefono !== 'no') {
      violencia_genero_telefono = item.violencia_genero_telefono.split(',')
    }

    if (item.telefono) {
      telefono = item.telefono.split(',')
    }
  }

  return (
    item ?
    <React.Fragment>

      <Container>
        <Container direction={'column'} className={'title'} alignItems={'center'}>
          <h1>{item.estado}</h1>
          Te interesa información de otro estado
          <button className="states-action" type="button">[SELECCIONA]</button>
          Quédate en casa y lavate las manos
        </Container>

        <Container direction={'column'}>
          <Box direction={'column'}>
            <Container>
              <Counter title={'Casos confirmados'} number={140} />
              <Counter title={'Casos confirmados'} number={140} />
              <Counter title={'Casos confirmados'} number={140} />
            </Container>
            <Container>
              <Container alignItems={'center'}>
                <button>Conóce más</button>
              </Container>
            </Container>
          </Box>
          <Box direction={'column'}>
            <Container>
              <h4>Lineas locales de atencion</h4>
            </Container>
            <Container>
              <Container>
                {telefono.map((v, k) => <span key={k}>{v}</span>)}
              </Container>
              <Container alignItems={'end'}>
                <img src={telephone} alt="Quédate en casa"/>
              </Container>
            </Container>
          </Box>
        </Container>

        <Container>
          <Box>
            medidas oficiales
          </Box>
        </Container>

      </Container>


      <Container>
        <Container direction={'column'} alignItems={'center'}>
          <h2>Tienes sintomas</h2>
          <h4>Hazte la pruena en línea</h4>
          <Container>
            {item.prueba_web !== 'no' &&<Icon image={web} text={'Sitio Web'} />}
            {item.app_ios !== 'no' && <Icon image={apple} text={'App-ios'} link={item.app_ios}/>}
          </Container>
          <Container>
            {item.app_android !== 'no' && <Icon image={android} text={'App-and'} link={item.app_android}/>}
            {item.sms !== 'no' && <Icon image={sms} text={'Sms'} link={item.sms}/>}
          </Container>
        </Container>
        <Container className={'movileHide'}>
          <img src={ilovehome} alt="Quédate en casa"/>
        </Container>
      </Container>

      <Container direction={'column'} className={'bgBlue'}>
        <Container className={'mobileColumn'}>
          <Container direction={'column'} alignItems={'center'}>
            <h1>Informacion relevante</h1>
            <img src={cat} alt={'Informacion relevante'} className="movileHide"/>
          </Container>
          <Container direction={'column'}>
            <Box direction={'column'}>
              <Container>
                <h3>Líneas de atención a violencia de género</h3>
              </Container>
              <Container>
                <Container direction={'column'}>
                  {violencia_genero_telefono.length > 0 && <Container>
                    Teléfonos: <div>{violencia_genero_telefono.map((v, k) => (<div key={k}>{v}</div>))}</div>
                  </Container>}
                  {violencia_genero_en_linea.length > 0 && <Container>
                    En línea: <div>{violencia_genero_en_linea.map((v, k) => (<LinkTo key={k} v={v} />))}</div>
                  </Container>}
                </Container>
                <img src={telephone2} alt="Teléfono"/>
              </Container>
            </Box>
            <Container>
              {item.programas !== 'no' && <Icon image={docs} text={'Programas'} link={item.programas}/>}
              {item.whatsapp !=='no' && <Icon image={whatsapp} text={'whatsapp'} link={item.whatsapp} />}
              {item.centros_salud !== 'no' && <Icon image={hospital} text={'Centros de salud'} link={item.centros_salud}/>}
            </Container>
          </Container>
        </Container>
        <Container alignItems={'center'}>
          <h2>Para más información: </h2><a href={item.web} className="button" target="_blank" rel="noopener noreferrer">SITIO WEB OFICIAL</a>
        </Container>
      </Container>

      <Container direction={'column'} alignItems={'center'}>
        <p>
          *Este es un esfuerzo voluntario, si encuentras información incorrecta o quieres agregar algo, llena este formulario
        </p>
        <button>Descargar datos</button>
      </Container>

    </React.Fragment>
    :<Route component={ Err404 } />
  );
}

const mapStateToProps = state => ({
  estados: state.estadosObj,
})
export default connect(
  mapStateToProps,
)(Detail)
