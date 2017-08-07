export interface ICliApplication {
    init(): void;
    run(callback?: () => void): any;
}