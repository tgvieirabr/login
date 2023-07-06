import React from "react";
import Searchbar from "./Searchbar"
import SelectClient from "./SelectClient";
import SelectType from "./SelectType"

const FilterADM = () => {

    return (
        <div>
            <Searchbar/>
            <SelectClient/>
            <SelectType/>
        </div>
    )
};

export default FilterADM;