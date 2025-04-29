import type React from "react"

interface ProfileStatisticsProps {
    stats: {
        watched: number,
        wantToWatch: number,
        liked: number,
        totalFilms: number,
    }
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({ stats }) => {
    return (
        <div className="statistics-section">
            <h2>Statistics</h2>
            <div className="movie-stats">
                <h3>
                    <span className="stats-icon">📊</span> Movie Stats
                </h3>
                {/* Progress Bar */}
                <div className="progress-bar">
                    <div
                        className="progress-segment watching"
                        style={{ width: `${(stats.watched / stats.totalFilms) * 100}%` }}
                        title={`Watching: ${stats.watched}`}
                    ></div>
                    <div
                        className="progress-segment completed"
                        style={{ width: `${(stats.wantToWatch / stats.totalFilms) * 100}%` }}
                        title={`Completed: ${stats.wantToWatch}`}
                    ></div>
                    <div
                        className="progress-segment on-hold"
                        style={{ width: `${(stats.liked / stats.totalFilms) * 100}%` }}
                        title={`On Hold: ${stats.liked}`}
                    ></div>
                </div>
                {/* Stats List */}
                <div className="stats-list">
                    <div className="stat-row">
                        <span className="stat-dot watching-dot"></span>
                        <span className="stat-name">Watched</span>
                        <span className="stat-count">{stats.watched}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-dot completed-dot"></span>
                        <span className="stat-name">Want to Watch</span>
                        <span className="stat-count">{stats.wantToWatch}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-dot on-hold-dot"></span>
                        <span className="stat-name">Liked</span>
                        <span className="stat-count">{stats.liked}</span>
                    </div>
                    <div className="stat-row total">
                        <span className="stat-name">Total Films</span>
                        <span className="stat-count">{stats.totalFilms}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileStatistics
