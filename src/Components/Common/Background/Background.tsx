import bgStyle from "./Background.module.css"

const Background = ({ text }: { text: string | "PAGE" }) => {
    return (
        <div className={bgStyle.background_text_wrapper}>
            <p className={`${bgStyle.background_text} ${bgStyle.background_bg_top}`}>{`<${text.toUpperCase()}>`}</p>
            <p className={`${bgStyle.background_text} ${bgStyle.background_bg_bottom}`}>{`</${text.toUpperCase()}>`}</p>
        </div>
    )
}

export default Background