import React from "react";

import FileList, {DEFAULT_PAGINATION_VALUE} from "../../components/FileList";
import FilesPage from "../../components/FilesPage";
import {FilesApi} from "../../api/FilesApi";

const FileListPage = ({ files }) => {
  return (
    <FilesPage>
      <FileList files={files} />
    </FilesPage>
  );
};

FileListPage.getInitialProps = async () => {
  const files = await FilesApi.getAllFiles(DEFAULT_PAGINATION_VALUE);
  return { files: files };
};

export default FileListPage;
