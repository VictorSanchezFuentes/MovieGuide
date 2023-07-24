export default function RecordsPerPageSelect(props: recordsPerPageSelectProps){
    return(
        <div className="mb-3" style={{width: "150px"}}>
                <label>Records per page:</label>
                <select 
                    className="form-select"
                    defaultValue={5}
                    onChange={e => {
                        // setPage(1);
                        props.onChange(parseInt(e.currentTarget.value, 10));
                        // setRecordsPerPage(parseInt(e.currentTarget.value)) 
                    }}
                    > 
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>                   
                    </select>
            </div>
    )
}

interface recordsPerPageSelectProps {
    onChange(recordsPerPage: number): void;

}