import type { ConnectionModel } from "./models";

export type SearchResponseModel = {
    connections: ConnectionModel[];
    containsIndirectConnections: boolean;
}
