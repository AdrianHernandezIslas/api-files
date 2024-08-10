import { files } from "dropbox";

export interface DropboxFileMetadata extends files.FileMetadata{
    fileBinary?: Buffer
}