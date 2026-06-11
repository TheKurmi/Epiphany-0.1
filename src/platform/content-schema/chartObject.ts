/**
 * Generalized educational visualization / chart object.
 * Greek aspect–time matrix is the reference implementation.
 */

import type { PlatformContentObject } from './contentObject'
import type { ContentType } from '../types'

export type ChartVisualizationKind =
  | 'matrix'
  | 'table'
  | 'timeline'
  | 'transformation-strip'
  | 'diagram'
  | 'graph'
  | 'custom'

export type ChartViewModeId = string

export interface ChartViewMode {
  id: ChartViewModeId
  label: string
  description?: string
}

export interface ChartAxisDefinition {
  id: string
  label: string
  hint?: string
  /** Optional second label layer (grammar mode) */
  grammarLabel?: string
}

export interface ChartCell {
  key: string
  valid: boolean
  labels: Record<ChartViewModeId, string>
  hints?: Record<ChartViewModeId, string>
  examples?: Array<{
    primary: string
    secondary?: string
    stem?: string
  }>
  insight?: string
  note?: string
}

export interface PlatformChartObject extends PlatformContentObject {
  contentType: Extract<ContentType, 'chart'>

  visualizationKind: ChartVisualizationKind

  viewModes: ChartViewMode[]

  /** Column / x-axis definitions */
  columns: ChartAxisDefinition[]

  /** Row / y-axis definitions */
  rows: ChartAxisDefinition[]

  cells: ChartCell[]

  /** Lesson ids that reference this chart */
  linkedLessonIds?: string[]

  /** Study focus / expandable overlay supported */
  supportsFocusMode: boolean
}
