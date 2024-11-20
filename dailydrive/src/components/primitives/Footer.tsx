import { useState } from 'react'; 

import Drawer, { workoutDrawerConfig, dietDrawerConfig } from './Drawer';

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
                        <Drawer 
                            isOpen={isWorkoutDrawerOpen} 
                            onClose={() => setIsWorkoutDrawerOpen(false)}
                            drawerConfig={workoutDrawerConfig}
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
                       <Drawer
                            isOpen={isDietDrawerOpen}
                            onClose={() => setIsDietDrawerOpen(false)}
                            drawerConfig={dietDrawerConfig}
                       />
                    }
                </div>
            </div>
        </div>
    )
}