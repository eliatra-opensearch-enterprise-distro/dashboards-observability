/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
  EuiSelect,
  EuiFieldPassword,
  EuiForm,
} from '@elastic/eui';
import React, { useState } from 'react';
import {
  AuthMethod,
  OPENSEARCH_DOCUMENTATION_URL,
} from '../../../../../common/constants/data_connections';
import { QueryPermissionsConfiguration } from './query_permissions';
import { Role } from '../../../../../common/types/data_connections';
import { AuthDetails } from './auth_details';
import { NameRow } from './name_row';

interface ConfigurePrometheusDatasourceProps {
  roles: Role[];
  selectedQueryPermissionRoles: Role[];
  setSelectedQueryPermissionRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  currentName: string;
  currentDetails: string;
  currentStore: string;
  currentUsername: string;
  currentPassword: string;
  currentAccessKey: string;
  currentSecretKey: string;
  currentRegion: string;
  currentAuthMethod: AuthMethod;
  hasSecurityAccess: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setAuthMethodForRequest: React.Dispatch<React.SetStateAction<AuthMethod>>;
  setRegionForRequest: React.Dispatch<React.SetStateAction<string>>;
  setAccessKeyForRequest: React.Dispatch<React.SetStateAction<string>>;
  setSecretKeyForRequest: React.Dispatch<React.SetStateAction<string>>;
  setPasswordForRequest: React.Dispatch<React.SetStateAction<string>>;
  setUsernameForRequest: React.Dispatch<React.SetStateAction<string>>;
  setStoreForRequest: React.Dispatch<React.SetStateAction<string>>;
  setNameForRequest: React.Dispatch<React.SetStateAction<string>>;
  setDetailsForRequest: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfigurePrometheusDatasource = (props: ConfigurePrometheusDatasourceProps) => {
  const {
    setNameForRequest,
    setDetailsForRequest,
    setStoreForRequest,
    currentStore,
    currentName,
    currentDetails,
    roles,
    selectedQueryPermissionRoles,
    setSelectedQueryPermissionRoles,
    currentUsername,
    setUsernameForRequest,
    currentPassword,
    setPasswordForRequest,
    currentAccessKey,
    setAccessKeyForRequest,
    currentSecretKey,
    setSecretKeyForRequest,
    currentRegion,
    setRegionForRequest,
    currentAuthMethod,
    setAuthMethodForRequest,
    hasSecurityAccess,
    error,
    setError,
  } = props;

  const [details, setDetails] = useState(currentDetails);
  const [store, setStore] = useState(currentStore);
  const authOptions = [
    { value: 'basicauth', text: 'Basic authentication' },
    { value: 'awssigv4', text: 'AWS Signature Version 4' },
  ];

  return (
    <div>
      <EuiPanel>
        <EuiTitle>
          <h4>{`Configure Prometheus data source`}</h4>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          {`Connect to Prometheus with OpenSearch and OpenSearch Dashboards. `}
          <EuiLink external={true} href={OPENSEARCH_DOCUMENTATION_URL} target="_blank">
            Learn more
          </EuiLink>
        </EuiText>
        <EuiSpacer />
        <EuiForm component="form">
          <EuiText>
            <h3>Data source details</h3>
          </EuiText>
          <EuiSpacer />
          <NameRow
            currentName={currentName}
            setNameForRequest={setNameForRequest}
            currentError={error}
            setErrorForForm={setError}
          />
          <EuiFormRow label="Description - Optional">
            <EuiTextArea
              data-test-subj="data-source-description"
              placeholder="Placeholder"
              value={details}
              onBlur={(e) => {
                setDetailsForRequest(e.target.value);
              }}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
          </EuiFormRow>
          <EuiSpacer />

          <EuiText>
            <h3>Prometheus data location</h3>
          </EuiText>
          <EuiSpacer />

          <EuiFormRow label="Prometheus URI">
            <>
              <EuiText size="xs">
                <p>Enter the Prometheus URI endpoint.</p>
              </EuiText>
              <EuiFieldText
                data-test-subj="Prometheus-URI"
                placeholder="Prometheus URI"
                value={store}
                onChange={(e) => {
                  setStore(e.target.value);
                }}
                onBlur={(e) => {
                  setStoreForRequest(e.target.value);
                }}
              />
            </>
          </EuiFormRow>
          <EuiSpacer />

          <EuiText>
            <h3>Authentication details</h3>
          </EuiText>
          <EuiSpacer />

          <EuiFormRow label="Authentication method">
            <EuiSelect
              id="selectAuthMethod"
              options={authOptions}
              value={currentAuthMethod}
              onChange={(e) => {
                setAuthMethodForRequest(e.target.value as AuthMethod);
              }}
            />
          </EuiFormRow>

          <AuthDetails
            currentUsername={currentUsername}
            setUsernameForRequest={setUsernameForRequest}
            currentPassword={currentPassword}
            setPasswordForRequest={setPasswordForRequest}
            currentAccessKey={currentAccessKey}
            currentSecretKey={currentSecretKey}
            setAccessKeyForRequest={setAccessKeyForRequest}
            setSecretKeyForRequest={setSecretKeyForRequest}
            currentRegion={currentRegion}
            setRegionForRequest={setRegionForRequest}
            currentAuthMethod={currentAuthMethod}
          />

          <EuiSpacer />

          <QueryPermissionsConfiguration
            roles={roles}
            selectedRoles={selectedQueryPermissionRoles}
            setSelectedRoles={setSelectedQueryPermissionRoles}
            layout={'vertical'}
            hasSecurityAccess={hasSecurityAccess}
          />
        </EuiForm>
      </EuiPanel>
    </div>
  );
};
