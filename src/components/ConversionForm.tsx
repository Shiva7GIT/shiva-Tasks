import { useContext, useState, useMemo } from "react";
import { conversionContext } from "../context/conversionContext";
import { Grid, Paper} from "@mui/material";
import UnitSelect from "./UnitSelect";
import { allConversionUnits, conversionValue } from "../store/conversionStore";
import { ConversionType } from "../types/types";
// import ValueCalculator from "./Result";

export default function ConversionForm() {
    const {selectedConversion} = useContext(conversionContext);

    const [fromUnit, setFromUnit] = useState<string>('');
    const [toUnit, setToUnit] = useState<string>('');
    const [fromField, setFromField] = useState<number>(0);
    const [toField, setToField] = useState<number>(0);

    const units = useMemo(() => {
        return selectedConversion ? allConversionUnits(selectedConversion as ConversionType): [];
    }, [selectedConversion])
    // const canShowValue = useMemo(() => {
    //     return selectedConversion && fromUnit && toUnit;
    // }, [fromUnit, toUnit]);

    function handleFromUnitChange(unit: string) {
        setFromUnit(unit);
    }

    function handleToUnitChange(unit: string) {
        setToUnit(unit);
    }
    function handleFromFieldChange(field: number) {
        setFromField(field);
    }
    function handleToFieldChange(field: number) {
        setToField(field);
    }
    const value1 = useMemo(() => conversionValue(selectedConversion as ConversionType,fromUnit,toUnit,fromField),[selectedConversion,fromUnit,toUnit,fromField]);
    const value2 = useMemo(() => conversionValue(selectedConversion as ConversionType,toUnit,fromUnit,toField),[selectedConversion,toUnit,fromUnit,toField]);

    return(
        <Paper>
            <Grid container spacing={1}>
               
                <Grid item xs={6}>
                    <UnitSelect label="From" units={units} selected={fromUnit} onUnitChange={handleFromUnitChange} field={value2} onFieldChange={handleFromFieldChange}></UnitSelect>  
                </Grid>
               
                <Grid item xs={6}>
                    <UnitSelect label="To" units={units} selected={toUnit} onUnitChange={handleToUnitChange} field={value1} onFieldChange={handleToFieldChange}></UnitSelect>         
                </Grid>
            </Grid>
        </Paper>
    )
}
{/* <Grid item xs={6}>
<ValueCalculator conversion={selectedConversion as ConversionType} from={fromUnit} to={toUnit} input={input}></ValueCalculator> 
</Grid> */}