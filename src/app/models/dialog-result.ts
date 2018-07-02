import { DialogResultValue } from './dialog-result-value.enum';

export interface DialogResult<T> {
    name: string;
    result: DialogResultValue;
    data: T;
}
