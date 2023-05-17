import { isSuccess, RemoteData } from 'fhir-react/lib/libs/remoteData';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useQuestionnaireResponseFormContext } from 'sdc-qrf';

import { QuestionnaireItem } from 'shared/src/contrib/aidbox';

export function useFieldController(fieldName: any, questionItem: QuestionnaireItem) {
    const qrfContext = useQuestionnaireResponseFormContext();
    const { readOnly, hidden, repeats } = questionItem;
    const { control } = useFormContext();

    const { field, fieldState } = useController({
        control: control,
        name: fieldName.join('.'),
        ...(repeats ? { defaultValue: [] } : {}),
    });

    const onChange = useCallback(
        (option: any) => {
            if (repeats) {
                let arrayValue = (field.value ?? []) as any[];
                const valueIndex = arrayValue.findIndex((v) => _.isEqual(v, option));

                if (valueIndex === -1) {
                    field.onChange([...arrayValue, option]);
                } else {
                    arrayValue.splice(valueIndex, 1);
                    field.onChange(arrayValue);
                }
            } else {
                field.onChange(option);
            }
        },
        [repeats, field],
    );

    return {
        ...field,
        fieldState,
        onChange,
        hidden,
        disabled: readOnly || qrfContext.readOnly,
    };
}

export function useSavedMessage(draftSaveResponse: RemoteData) {
    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        if (isSuccess(draftSaveResponse)) {
            setSavedMessage('Saved');

            const timeoutId = setTimeout(() => {
                setSavedMessage('');
            }, 2500);
            return () => clearTimeout(timeoutId);
        }
    }, [draftSaveResponse]);
    return { savedMessage };
}
