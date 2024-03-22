
import "./CInput.css"

// eslint-disable-next-line react/prop-types
export const CInput = ({className, type, placeholder, name, value, onChangeFunction, onBlurFunction}) => {

    return(
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}