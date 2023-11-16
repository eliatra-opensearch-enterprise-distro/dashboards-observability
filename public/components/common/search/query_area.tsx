/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiCodeEditor, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import React from 'react';
import { LLMInput } from '../../event_analytics/explorer/llm/input';

export function QueryArea({
  tabId,
  handleQueryChange,
  handleTimeRangePickerRefresh,
  runQuery,
  tempQuery,
  setNeedsUpdate,
  setFillRun,
  selectedIndex,
  nlqInput,
  setNlqInput,
}: any) {
  return (
    <EuiPanel paddingSize="m">
      <EuiFlexGroup gutterSize="m" direction="column">
        <EuiFlexItem>
          <EuiCodeEditor
            theme="textmate"
            width="100%"
            height="6rem"
            showPrintMargin={false}
            setOptions={{
              fontSize: '14px',
            }}
            aria-label="Code Editor"
            onChange={(query) => {
              handleQueryChange(query);
              // query is considered updated when the last run query is not the same as whats in the editor
              // setUpdatedQuery(runQuery !== query);
              setNeedsUpdate(runQuery !== query);
            }}
            onFocus={() => setFillRun(true)}
            onBlur={() => setFillRun(false)}
            value={tempQuery}
            wrapEnabled={true}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <LLMInput
            tabId={tabId}
            handleQueryChange={handleQueryChange}
            handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
            setNeedsUpdate={setNeedsUpdate}
            selectedIndex={selectedIndex}
            nlqInput={nlqInput}
            setNlqInput={setNlqInput}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
}
