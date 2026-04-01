import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { ParadigmTable } from '../../types/grammar';

interface Props {
  paradigm: ParadigmTable;
  showExamples?: boolean;
}

export default function ConjugationTable({ paradigm, showExamples = true }: Props) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <div class="mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div class="mb-4">
        <h3 class="font-greek text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {paradigm.name}
        </h3>
        {paradigm.description && (
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {paradigm.description}
          </p>
        )}
      </div>

      {/* Table */}
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          {/* Header row */}
          <thead>
            <tr>
              <th class="p-3 text-left font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-600">
                Person
              </th>
              {paradigm.cols.map((col) => (
                <th
                  key={col}
                  class="p-3 text-center font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-600"
                >
                  <span class="text-sm">{col}</span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paradigm.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td class="p-3 font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600">
                  {row}
                </td>
                {paradigm.cols.map((col, colIdx) => {
                  const cellKey = `${rowIdx}:${colIdx}`;
                  const cell = paradigm.cells[cellKey];
                  const isHovered = hoveredCell === cellKey;

                  return (
                    <td
                      key={cellKey}
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                      class={`p-3 border border-slate-300 dark:border-slate-600 cursor-help transition-all ${
                        isHovered ? 'ring-2 ring-blue-500 scale-105 shadow-lg' : ''
                      }`}
                    >
                      {cell ? (
                        <div>
                          <div class="font-greek text-lg font-bold text-slate-900 dark:text-white">
                            {cell.form}
                          </div>
                          <div class="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {cell.parsing}
                          </div>
                          {isHovered && cell.example && showExamples && (
                            <div class="text-xs text-slate-700 dark:text-slate-300 mt-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600">
                              <div class="font-greek font-semibold">{cell.example}</div>
                              {cell.reference && (
                                <div class="text-slate-500 dark:text-slate-500 italic">
                                  ({cell.reference})
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span class="text-slate-400 dark:text-slate-600">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      {paradigm.footer && (
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-slate-700 dark:text-slate-300">
          <strong>Note:</strong> {paradigm.footer}
        </div>
      )}
    </div>
  );
}
