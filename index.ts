
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

console.log('APIM Configuration Generator');

const routes = new Map<string, any>();

interface ApiRegistration {
    source: string;
    spec: string;
}


routes.set('foo', { source: 'https://httpbin.org/', spec: 'https://httpbin.org/spec.json' });
routes.set('foo2', { source: 'https://httpbin.org/', spec: 'https://httpbin.org/spec.json' });


async function createApiRegistration(apiRegistration: ApiRegistration) {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new ApiManagementClient(new DefaultAzureCredential(), subscriptionId);

    const apim = await client.apiSchema.beginCreateOrUpdate("resourceGroupName", "serviceName", "apiId", "schemaId", {
        format: "SwaggerLinkJSON",
        value: apiRegistration.spec
    });
}