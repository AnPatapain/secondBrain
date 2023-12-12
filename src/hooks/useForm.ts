import {useState} from "react";

interface UseFormProps {
    initialValues: Record<string, string>
}

interface UseFormResult {
    values: Record<string, string>,
    handleChange: (name: string, value: string) => void,
    resetForm: () => void
}

const useForm = ({initialValues}: UseFormProps): UseFormResult => {
    const [values, setValues] =
        useState<Record<string, string>>(initialValues);

    const handleChange = (name: string, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        } as Record<string, string>)); // Explicitly type prevValues as Record<string, string>
    };

    const resetForm = ():void => {
        setValues(initialValues);
    }

    return {
        values, handleChange, resetForm
    }
}

export default useForm;