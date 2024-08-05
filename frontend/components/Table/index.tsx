import { useMemo } from 'react';
import { TABLE_SPACE_Y_DICT, TABLE_BG_COLOR_DICT } from '@/components/Table/styles';
import Row from '@/components/Table/Row';
import type { TableStyle, TableField, TableRowData } from '@/components/Table/types';
import TableFieldRow from '@/components/Table/FieldRow/FieldRow';
import useSortedRows from '@/components/Table/hooks/useSortedRows';
import WaitingSymbol from '@/components/WaitingSymbol';

type TableProps<T extends TableRowData> = {
  type?: TableStyle;
  hasMouseEffect?: boolean;
  fields: readonly TableField<T>[];
  rows: readonly T[];
  dSortValue?: string;
  dIsAsc?: boolean;
  onRowClick?: (row: T) => void;
  onToggleRowSubJsx?: (data: T, isOpen: boolean) => void;
  onToggleAllSubJsx?: (isOpen: boolean) => void;
  onSort?: (isAsc: boolean, sortValue: string) => void;
  showRowClickIcon?: boolean;
  noDataLabel?: string;
  rowsScrollHeight?: string;
  isLoading?: boolean;
};

/**
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/treegrid_role for accessibility guideline
 */
const Table = <T extends TableRowData>({
  type = 'transparent',
  hasMouseEffect,
  fields,
  rows,
  dSortValue,
  dIsAsc,
  onRowClick,
  onToggleRowSubJsx,
  onToggleAllSubJsx,
  onSort,
  showRowClickIcon = false,
  noDataLabel = 'No data found',
  rowsScrollHeight,
  isLoading = false,
}: TableProps<T>) => {
  /** @summary sorting & filtering */
  const { sortedRows, isAsc, sortValue, sortBy } = useSortedRows({
    rows,
    fields,
    dSortValue,
    dIsAsc,
    onSort,
  });

  const hasAnySubJsx = useMemo<boolean>(() => rows.some((row) => row.subJsx !== undefined), [rows]);
  const hasAnySubJsxOpen = useMemo<boolean>(() => rows.some((row) => row.isSubJsxOpen), [rows]);
  const needRightSpace = useMemo<boolean>(
    () => (showRowClickIcon && onRowClick !== undefined) || hasAnySubJsx || rows.some((row) => row.rightEnd !== undefined),
    [hasAnySubJsx, showRowClickIcon, onRowClick, rows],
  );

  // class names
  const { backgroundClassName, gapYClassName } = useMemo(
    () => ({
      backgroundClassName: TABLE_BG_COLOR_DICT[type],
      gapYClassName: `${TABLE_SPACE_Y_DICT[type]}`,
    }),
    [type],
  );
  const { heightClassName, overFlowClassName } = useMemo(
    () => ({
      heightClassName: rowsScrollHeight ? 'h-full' : '',
      overFlowClassName: rowsScrollHeight ? 'overflow-y-auto' : '',
    }),
    [rowsScrollHeight],
  );

  return (
    <div role="treegrid" className={`relative w-full ${heightClassName} overflow-hidden ${gapYClassName} ${backgroundClassName}`}>
      {/* fields */}
      <TableFieldRow
        type={type}
        fields={fields}
        rowsScrollHeight={rowsScrollHeight}
        onToggleAllSubJsx={onToggleAllSubJsx}
        sortBy={sortBy}
        sortValue={sortValue}
        isAsc={isAsc}
        needRightSpace={needRightSpace}
        hasAnySubJsx={hasAnySubJsx}
        hasAnySubJsxOpen={hasAnySubJsxOpen}
      />

      {/* rows */}
      <div
        role="rowgroup"
        className={`relative w-full ${gapYClassName} ${overFlowClassName}`}
        style={{ height: rowsScrollHeight, scrollbarGutter: 'stable' }}>
        {sortedRows.map((row, index) => (
          <Row
            key={row.id}
            type={type}
            hasMouseEffect={hasMouseEffect}
            showRowClickIcon={showRowClickIcon}
            data={row}
            index={index}
            fields={fields}
            onClick={onRowClick}
            onToggleSubJsx={onToggleRowSubJsx}
            needRightSpace={needRightSpace}
            isLoading={isLoading}
          />
        ))}

        {/* no data fallback */}
        {sortedRows.length === 0 && (
          <div
            role="row"
            className={`relative w-full h-[240px] flex items-center justify-center text-center px-3 py-5 md:px-4 hover:!bg-none ${backgroundClassName}`}>
            {isLoading ? <WaitingSymbol color="caption" /> : <span className="Font_caption_sm text-caption">{noDataLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
