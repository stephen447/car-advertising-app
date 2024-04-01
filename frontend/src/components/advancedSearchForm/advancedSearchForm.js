import "./advancedSearchForm.css"
import  { useState } from "react"
export default function AdvancedSearchForm(){
    const [ManufacturerOptions, setManufacturerOptions] = useState();
    const [ModelOptions, setModelOptions] = useState([""]);
    const [TransmissionOptions, setTransmissionOptions] = useState([""]);
    const [disableModelOptions, setDisableModeloptions] = useState(true);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(true); // New state for advanced options visibility

    // Variables for search
    let manufacturer, model, minYear=1900, maxYear=2023, minPrice = 0, maxPrice=999999;
    
    


    let formOptions;
    /**
     * Must make API call immediately when page is loaded to see what manufacturer options there is
     */

    const makeOption = function(option){
        /**
         * Function which creates the option for the form
         */
        return <option value={option}>{option}</option>
    }

    const handleSubmit = (e) =>{
        /**
         * This function will handle to API call to the backend to get the adverts for the given search form
         */
        e.preventDefault();
        console.log("Form submitted!");
        if(minPrice>maxPrice||minYear>maxYear){
            console.log("Invalid Form");
            return;
        }
    }

    const handleManufacturerChange = (e) =>{
        /**
         * This function will handle to API call to the backend to get the adverts for the given search form
         */
        e.preventDefault();
        console.log("Manufacturer Changed!");
        manufacturer = e.target.value;
        console.log("Min price", minPrice)
        
        // Could initiate a callback for the model if the manufacturers has changed
    }

    const toggleAdvancedOptions = () => {
        setShowAdvancedOptions(!showAdvancedOptions);
    };
    

    return(
        <div className="basicSearchForm">
            <h1>Search for cars for sale</h1>
            <form onSubmit={handleSubmit}>
                <div className="selectGroup">
                    <select className="formSelect" onChange={handleManufacturerChange}>
                        {formOptions.map(makeOption)}
                    </select>
                    <select className="formSelect" disabled={disableModelOptions}>
                        {ModelOptions.map(makeOption)}
                    </select>
                </div>
                
                <div className="selectGroup">
                    <input type="number" className="formSelect" min="1900" max="2023" onChange={ (e) => minYear = e.target.value} defaultValue={1900}/>
                    <input type="number" className="formSelect" min="1900" max="2023" onChange={ (e) => maxYear = e.target.value} defaultValue={2023}/>
                </div>
                <div className="selectGroup">
                    <input type="number" className="formSelect" min="0" max="999999" onChange={ (e) => minPrice = e.target.value} defaultValue={0}/>
                    <input type="number" className="formSelect" min="0" max="999999" onChange={ (e) => maxPrice = e.target.value} defaultValue={999999}/>
                </div>
                <div className="selectGroup">
                    <button className="submitButton" type="button" onClick={toggleAdvancedOptions}>
                        {showAdvancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}
                    </button>
                 </div>
                 {showAdvancedOptions && (
                    <div className="advancedOptions">
                        {/* Add your advanced search options here */}
                        <div className="selectGroup">
                            <input type="number" className="formSelect" min="1900" max="2023" onChange={ (e) => minYear = e.target.value} defaultValue={1900}/>
                            <input type="number" className="formSelect" min="1900" max="2023" onChange={ (e) => maxYear = e.target.value} defaultValue={2023}/>
                        </div>
                        <div className="selectGroup">
                            <select className="formSelect" onChange={handleManufacturerChange}>
                                {TransmissionOptions.map(makeOption)}
                            </select>
                            <select className="formSelect" onChange={handleManufacturerChange}>
                                {TransmissionOptions.map(makeOption)}
                            </select>
                        </div>
                        {/* Add more advanced options as needed */}
                    </div>
                )}
                <div className="selectGroup">
                    <button className="submitButton" type="submit" >Search</button>
                </div>
                </form>
                
        </div>
        
    )
}

