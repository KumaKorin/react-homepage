import React from "react";
import bgStyle from "./Background.module.css"

interface BackgroundProps {
    text: string | "PAGE";
}

const Background: React.FC<BackgroundProps> = ({ text }) => {
    return (
        <div className={bgStyle.background_text_wrapper}>
            <p className={`${bgStyle.background_text} ${bgStyle.background_bg_top}`}>{`<${text.toUpperCase()}>`}</p>
            <p className={`${bgStyle.background_text} ${bgStyle.background_bg_bottom}`}>{`</${text.toUpperCase()}>`}</p>
        </div>
    )
}

export default Background