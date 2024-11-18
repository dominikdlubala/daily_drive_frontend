interface WorkoutsGalleryItemProps {
    workoutData: {name: string, exercises: string[]}
}

export default function WorkoutsGalleryItem({ workoutData }: WorkoutsGalleryItemProps) {

    return (
        <div className="gallery-item gallery-item--workouts">
            <div className="gallery-item--title">
                {workoutData.name}
            </div>
            <ul 
                className="gallery-item--exercises-list"
            >
                {workoutData.exercises.map(ex => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex}
                    >
                        {ex}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button className="gallery-item--button-start">
                Start workout
            </button>
        </div>
    )
} 