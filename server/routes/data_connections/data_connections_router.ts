/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import {
  IOpenSearchDashboardsResponse,
  IRouter,
  ResponseError,
} from '../../../../../src/core/server';
import { DATACONNECTIONS_BASE } from '../../../common/constants/shared';

export function registerDataConnectionsRoute(router: IRouter) {
  router.get(
    {
      path: `${DATACONNECTIONS_BASE}/{name}`,
      validate: {
        params: schema.object({
          name: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<any> => {
      try {
        const dataConnectionsresponse = await context.observability_plugin.observabilityClient
          .asScoped(request)
          .callAsCurrentUser('ppl.getDataConnectionById', {
            dataconnection: request.params.name,
          });
        return response.ok({
          body: dataConnectionsresponse,
        });
      } catch (error: any) {
        console.error('Issue in fetching data connection:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  router.delete(
    {
      path: `${DATACONNECTIONS_BASE}/{name}`,
      validate: {
        params: schema.object({
          name: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<any> => {
      try {
        const dataConnectionsresponse = await context.observability_plugin.observabilityClient
          .asScoped(request)
          .callAsCurrentUser('ppl.deleteDataConnection', {
            dataconnection: request.params.name,
          });
        return response.ok({
          body: dataConnectionsresponse,
        });
      } catch (error: any) {
        console.error('Issue in deleting data connection:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  router.put(
    {
      path: `${DATACONNECTIONS_BASE}`,
      validate: {
        body: schema.object({
          name: schema.string(),
          connector: schema.string(),
          allowedRoles: schema.arrayOf(schema.string()),
          properties: schema.any(),
        }),
      },
    },
    async (context, request, response): Promise<any> => {
      try {
        const dataConnectionsresponse = await context.observability_plugin.observabilityClient
          .asScoped(request)
          .callAsCurrentUser('ppl.modifyDataConnection', {
            body: {
              name: request.body.name,
              connector: request.body.connector,
              allowedRoles: request.body.allowedRoles,
              properties: request.body.properties,
            },
          });
        return response.ok({
          body: dataConnectionsresponse,
        });
      } catch (error: any) {
        console.error('Issue in modifying data connection:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  router.post(
    {
      path: `${DATACONNECTIONS_BASE}`,
      validate: {
        body: schema.object({
          name: schema.string(),
          connector: schema.string(),
          allowedRoles: schema.arrayOf(schema.string()),
          properties: schema.any(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      try {
        const dataConnectionsresponse = await context.observability_plugin.observabilityClient
          .asScoped(request)
          .callAsCurrentUser('ppl.createDataSource', {
            body: {
              name: request.body.name,
              connector: request.body.connector,
              allowedRoles: request.body.allowedRoles,
              properties: request.body.properties,
            },
          });
        return response.ok({
          body: dataConnectionsresponse,
        });
      } catch (error: any) {
        console.error('Issue in creating data source:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.response,
        });
      }
    }
  );

  router.get(
    {
      path: `${DATACONNECTIONS_BASE}`,
      validate: false,
    },
    async (context, request, response): Promise<any> => {
      try {
        const dataConnectionsresponse = await context.observability_plugin.observabilityClient
          .asScoped(request)
          .callAsCurrentUser('ppl.getDataConnections');
        return response.ok({
          body: dataConnectionsresponse,
        });
      } catch (error: any) {
        console.error('Issue in fetching data sources:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.response,
        });
      }
    }
  );
}
