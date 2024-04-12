import './stepsAnimation.scss';

export default function StepsAnimation() {
    return <div className="steps-animation flex">
        {[...Array(5)].map((i, k) => {
            return <div key={'st' + k} className="loading-item bg-menu_active_light dark:bg-menu_active_dark" />
        })}
    </div>
}