import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { LinkItUrl } from "react-linkify-it";

const FileList = () => {
  const [allfiles, setAllfiles] = useState([]);

  const getAllFiles = async () => {
    const { data } = await axios.get(baseUrl + `/file`);
    console.log(data.files);
    setAllfiles(data.files);
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Document URL</th>
          </tr>
        </thead>
        <tbody>
          {allfiles.map((file) => {
            return (
              <tr key={file._id}>
                <td>{file.fileName}</td>
                <td>
                  <LinkItUrl>{file.fileUrl}</LinkItUrl>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
