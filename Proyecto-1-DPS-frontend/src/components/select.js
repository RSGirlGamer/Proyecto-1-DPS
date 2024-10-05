import Select from 'react-select'

function SelectCustom({options, value, onChange}) {
    return(
        <Select styles={{
            option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isFocused ? "white" : "",
                backgroundColor: state.isFocused ? "#517ed6" : ""
            }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#86b7fe" : "#dee2e6",
                transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                lineHeight: "1.5",
                borderRadius: "0.375rem",
                border: state.isFocused ? "" : "",
                outline: state.isFocused ? "0" : "0",
                boxShadow: state.isFocused ? "0 0 0px 0.25rem rgba(13, 110, 253, 0.25)" : ""
            })
        }} options={options} value={value || {value: '', label: ''}} onChange={onChange} />
    )
}


export default SelectCustom;