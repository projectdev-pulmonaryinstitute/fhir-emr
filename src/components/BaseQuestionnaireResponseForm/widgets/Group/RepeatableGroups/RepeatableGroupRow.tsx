import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { QuestionItems } from 'sdc-qrf';

import { RepeatableGroupProps, useRepeatableGroup } from '.';
import { S } from './styles';

export function RepeatableGroupRow(props: RepeatableGroupProps) {
    const { groupItem } = props;
    const { questionItem } = groupItem;
    const { item, readOnly } = questionItem;
    const { onRemove, parentPath, context } = useRepeatableGroup(props);

    return (
        <S.Row>
            <S.RowItems>
                <QuestionItems questionItems={item!} parentPath={parentPath} context={context} />
            </S.RowItems>
            {!readOnly ? (
                <S.RowControls>
                    <Button icon={<DeleteOutlined />} type="default" onClick={onRemove} size="middle" />
                </S.RowControls>
            ) : null}
        </S.Row>
    );
}
