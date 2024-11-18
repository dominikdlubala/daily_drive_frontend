import WorkoutsGalleryItem from "./WorkoutsGalleryItem"


export default function WorkoutsGallery() {

    return (
        <div className="gallery gallery-workouts">
            {mockData.map(el => (
                <WorkoutsGalleryItem workoutData={el} />
            ))}
        </div>
    )
}

const mockData = [
    {
        name: 'Chest 1', 
        exercises: [
            'Bench press', 
            'Dumbell fly', 
            'Peck deck'
        ]
    },
    {
        name: 'Chest 1', 
        exercises: [
            'Bench press', 
            'Dumbell fly', 
            'Peck deck'
        ]
    },
    {
        name: 'Chest 1', 
        exercises: [
            'Bench press', 
            'Dumbell fly', 
            'Peck deck'
        ]
    },
    {
        name: 'Chest 1', 
        exercises: [
            'Bench press', 
            'Dumbell fly', 
            'Peck deck'
        ]
    },
]