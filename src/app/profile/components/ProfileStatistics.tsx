import type React from "react"

interface ProfileStatisticsProps {
    stats: {
        watching: number
        completed: number
        onHold: number
        dropped: number
        totalFilms: number
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
                        style={{ width: `${(stats.watching / stats.totalFilms) * 100}%` }}
                        title={`Watching: ${stats.watching}`}
                    ></div>
                    <div
                        className="progress-segment completed"
                        style={{ width: `${(stats.completed / stats.totalFilms) * 100}%` }}
                        title={`Completed: ${stats.completed}`}
                    ></div>
                    <div
                        className="progress-segment on-hold"
                        style={{ width: `${(stats.onHold / stats.totalFilms) * 100}%` }}
                        title={`On Hold: ${stats.onHold}`}
                    ></div>
                    <div
                        className="progress-segment dropped"
                        style={{ width: `${(stats.dropped / stats.totalFilms) * 100}%` }}
                        title={`Dropped: ${stats.dropped}`}
                    ></div>
                </div>
                {/* Stats List */}
                <div className="stats-list">
                    <div className="stat-row">
                        <span className="stat-dot watching-dot"></span>
                        <span className="stat-name">Watching</span>
                        <span className="stat-count">{stats.watching}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-dot completed-dot"></span>
                        <span className="stat-name">Completed</span>
                        <span className="stat-count">{stats.completed}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-dot on-hold-dot"></span>
                        <span className="stat-name">On-Hold</span>
                        <span className="stat-count">{stats.onHold}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-dot dropped-dot"></span>
                        <span className="stat-name">Dropped</span>
                        <span className="stat-count">{stats.dropped}</span>
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
