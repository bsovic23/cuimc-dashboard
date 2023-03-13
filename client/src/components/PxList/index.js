import { React, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

const PxList = ({ participants, title }) => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "PX LIST",
        sheet: "Participants",
      });

    if (!participants) {
        return <h2>THERE ARE NO PARTICIPANTS YET</h2>
    }

    return(  
        <div>
            <h3>{title}</h3>
            <button onClick={onDownload}>DOWNLOAD EXCLE</button>
            <table border="1" ref={tableRef}>
                <tr>
                    <th>Entered By</th>
                    <th>Participant First Name</th>
                    <th>Participant Last Name</th>
                </tr>
                {participants && 
                participants.map(px => (
                        <tr key={px.id}>
                            <th>{px.username}</th>
                            <th>{px.pxFirstName}</th>
                            <th>{px.pxLastName}</th>
                        </tr>
                ))}
            </table>
        </div>
    )
};

export default PxList;
