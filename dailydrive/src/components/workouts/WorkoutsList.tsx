import WorkoutsListItem from "./WorkoutsListItem"

export default function WorkoutsList() {
    
    return (
        <div className="list list-workouts">
            {mockData.map(el => <WorkoutsListItem workoutsData={el} />)}
        </div>
    )
}

const mockData = [
    {
        title: 'Workout 1', 
        time: '2h 30min', 
        exercises: [
            'Bench press', 
            'Dumbell press', 
            'Chest fly'
        ], 
    }, 
    {
        title: 'Workout 1', 
        time: '2h 30min', 
        exercises: [
            'Bench press', 
            'Dumbell press', 
            'Chest fly'
        ], 
    }, 
    {
        title: 'Workout 1', 
        time: '2h 30min', 
        exercises: [
            'Bench press', 
            'Dumbell press', 
            'Chest fly'
        ], 
    }, 
    {
        title: 'Workout 1', 
        time: '2h 30min', 
        exercises: [
            'Bench press', 
            'Dumbell press', 
            'Chest fly'
        ], 
    }, 
]
