interface IPrint {
    ref: any;
    print?: any;
    documentTitle: string;
}
declare const usePrint: ({ ref, print, documentTitle }: IPrint) => () => void;
export { usePrint };
