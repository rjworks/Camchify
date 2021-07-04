import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";

const FormInput = ({name, label, required}) => {
    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={({field}) => (
                    <TextField {...field} label={label} required={required}/>)}
                as={TextField}
                control={control}
                fullWidth
                name={name}
            />
        </Grid>
    );
};

export default FormInput;
