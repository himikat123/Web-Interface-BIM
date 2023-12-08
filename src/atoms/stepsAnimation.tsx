import React from "react";
import './stepsAnimation.scss';

const StepsAnimation = () => {
    return <div className="steps-animation flex">
        {[...Array(5)].map((i, k) => {
            return <div key={'st' + k} className="loading-item bg-menu_active_light dark:bg-menu_active_dark" />
        })}
    </div>
}

export default StepsAnimation;