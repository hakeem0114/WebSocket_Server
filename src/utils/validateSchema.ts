//Yup Imports
import { object, string, number} from 'yup';


export const validateUserObject  = object().shape({
    id: number().positive().integer(),
    name: string().required('Please enter name'),
    email: string().email('Please enter email'),
})

