import { useParams } from 'react-router-dom';

const TabsExperiment = () => {
  const params = useParams();
  const id = params.id ?? null;

  return (
    <div>
      <h1>Hola, soy un componente!</h1>
      <p>Parámetro recibido: {id ?? 'ninguno'}</p>
    </div>
  );
};

export default TabsExperiment;
/**
 * import { useParams } from 'react-router-dom';

const TabsExperiment = () => {
  const { id } = useParams<{ id?: string }>(); // id: string | undefined

  if (id == null) {
    // ruta sin id -> comportamiento para 'sin parámetro'
    return <div>No se recibió id</div>;
  }

  // id existe (string). Convertir/validar según lo que necesites:
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    return <div>Id inválido</div>;
  }

  return <div>Id numérico: {idNum}</div>;
};
 */