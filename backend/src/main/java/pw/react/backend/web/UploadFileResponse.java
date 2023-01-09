package pw.react.backend.web;

public record UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) { }
