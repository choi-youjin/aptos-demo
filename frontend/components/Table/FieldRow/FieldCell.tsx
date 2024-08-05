import { useMemo } from 'react';
import Icon from '@/components/Icon';
import { TABLE_FIELD_TYPO_DICT, getTableCellAlignClassName, getTableCellWidthStyle } from '../styles';
import type { TableField, TableRowData, TableStyle } from '../types';
import Tooltip from '@/components/Tooltip';

type FieldCellProps<T> = {
  type: TableStyle;
  field: TableField<T>;
  fieldIndex: number;
  className?: string;
  isAsc?: boolean;
  sortValue?: string;
  sortBy: (field: TableField<T>) => void;
};

const FieldCell = <T extends TableRowData>({
  type,
  field,
  fieldIndex,
  isAsc,
  sortValue,
  sortBy,
  className = '',
}: FieldCellProps<T>) => {
  const fontClassName = useMemo(() => TABLE_FIELD_TYPO_DICT[type], [type]);

  const isSortingField = useMemo<boolean>(
    () => sortValue === (field.sortValue ?? field.value),
    [sortValue, field.sortValue, field.value],
  );

  const ariaSort = useMemo(() => {
    return isSortingField ? (isAsc ? 'ascending' : 'descending') : 'none';
  }, [isSortingField, isAsc]);

  return (
    <div
      role="columnheader"
      aria-colindex={fieldIndex}
      aria-sort={ariaSort}
      className={`flex items-center gap-x-1 text-caption ${
        field.sortDisabled ? '' : 'cursor-pointer'
      } ${getTableCellAlignClassName(field, type)}`}
      style={getTableCellWidthStyle(field)}
      onClick={() => {
        if (!field.sortDisabled) sortBy(field);
      }}>
      <div className={`${className} flex items-center gap-x-1 ${fontClassName}`}>
        <Tooltip content={field.tooltipContent} layer="base">
          {field.label}
        </Tooltip>
      </div>

      {isSortingField && <Icon type={isAsc ? 'arrow_up' : 'arrow_down'} size="md" />}
    </div>
  );
};

export default FieldCell;
