import { useState } from 'react'; 
import WorkoutsDrawer from '../workouts/WorkoutsDrawer';
import DietDrawer from '../diet/DietDrawer';

export default function Footer() {

    const [isWorkoutDrawerOpen, setIsWorkoutDrawerOpen] = useState<boolean>(false); 
    const [isDietDrawerOpen, setIsDietDrawerOpen] = useState<boolean>(false); 

    return(
        <div className="footer">
            <div className="buttons--footer">
                <div className="buttons--footer-group">
                    <button onClick={() => {
                        setIsWorkoutDrawerOpen(!isWorkoutDrawerOpen)
                    }} className="btn-primary btn--add-workout">
                        Trening +
                    </button>
                    { 
                        isWorkoutDrawerOpen 
                        &&
                        <WorkoutsDrawer 
                            isOpen={isWorkoutDrawerOpen} 
                            onClose={() => setIsWorkoutDrawerOpen(false)}
                        />
                    }
                </div>

                <div className="buttons--home-group">
                    <button 
                        onClick={() => {
                        setIsDietDrawerOpen(!isDietDrawerOpen)
                    }} className="btn-primary btn--add-diet">
                        Posiłek +
                    </button>
                    { 
                        isDietDrawerOpen 
                        &&
                       <DietDrawer
                            isOpen={isDietDrawerOpen}
                            onClose={() => setIsDietDrawerOpen(false)}
                       />
                    }
                </div>
            </div>
        </div>
    )
}