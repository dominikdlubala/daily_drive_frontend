import WorkoutsGalleryItem from "./WorkoutsGalleryItem"


export default function WorkoutsGallery() {

    return (
        <div className="gallery gallery-workouts">
            {mockData.map(el => (
                <WorkoutsGalleryItem key={el.title + '1'} workoutData={el} />
            ))}
        </div>
    )
}

const mockData = [
    {
        title: 'Chest 1', 
        exercises: [
            { name: 'Bench press' }, 
            { name: 'Dumbell fly' }, 
            { name: 'Peck deck' }
        ]
    },
    {
        title: 'Chest 1', 
        exercises: [
            { name: 'Bench press' }, 
            { name: 'Dumbell fly' }, 
            { name: 'Peck deck' }
        ]
    },
    {
        title: 'Chest 1', 
        exercises: [
            { name: 'Bench press' }, 
            { name: 'Dumbell fly' }, 
            { name: 'Peck deck' }
        ]
    },
    {
        title: 'Chest 1', 
        exercises: [
            { name: 'Bench press' }, 
            { name: 'Dumbell fly' }, 
            { name: 'Peck deck' }
        ]
    },
]