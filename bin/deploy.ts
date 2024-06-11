import { $ } from "bun";
import { prepareClaspJson } from "./prepare-clasp-json";

await prepareClaspJson();
await $`bun run build`;

const deploymentId = await getLastDeploymentId();
console.log(`Last deployment ID: ${deploymentId}`);
await $`bunx clasp deploy -i ${deploymentId} --description "Deployed at $(date)"`;

async function getLastDeploymentId() {
	const result = await $`bunx clasp deployments`.text();
	const lines = result.trim().split("\n");
	const deploymentId = lines.pop()?.split(" ")[1];
	return deploymentId;
}


