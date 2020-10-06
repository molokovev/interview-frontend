import Link from "next/link";
import React from "react";
import {FilesApi} from "../api/FilesApi";

export const DEFAULT_PAGINATION_VALUE = 5;
const MAX_PAGINATION_VALUE = DEFAULT_PAGINATION_VALUE;

export default function FileList(props) {
    const didMountRef = React.useRef(false)
    const [files, updateFiles] = React.useState(props.files);
    const [itemsOnPage, updateItemsOnPage] = React.useState(DEFAULT_PAGINATION_VALUE);
    const [currentPage, updateCurrentPage] = React.useState(1);

    React.useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }

        const fetch = async () => {
            const res = await FilesApi.getAllFiles(itemsOnPage, currentPage);
            updateFiles(res)
        };
        fetch();
    }, [itemsOnPage, currentPage]);

    const onPageItemsChange = (event) => updateItemsOnPage(parseInt(event.target.value));
    const onCurrentPageChangeFunc = (idx) => () => updateCurrentPage(idx);

    const paginationItems = Array.from({length: MAX_PAGINATION_VALUE},
        (_, idx) => idx + 1);

    return (
        <div>
            <table className="border-collapse border-2 border-gray-500">
                <thead>
                <tr>
                    <th className="border border-gray-400 px-4 py-2 text-gray-800">
                        File ID
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-gray-800">
                        Processing Status
                    </th>
                </tr>
                </thead>
                <tbody>
                {files.map(file => {
                    return (
                        <Link key={file.fileId} href={`/files/${file.fileId}`}>
                            <tr className="hover:bg-gray-100 cursor-pointer">
                                <td className="border border-gray-400 px-4 py-2">
                                    {file.fileId}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {file.processingStatus}
                                </td>
                            </tr>
                        </Link>
                    );
                })}
                </tbody>
            </table>

            <div className="flex" style={{justifyContent: "space-between"}}>
                <div>{paginationItems.map(x =>
                    <span
                        key={x}
                        onClick={onCurrentPageChangeFunc(x)}
                        style={{
                            marginRight: 5,
                            cursor: "pointer",
                            color: x === currentPage ? "black" : "blue"
                        }}
                    >{x}</span>
                )}</div>
                <div>
                    Items on page:&nbsp;
                    <select value={itemsOnPage} onChange={onPageItemsChange}>
                        {paginationItems.map(
                            (x) => <option key={x} value={x}>{x}</option>
                        )}
                    </select>
                </div></div>
        </div>
    );
};
