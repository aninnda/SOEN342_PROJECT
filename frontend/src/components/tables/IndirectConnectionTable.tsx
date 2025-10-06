import { MaterialReactTable } from "material-react-table";
import type { ConnectionModel } from "../../models/models";

type IndirectConnectionTableProps = {
    data: ConnectionModel[];
};

//TODO map indirect connections
export default function IndirectConnectionTable(props: IndirectConnectionTableProps) {

    return <MaterialReactTable data={props.data} columns={[]} />;

}
