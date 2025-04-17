import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const { id } = useParams();
    return <h1>Film Detayı - {id}</h1>;
};

export default MovieDetailPage;
