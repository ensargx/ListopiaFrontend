interface MoviePageProps {
    params: {
        movieId: string;
    };
}

export async function generateStaticParams() {
    // Örneğin, önceden belirlenmiş movieId'ler
    return [
        { movieId: '1' },
        { movieId: '2' },
        { movieId: '3' },
    ];
}

export default function MoviePage({ params }: MoviePageProps) {
    const { movieId } = params;

    return (
        <div>
            <h1>Movie ID: {movieId}</h1>
        </div>
    );
}
