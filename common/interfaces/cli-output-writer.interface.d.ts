export interface CLIOutputWriter{
    writeLine: (content: string) => void;
    write: (content: string) => void;
}